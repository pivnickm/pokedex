const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'http://www.azurilland.com/pokedex/gen-2/';
const allPromises = [];

const irregularMoves = require("./src/data/move-info.js");
const damages = require("./src/data/damages.js");

const editType = (type) => {
  let newType;
  const hashMap = {
    Electr: "Electric",
    Psychc: "Psychic",
    Fight: "Fighting"
  }

  if (type === "Fairy") {
    type = "Normal";
  }

  if (hashMap[type]) {
    newType = hashMap[type];
  } else {
    newType = type;
  }

  return newType;
}

const editDmgMultiplier = (multiplier) => {
  if (!multiplier) {  // multiplier if not defined is just 1, neutral damage
    return 1;
  } else if(multiplier === "½") {
    return 0.5;
  } else if(multiplier === "¼") {
    return 0.25;
  } else if(multiplier === "2×") {
    return 2;
  } else if(multiplier === "4×") {
    return 4;
  } else if(multiplier === "immune") {
    return 0;
  }
  return multiplier;
}

// const editDmgMultiplier = (types) => {
//   const damageCollector = [];

//   if (types.length < 2) {
//     return damages[types[0]];
//   } else {
//     [types[0]].map((item) => {
//       [types[1]].map((innerItem) => {
//         console.log(item, innerItem);
//       });
//     });
//   }
// }

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
    return request(`${url}${id}`, (error, response, html) => {
      if(!error){
        const $ = cheerio.load(html);

        console.log(`Building info for ${id}`);
        /* Name + Info*/
        const regExp = /\(([^)]+)\)/;
        const monsterName = $(".primary-content .header").eq(0).text();
        const monsterSpecies = $(".species td").eq(1).text();

        const weightMatches = regExp.exec($(".pokemon-weight td").eq(1).text());
        const monsterWeight = weightMatches[1];
        // height needs some manipulation because it's 10x too big
        const heightMatches = regExp.exec($(".pokemon-height td").eq(1).text()); // ex: "9m"
        const monsterHeight = (parseInt(heightMatches[1], 10) / 10) + "m";
        /* End Name + Info */

        /* Types */
        let monsterTypes = [];
        let firstType = editType($(".primary-content .details").children(".item").eq(0).children().eq(0).text());
        let secondType = editType($(".primary-content .details").children(".item").eq(0).children().eq(1).text());

        if (firstType !== secondType && secondType !== "") {
          monsterTypes.push(firstType, secondType);
        } else {
          monsterTypes.push(firstType);
        }
        /* End Types */

        /* Base Stats */
        let monsterStats = [];
        const statElem = $(".primary-content .stats dl");

        for (let i = 0; i < statElem.children().length / 2; i++) {
          const statName = statElem.children(".name").eq(i).text();
          const statValue = statElem.children(".value").eq(i).text();

          monsterStats.push({
            statName,
            statValue
          });
        }
        /* End Base Stats */

        /* Defensive Strengths/Weaknesses */
        let monsterDefensive = [];
        $(".primary-content .weaknesses-resistances ul").children().each((i, elem) => {
          const typeName = editType($(elem).children(".tag").text());
          const dmgMultiplier = editDmgMultiplier($(elem).children(".multiplier").text());

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
        // const monsterDefensive = editDmgMultiplier(monsterTypes);
        /* End Defensive Strengths/Weaknesses */

        /* Moveset */
        const monsterMoves = [];
        for (let j = 0; j < $("#tab-moves").children(".listing-container").eq(0).find("tbody").children().length; j++ ) {
          const elem = $("#tab-moves").children(".listing-container").eq(0).find("tbody").children().eq(j);
          let moveData = {};
          for (let i = 0; i < elem.children().length; i++) {
            const moveName = elem.children().eq(1).text();
            const movePowerInfo = editMovePower(moveName, elem.children().eq(4).text().trim());
            //console.log(movePowerInfo);
            moveData.level = elem.children().eq(0).text();
            moveData.name = moveName;
            moveData.type = editType(elem.children().eq(2).text());
            moveData.category = elem.children().eq(3).text();
            moveData.power = elem.children().eq(4).find("strong").text() || movePowerInfo.movePower;
            moveData.accuracy = elem.children().eq(5).text();
            moveData.pp = elem.children().eq(6).text();
            if ( movePowerInfo.moveNote ) {
              moveData.notes = movePowerInfo.moveNote;
            }
          }

          monsterMoves.push(moveData);
        }
        /* End Moveset */

        // get evolutionary info =/
        const evoList = $(".evolution");
        const monsterEvolutions = [];
        // there may be more than one evolution section if
        // a pokemon mega evolves...
        const evoTree = evoList.length > 1
          ?
            evoList.eq(1)
          :
            evoList;

        monsterEvolutions.push([{
          stage: 1,
          name: evoTree.children(".base-evo").text().trim(), // "slowpoke",
          id: evoTree.children(".base-evo").find("a").eq(0).attr("href").split("/")[3].split("-")[0] // uhh...
        }]);

        let temp = []

        for (let i = 0; i < evoTree.children(".second-evo").length; i++) {
          temp.push({
            stage: 2,
            name: evoTree.children(".second-evo").eq(i).text().trim().match(/Evolves to\s(\w*)/, "")[1],
            method: editEvolutionMethod(evoTree.children(".second-evo").eq(i).text().trim()),
            id: evoTree.children(".second-evo").eq(i).find("a").eq(0).attr("href").split("/")[3].split("-")[0]
          });
        }
        if (temp.length) {
          monsterEvolutions.push(temp);
        }

        temp = [];
        for (let i = 0; i < evoTree.children(".third-evo").length; i++) {
          temp.push({
            stage: 3,
            name: evoTree.children(".third-evo").eq(i).text().trim().match(/Evolves to\s(\w*)/, "")[1],
            method: editEvolutionMethod(evoTree.children(".third-evo").eq(i).text().trim()),
            id: evoTree.children(".third-evo").eq(i).find("a").eq(0).attr("href").split("/")[3].split("-")[0]
          });
        }
        if (temp.length) {
          monsterEvolutions.push(temp);
        }

        resolve({
          id,
          monsterName,
          monsterSpecies,
          monsterWeight,
          monsterHeight,
          monsterTypes,
          monsterStats,
          monsterDefensive,
          monsterMoves,
          monsterEvolutions
        });
      }
    });
  });
};


for (let i = 1; i < 252; i++) {
  allPromises.push(getPokemon(i));
}

Promise.all(allPromises).then(values => {
  console.log(values);
  fs.writeFile("src/data/monsters.json", JSON.stringify(values), err => {
    if (err) return console.log(err);
    console.log("Monsters.json written successfully");
  });
}).catch(reason => {
  console.log(reason)
});