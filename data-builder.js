const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');

// const url = 'http://www.azurilland.com/pokedex/gen-2/';
const url = 'https://www.serebii.net/pokedex-dp/';
const allPromises = [];

const irregularMoves = require("./src/data/move-info.js");
const damages = require("./src/data/damages.js");

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
        const monsterName = $(".fooinfo").eq(0).text();
        const monsterSpecies = $(".fooinfo").eq(6).text();
        const monsterCatchRate = $(".fooinfo").eq(9).text();
        const monsterBaseHappiness = $(".fooinfo").eq(12).text();
        const monsterHatchSteps = $(".fooinfo").eq(10).text();
        const monsterGenderSplit = $(".fooinfo").eq(3).text();
        const monsterWeight = $(".fooinfo").eq(8).text();
        const monsterHeight = $(".fooinfo").eq(7).text();
        /* End Name + Info */

        /* Types */
        let monsterTypes = [];
        let firstType = editType($(".fooinfo").eq(4).children().eq(0).attr("href"));
        let secondType = editType($(".fooinfo").eq(4).children().eq(1).attr("href"));

        if (secondType !== "") {
          monsterTypes.push(firstType, secondType);
        } else {
          monsterTypes.push(firstType);
        }
        /* End Types */

        /* Base Stats */
        let monsterStats = [];
        const statElem = $("[name=stats]").next(".dextable");
        const statElemChildren = statElem.children().children();

        for (let i = 0; i < statElemChildren.eq(1).children(".fooevo").length; i++) {
          const statName = statElemChildren.eq(1).children(".fooevo").eq(i).text();
          const statValue = statElemChildren.eq(2).children(".fooinfo").eq(i+1).text();

          monsterStats.push({
            statName,
            statValue
          });
        }
        /* End Base Stats */

        /* Defensive Strengths/Weaknesses */ //+17
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
        const atkElem = $("[name=attacks]").next(".dextable").children().children();
        const numMoves = (atkElem.length - 2) / 2; //two headers and two rows per move

        for (let j = 2; j <= numMoves; j+=2) {
          let moveData = {};
          atkElem.eq(j).each((i, elem) => {
            try {
              moveData.level = $(elem).children().eq(0).text();
              moveData.name = $(elem).children().eq(1).children().eq(0).text();
              moveData.type = makeCapital($(elem).children().eq(2).children().eq(0).attr("src").split("/")[3].split(".")[0]);
              moveData.category = $(elem).children().eq(3).children().eq(0).attr("src").split("/")[3].split(".")[0];
              moveData.power = $(elem).children().eq(4).text();
              moveData.accuracy = $(elem).children().eq(4).text();
              moveData.pp = $(elem).children().eq(6).text();
            } catch (e) {
              console.log("Move Error"); // eslint-disable-line
            }

          });
          monsterMoves.push(moveData);
        }
        resolve({
          id,
          monsterName,
          monsterSpecies,
          monsterWeight,
          monsterHeight,
          monsterCatchRate,
          monsterBaseHappiness,
          monsterHatchSteps,
          monsterGenderSplit,
          monsterTypes,
          monsterStats,
          monsterDefensive,
          monsterMoves
        });
      })}, 300 * id);
  });
};


for (let i = 1; i < 494; i++) {
  const id = ("0000" + i).substr(-3, 3);
  allPromises.push(getPokemon(id));
}

Promise.all(allPromises).then(values => {
  //console.log(values);
  fs.writeFile("src/data/monsters2.json", JSON.stringify(values), err => {
    if (err) return console.log(err);
    console.log("Monsters.json written successfully");
  });
}).catch(reason => {
  console.log(reason)
});