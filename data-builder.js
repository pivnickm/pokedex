const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://www.serebii.net/pokedex-sm/';
const allPromises = [];
const errors = [];

const irregularMoves = require("./src/data/move-info.js");
const evoGroups = require("./src/data/evoGroups.json");

const makeCapital = (name) => name.replace(/\b\w/g, l => l.toUpperCase());

const editType = (type) => {
  return type ? makeCapital(type.split("/")[2].split(".shtml")[0]) : "";
}

const editMovePower = (moveName, movePower) => {
  if (irregularMoves[moveName]) {
    return {
      movePower: irregularMoves[moveName].power,
      moveNote: irregularMoves[moveName].notes
    };
  } else {
    return { movePower };
  }
}

const editEvolutionMethod = (methodText) => {
  if (methodText.match(/level\s(\w*)/, "")) {
    return methodText.match(/at\s([\s\S]*)/,"") ? methodText.match(/at\s([\s\S]*)/,"")[1] : null;// "level 16"
  } else if (methodText.match(/using\s([\s\S]*)/,"")) {
    return methodText.match(/using\s([\s\S]*)/,"")[1]; // "Moon Stone"
  } else if (methodText.includes("traded")) {
    if (!methodText.includes("holding")) {
      return "Trade";
    } else {
      return `Trade while holding ${methodText.match(/holding\s([\s\S]*)/,"")[1]}`;
    }
  } else if (methodText.includes("daytime") || methodText.includes("night time")) {
    return methodText.match(/during the\s([\s\S]*)/,"")[1];
  } else if (methodText.includes("happiness")) {
    return "Happiness";
  }
}

const finalEdits = (id, types) => {
  let newTypes;
  if (id === 351) {
    newTypes = [[ "Normal" ], [ "Fire" ], [ "Water" ], [ "Ice" ]];
  } else if (id === 479) {
    newTypes = [[ "Electric", "Ghost" ], [ "Electric", "Flying" ], [ "Electric", "Ice" ], [ "Electric", "Fire" ], [ "Electric", "Grass" ], [ "Electric", "Water" ]];
  } else if (id === 493) {
    newTypes = [[ "Normal" ], [ "Bug" ], [ "Dark" ], [ "Dragon" ], [ "Electric" ], [ "Fighting" ], [ "Fire" ], [ "Flying" ], [ "Ghost" ], [ "Grass" ], [ "Ground" ], [ "Ice" ], [ "Poison" ], [ "Psychic" ], [ "Rock" ], [ "Steel" ], [ "Water" ]];
  } else {
    newTypes = types;
  }

  return newTypes;
}

