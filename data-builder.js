const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://pokemondb.net/pokedex/';
const allPromises = [];

const getPokemon = (id) => {
  return new Promise((resolve, reject) => {
    return request(`${url}${id}`, (error, response, html) => {
      if(!error){
        const $ = cheerio.load(html);

        // get name
        const monsterName = $(".main-content h1").text();

        let monsterTypes = [];
        let monsterStats = {};

        // get type(s)
        const firstType = $("div.col.desk-span-8.lap-span-6 > p > a.itype").first().text();
        const secondType = $("div.col.desk-span-8.lap-span-6 > p > a.itype").last().text();

        if (firstType === "Fairy") {
          firstType === "Normal";
        }

        if (firstType !== secondType) {
          monsterTypes.push(firstType, secondType);
        } else {
          monsterTypes.push(firstType);
        }

        // get base stats
        $(".vitals-table tbody").eq(3).children().each((i, elem) => {
          const statName = $(elem).children("th").text();
          const statValue = $(elem).children(".num").eq(0).text();

          if (statName !== "" && statValue !== "") {
            monsterStats[statName] = statValue;
          }
        });

        // get evolutionary info NEEDS WORK =/
        // $(".infocard-evo-list").children(".infocard-tall:not(.small)").each((i, elem) => {
        //   return console.log("YO", {
        //     "evoName": $(elem).eq(i).children(".ent-name").text(),
        //     "evoNumber": $(elem).eq(i).children("small").eq(0).text(),
        //     "evoLevel": $(elem).eq(i+1).children().remove().end().text().replace(/\s/g,''),
        //     "evoTypes": [
        //       $(elem).eq(i).children("small").eq(1).children(".itype").eq(0).text(),
        //       $(elem).eq(i).children("small").eq(1).children(".itype").eq(1).text(),
        //     ]
        //   });
        // });

        resolve({id, monsterName, monsterTypes, monsterStats});
      }
    });
  });
};

for (let i = 1; i < 2; i++) {
  allPromises.push(getPokemon(i));
}

Promise.all(allPromises).then(values => {
  console.log("hi", values);
  fs.writeFile("src/data/monsters.json", JSON.stringify(values), err => {
    if (err) return console.log(err);
    console.log("Monsters.json written successfully");
  });
}).catch(reason => {
  console.log(reason)
});