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

        const monsterName = $(".main-content h1").text();

        let monsterTypes =[];

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

        resolve({id, monsterName, monsterTypes});
      }
    });
  });
};

for (let i = 1; i < 252; i++) {
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