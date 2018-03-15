const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');

const evoInfo = require("./src/data/evo-info.js");

const url = "https://pokemondb.net/evolution";
const allEvos = {};
const errors = [];

const makeCapital = (name) => name.replace(/\b\w/g, l => l.toUpperCase());

const editMethod = (method) => {
  return method
    .replace("→", "")
    .replace("↗", "")
    .replace("↘", "")
    .replace(/\n/, "")
    .replace("(", "")
    .replace(")", "");
}

const finalEdits = (evoList) => {
  // evoGroup11: Nidoranâ -> nidoran female
  // evoGroup12: Nidoranâ -> nidoran male
  // evoGroup17: add Bellossom to inner stages
  // evoGroup25: add Politoed to inner stages
  // evoGroup45: move hitmonchan out of inner stage, add hitmontop
  // evoGroup60: Eeveelutions. 'nuff said
  // evoGroup104: add cascoon and dustox
  // evoGroup109: add gallade
  // evoGroup113: Shedinja?
  // evoGroup135: update method text (there are others too)
  // evoGroup139: fix Glalie and Froslass
  // evoGroup141: fix Huntail and Gorebyss
  // evoGroup153: fix Mothim and Burmy
  return evoList;
}

const getEvolutions = () => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      return request({ uri: url, encoding: "binary" }, (error, response, html) => {
        if (error) {
          console.log("error!!!!", `${url}${id}.shtml`, error); // eslint-disable-line
          reject(error);
        }

        const $ = cheerio.load(html);
        const evolutions = [];
        console.log(`Building evolution info`);

        /*
          {
            "evoGroup1": [
              name: "Bulbasaur",
              stages: [{
                name: "Ivysaur",
                method: "Level 16",
                stages: [{
                  name: "Venusaur",
                  method: "Level 32"
                }]
              }]
            ],
            "evoGroup17": [
              name: "Oddish",
              stages: [{
                name: "Gloom",
                method: "Level 21",
                stages: [{
                  name: "Vileplume",
                  method: "Leaf Stone"
                }, {
                  name: "Bellossom",
                  method: "Sun Stone"
                }]
              }]
            ],
            "evoGroupWhatevs": [
              name: "Wurmple",
              stages: [{
                name: "Silcoon",
                method: "Level 7 (randomly)"
                stages: [{
                  name: "Beautifly",
                  method: "Level 10"
                }]
              }, {
                name: "Cascoon",
                method: Level 7 (randomly)",
                stages: [{
                  name: "Dustox",
                  method: "Level 10"
                }]
              }]
            ]
          }
        */
        const evoList = $(".infocard-evo-list"); // all info cards
        // end point is 169 because not all pokemon have evolutions, and therefore are skipped
        for (let i = 0; i <= 169; i++) {
          //for each .infocard-tall subitem, get the name
          const methods = $(evoList).eq(i).find(".small");
          const pokemonName = $(evoList).eq(i).find(".ent-name");
          const pokemonId = $(evoList).eq(i).find("small");

/*           allEvos[`evoGroup${i}`] = [Object.assign({}, {
            name: pokemonName.eq(0).text(),
            id: parseInt(pokemonId.eq(0).text().split("#")[1], 10),
            stages: [{
              name: pokemonName.eq(1).text(),
              id: parseInt(pokemonId.eq(2).text().split("#")[1], 10),
              method: editMethod(methods.eq(0).text().trim()),
              stages: pokemonName.eq(2).text() ? [{
                name: pokemonName.eq(2).text(),
                id: parseInt(pokemonId.eq(4).text().split("#")[1], 10),
                method: editMethod(methods.eq(1).text().trim())
              }] : undefined
            }]
          }, evoInfo[`evoGroup${i}`])]; */

          allEvos[`evoGroup${i}`] = [];
          allEvos[`evoGroup${i}`].push([
            Object.assign({}, {
              name: pokemonName.eq(0).text(),
              id: parseInt(pokemonId.eq(0).text().split("#")[1], 10)
            }, evoInfo[`evoGroup${i}`][0])
          ]);
          allEvos[`evoGroup${i}`].push([
            Object.assign({}, {
              name: pokemonName.eq(1).text(),
              id: parseInt(pokemonId.eq(2).text().split("#")[1], 10),
              method: editMethod(methods.eq(0).text().trim())
            }, evoInfo[`evoGroup${i}`][1])
          ]);
          if (pokemonName.eq(2).text()) {
            allEvos[`evoGroup${i}`].push([
              Object.assign({}, {
                name: pokemonName.eq(2).text(),
                id: parseInt(pokemonId.eq(4).text().split("#")[1], 10),
                method: editMethod(methods.eq(1).text().trim())
              }, evoInfo[`evoGroup${i}`][2])
            ]);
          }
        }


        resolve(allEvos);
      })}, 500);
  });
};
getEvolutions().then(values => {
  fs.writeFile("src/data/evolutions.json", JSON.stringify(values), err => {
    if (err) return console.log(err);
    console.log("evolutions.json written successfully");
  });
})
.catch(reason => {
  console.log(reason)
});