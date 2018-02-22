const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');

// const url = 'http://www.azurilland.com/pokedex/gen-2/';
const url = 'https://www.serebii.net/pokedex-dp/';
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
    return request(`${url}${id}.shtml`, (error, response, html) => {
      if(!error){
        const $ = cheerio.load(html);
        console.log(`${url}${id}.shtml`); // eslint-disable-line
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

        resolve({
          id,
          monsterName,
          monsterSpecies,
          monsterWeight,
          monsterHeight,
          monsterCatchRate,
          monsterBaseHappiness,
          monsterHatchSteps,
          monsterGenderSplit
        });
      }
    });
  });
};


for (let i = 1; i < 2; i++) {
  const id = ("0000" + i).substr(-3, 3);
  allPromises.push(getPokemon(id));
}

Promise.all(allPromises).then(values => {
  console.log(values);
  fs.writeFile("src/data/monsters2.json", JSON.stringify(values), err => {
    if (err) return console.log(err);
    console.log("Monsters.json written successfully");
  });
}).catch(reason => {
  console.log(reason)
});