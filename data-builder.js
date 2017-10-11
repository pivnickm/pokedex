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

const editMovePower = (movePower) => {
  if (movePower.length < 3) {
    return { movePower };
  } else if (movePower.includes("STAB")) {
    return {
      movePower: movePower.split("STAB")[1], // "60 due to STAB40" => "40"
      moveNoteType: "STAB",
      moveNote: `${movePower.split(" due")[0]} power with STAB`
    };
  } else if (movePower.includes("exactly")) {
    return {
     movePower: movePower.substr(13, 2), // "Does exactly 20 damage.varies" => "20"
     moveNoteType: "Fixed Damage",
     moveNote: "Fixed damage"
    };
  } else if(movePower.includes("equal to")) {
    return {
      movePower: "Varies", //Does exact damage equal to the user's level.varies"
      moveNote: "Damage equal to user's level"
    }
  }else {
    return { movePower };
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
        /* End Defensive Strengths/Weaknesses */

        /* Moveset */
        const monsterMoves = [];
        for (let j = 0; j < $("#tab-moves").children(".listing-container").eq(0).find("tbody").children().length; j++ ) {
          const elem = $("#tab-moves").children(".listing-container").eq(0).find("tbody").children().eq(j);
          let moveData = {};
          for (let i = 0; i < elem.children().length; i++) {
            const movePowerInfo = editMovePower(elem.children().eq(4).text().trim());

            moveData.level = elem.children().eq(0).text();
            moveData.name = elem.children().eq(1).text();
            moveData.type = editType(elem.children().eq(2).text());
            moveData.category = elem.children().eq(3).text();
            moveData.power = elem.children().eq(4).find("strong").text() || movePowerInfo.movePower;
            moveData.accuracy = elem.children().eq(5).text();
            moveData.pp = elem.children().eq(6).text();
            if ( movePowerInfo.moveNote ) {
              moveData.notes = movePowerInfo.moveNote;
              moveData.noteType = movePowerInfo.moveNoteType;
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

        const stageOne = evoTree.children(".base-evo").text().trim(); // "slowpoke"
        monsterEvolutions.push([{
          stage: 1,
          text: stageOne
        }]);

        let temp = []

        for (let i = 0; i < evoTree.children(".second-evo").length; i++) {
          temp.push({
            stage: 2,
            text: evoTree.children(".second-evo").eq(i).text().trim()
          });
        }
        if (temp.length) {
          monsterEvolutions.push(temp);
        }

        temp = [];
        for (let i = 0; i < evoTree.children(".third-evo").length; i++) {
          temp.push({
            stage: 3,
            text: evoTree.children(".third-evo").eq(i).text().trim()
          });
        }
        if (temp.length) {
          monsterEvolutions.push(temp);
        }

        resolve({id, monsterName, monsterSpecies, monsterWeight, monsterHeight, monsterTypes, monsterStats, monsterDefensive, monsterMoves, monsterEvolutions});
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