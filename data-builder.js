const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'http://www.azurilland.com/pokedex/gen-2/';
const allPromises = [];

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

const getPokemon = (id) => {
  return new Promise((resolve, reject) => {
    return request(`${url}${id}`, (error, response, html) => {
      if(!error){
        const $ = cheerio.load(html);

        /* Name + Info*/
        const regExp = /\(([^)]+)\)/;
        const monsterName = $(".primary-content .header").eq(0).text();
        const monsterSpecies = $(".species td").eq(1).text();

        const weightMatches = regExp.exec($(".pokemon-weight td").eq(1).text());
        const monsterWeight = weightMatches[1];
        // height needs some manipulation because it's 10x too big
        const heightMatches = regExp.exec($(".pokemon-height td").eq(1).text()); // ex: "9m"
        const monsterHeight = heightMatches[1];
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
        let monsterStats = {};
        const statElem = $(".primary-content .stats dl");

        for (let i = 0; i < statElem.children().length / 2; i++) {
          const statName = statElem.children(".name").eq(i).text();
          const statValue = statElem.children(".value").eq(i).text();

          monsterStats[statName] = statValue;
        }
        /* End Base Stats */

        /* Defensive Strengths/Weaknesses */
        let monsterDefensive = [];
        $(".primary-content .weaknesses-resistances ul").children().each((i, elem) => {
          const typeName = $(elem).children(".tag").text();
          const dmgMultiplier = $(elem).children(".multiplier").text() || 1; // multiplier if not defined is just 1, neutral damage
          monsterDefensive.push({
            typeName,
            dmgMultiplier
          });
        });
        /* End Defensive Strengths/Weaknesses */

        /* Moveset */
        const monsterMoves = [];
        for (let j = 0; j < $("#tab-moves").children(".listing-container").eq(0).find("tbody").children().length; j++ ) {
          const elem = $("#tab-moves").children(".listing-container").eq(0).find("tbody").children().eq(j);
          let moveData = {};
          for (let i = 0; i < elem.children().length; i++) {
            moveData.level = elem.children().eq(0).text();
            moveData.name = elem.children().eq(1).text();
            moveData.type = elem.children().eq(2).text();
            moveData.category = elem.children().eq(3).text();
            moveData.power = elem.children().eq(4).find("strong").text() || elem.children().eq(4).text().trim(); // undefined means status or similar.
            moveData.accuracy = elem.children().eq(5).text();
            moveData.pp = elem.children().eq(6).text();
          }

          monsterMoves.push(moveData);
        }
        /* End Moveset */

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

        resolve({id, monsterName, monsterSpecies, monsterWeight, monsterHeight, monsterTypes, monsterStats, monsterDefensive, monsterMoves});
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