const getPokemon = (id) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      return request({ uri: `${url}${id}.shtml`, encoding: "binary" }, (error, response, html) => {
        if (error) {
          console.log("error!!!!", `${url}${id}.shtml`, error); // eslint-disable-line
          reject(error);
        }

        const $ = cheerio.load(html);

        console.log(`Building info for ${id}`);
        /* Name + Info*/
        const monsterName = $(".fooinfo").eq(1).text();
        const monsterSpecies = $(".cen").eq(0).text();
        const monsterCatchRate = $(".fooinfo").eq(8).text();
        const monsterBaseHappiness = $(".fooinfo").eq(12).text();
        const monsterHatchSteps = $(".fooinfo").eq(9).text();
        const monsterGenderSplit = $(".fooinfo").eq(3).text().replace("%", "% "); // put a space between Male ♂:0%Female ♀:100%
        const monsterWeight = $(".fooinfo").eq(7).text();
        const monsterHeight = $(".fooinfo").eq(6).text().replace("'", "' "); // put a space between 2'10"
        const monsterAbilityData = $(".fooinfo").eq(10).text().split("\n");
        const monsterDexEntry = $(".heartgold").eq(1).next(".fooinfo").text().trim();
        const evoGroup = evoGroups[monsterName] ? evoGroups[monsterName].evoGroup : undefined;
        monsterAbilityData.shift();
        const monsterAbility = monsterAbilityData.map((ability, index) => {
          const abilityParts = ability.split(": "); //break on the "Name: Text"
          return {
            abilityName: abilityParts[0],
            abilityDescription: abilityParts[1].trim()
          }
        });
        /* End Name + Info */

        /* Types and forms */
        let monsterTypes = [];
        let firstType;
        let secondType;

        if ($(".cen").eq(0).children().children().children().length > 1) {
          $(".cen").eq(0).children().children().children().each((i, elem) => {
            firstType = editType($(elem).children().eq(1).children().eq(0).attr("href"));
            secondType = editType($(elem).children().eq(1).children().eq(1).attr("href"));
            if (secondType !== "") {
              monsterTypes.push([firstType, secondType]);
            } else {
              monsterTypes.push([firstType]);
            }
          });
        } else {
          firstType = editType($(".cen").eq(0).children().eq(0).attr("href"));
          secondType = editType($(".cen").eq(0).children().eq(1).attr("href"));
          if (secondType !== "") {
            monsterTypes.push([firstType, secondType]);
          } else {
            monsterTypes.push([firstType]);
          }
        }

        let monsterHasMultiform = false;
        let monsterForms = [];
        const altFormElemHeader = $('.fooevo:contains("Alternate Forms")')
        // const altFormElem = $(".fooevo").eq(7).text();
        // const altFormElemHeader = "Alternate Forms";
        // if(altFormElem === altFormElemHeader) {
        if(altFormElemHeader.text()) {
          monsterHasMultiform = true;
          const altFormElems = altFormElemHeader.parent().next().find($(".fooinfo")).children().eq(0).children().children().eq(0).children(); //this is gross?
          // const altFormElems = $(".fooinfo").eq(17).find("table");


          altFormElems.each((i, elem) => {
            monsterForms.push($(elem).text());
          })
        }

        monsterTypes = finalEdits(parseInt(id, 10), monsterTypes);
        /* End Types and forms */

        /* Base Stats */
        let monsterStats = [];
        const statElem = $("[name=stats]").next(".dextable");
        const statElemChildren = statElem.children().children();

        for (let i = 0; i < statElemChildren.eq(1).children(".fooevo").length; i++) {
          const statName = statElemChildren.eq(1).children(".fooevo").eq(i).text();
          const statValue = parseInt(statElemChildren.eq(2).children(".fooinfo").eq(i+1).text(), 10); //make the value a numbah
          const statLabel = `${statName} (${statValue})`; // useful for the radar chart because I can't seem to dynamically build the label?

          monsterStats.push({
            statName,
            statValue,
            statLabel
          });
        }
        /* End Base Stats */

        /* Defensive Strengths/Weaknesses */
        let monsterDefensive = [];
        const defElem = $("[name=general]").next(".dextable").next(".dextable").children().children();
        const types = defElem.eq(1).children();
        const multipliers = defElem.eq(2).children();
        types.each((i, elem) => {
          const typeName = editType($(elem).children().eq(0).attr("href"));
          const dmgMultiplier = parseFloat(multipliers.eq(i).text().split("*")[1], 10);
          if (dmgMultiplier !== 1) {
            monsterDefensive.push({
              typeName,
              dmgMultiplier
            });
          }
        });

        // finally, sort by low => high
        monsterDefensive.sort((a, b) => {
          if (a.dmgMultiplier < b.dmgMultiplier) {
            return -1;
          } if (a.dmgMultiplier > b.dmgMultiplier) {
            return 1;
          }
          return 0;
        });
        /* End Defensive Strengths/Weaknesses */

        /* Moveset */
        const monsterMoves = [];
        const atkTables = $("[name=attacks]");
        atkTables.each((i, elem) => {
          const moveSet = {
            header: "",
            moves: []
          };
          const atkRows = $(elem).next(".dextable").children().children();
          const numMoves = (atkRows.length - 2); //two headers and two rows per move
          moveSet.header = atkRows.eq(0).text();

          for (let j = 2; j <= numMoves; j+=2) {
            let moveData = {};
            atkRows.eq(j).each((i, elem) => {
              try {
                const moveName = $(elem).children().eq(1).children().eq(0).text();
                const power = $(elem).children().eq(4).text();
                const updatedMove = editMovePower(moveName, power);

                moveData.name = moveName;
                moveData.level = $(elem).children().eq(0).text();
                moveData.type = makeCapital($(elem).children().eq(2).children().eq(0).attr("src").split("/")[3].split(".")[0]);
                moveData.category = $(elem).children().eq(3).children().eq(0).attr("src").split("/")[3].split(".")[0];
                moveData.accuracy = $(elem).children().eq(5).text();
                moveData.pp = $(elem).children().eq(6).text();

                moveData.power = updatedMove.movePower;
                if (updatedMove.moveNote) {
                  moveData.notes = updatedMove.moveNote;
                }
                moveSet.moves.push(moveData);
              } catch (e) {
                console.log("Move Error"); // eslint-disable-line
                errors.push({
                  pokemonId: id,
                  error: e
                });
              }
            });
          }
          monsterMoves.push(moveSet);
        });
        /* End Moveset(s) */

        resolve({
          id,
          monsterName,
          monsterSpecies,
          monsterWeight,
          monsterHeight,
          evoGroup,
          monsterDexEntry,
          monsterAbility,
          monsterCatchRate,
          monsterBaseHappiness,
          monsterHatchSteps,
          monsterGenderSplit,
          monsterTypes,
          monsterHasMultiform,
          monsterForms,
          monsterStats,
          monsterDefensive,
          monsterMoves
        });
      })}, 300 * id);
  });
};


// for (let i = 1; i < 494; i++) {
for (let i = 1; i < 809; i++) {
  const id = ("0000" + i).substr(-3, 3);
  allPromises.push(getPokemon(id));
}

Promise.all(allPromises).then(values => {
  // fs.writeFile("src/data/monsters2.json", JSON.stringify(values), err => {
  fs.writeFile("src/data/monstersGen7.json", JSON.stringify(values), err => {
    if (err) return console.log(err);
    console.log("Monsters.json written successfully");
  });
}).then(() => {
  fs.writeFile("src/data/errorLog.json", JSON.stringify(errors), err => {
    if (err) return console.log(err);
    console.log("Error log written successfully");
  });
})
.catch(reason => {
  console.log(reason)
});