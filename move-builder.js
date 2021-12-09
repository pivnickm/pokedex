const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');

const irregularMoves = require("./src/data/move-info.js");

const url = 'https://www.serebii.net/attackdex-dp/'; // `/bug.shtml`, etc
const allPromises = [];
const allMovePromises = [];
const errors = [];

const allTypes = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychict", //psychic is also a move, psychict refers to the page...
  "rock",
  "steel",
  "water"
];

const makeCapital = (name) => name.replace(/\b\w/g, l => l.toUpperCase());

const editType = (type) => {
  return makeCapital(type.split("/")[2].split(".shtml")[0]);
}

const editEffect = (moveName, effect) => {
  // return new effect text if found in file, otherwise, just clean up the existing
  const newEffect = irregularMoves[moveName] ? irregularMoves[moveName].newEffectText : effect;
  // clean up weird capitalizations
  return newEffect
    .replace("ATTRACT", "Attract")
    .replace("ROLLOUT", "Rollout")
    .replace("FLY", "Fly")
    .replace("CONFUSION", "Confusion")
    .replace("EVASIVENESS", "Evasiveness")
    .replace("ACCURACY", "Accuracy")
    .replace("ATTACK", "Attack")
    .replace("SPEED", "Speed")
    .replace("DEFENSE", "Defense")
    .replace("SP. ATK", "Sp.Atk")
    .replace("SP. DEF", "Sp.Def")
    .replace("2VS2", "double")
    .replace("No Effect", "")
}

const getMoveNames = (type) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      return request({ uri: `${url}${type}.shtml`, encoding: "binary" }, (error, response, html) => {
        if (error) {
          console.log("error!!!!", `${url}${id}.shtml`, error); // eslint-disable-line
          reject(error);
        }

        const $ = cheerio.load(html);
        const moves = [];
        console.log(`Building info for ${type} type moves`);

        const moveTable = $("table").eq(4);
        const moveRows = moveTable.children().children()
        const numMoves = moveRows.length - 1; //the first one is the table header

        for (let i = 1; i <= numMoves; i++) {
          const moveName = makeCapital(moveRows.eq(i).children().eq(0).children().text());
          moves.push(moveName);
        }

        resolve(moves);
      })}, 500);
  });
};

const getMoveData = (name, id) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      return request({ uri: `${url}${name.replace(/\s/g, "").toLowerCase()}.shtml`, encoding: "binary" }, (error, response, html) => {
        if (error) {
          console.log("error!!!!", `${url}${name.replace(/\s/g, "").toLowerCase()}.shtml`); // eslint-disable-line
          reject(error);
        }

        try {
          const $ = cheerio.load(html);
          console.log(`Building info for ${name}`);

          const moveTable = $("[name=details]").next(".dextable").children().children();

          const moveName = moveTable.eq(1).children().eq(0).text().trim().replace(/\s([0-9]*)[^\x00-\x7F]+/, "");
          const moveType = editType(moveTable.eq(1).children().eq(1).children().eq(0).attr("href"));
          const moveCategory = editType(moveTable.eq(1).children().eq(2).children().eq(0).attr("href"));
          const movePP = moveTable.eq(3).children().eq(0).text().trim();
          const movePower = moveTable.eq(3).children().eq(1).text().trim();
          const moveAccuracy = moveTable.eq(3).children().eq(2).text().trim();
          const moveDescription = moveTable.eq(5).children().eq(0).text().trim();
          let moveEffect;
          let moveEffectPercent;
          let moveTM;
          let movePriority;
          let moveTarget;
          let moveContact;

          if (moveTable.eq(6).children().eq(0).text() === "In-Depth Effect:") {
            //move has battle effects, so we need to skip about a little to get the correct rows.
            moveEffect = editEffect(moveName, moveTable.eq(9).children().eq(0).text().trim());
            moveEffectPercent = moveTable.eq(9).children().eq(1).text().trim();
            moveTM = moveTable.eq(14).children().eq(0).text().trim();
            movePriority = moveTable.eq(14).children().eq(1).text().trim();
            moveTarget = moveTable.eq(14).children().eq(2).text().trim();
            moveContact = moveTable.eq(16).children().eq(2).text().trim();
          } else {
            moveEffect = editEffect(moveName, moveTable.eq(7).children().eq(0).text().trim());
            moveEffectPercent = moveTable.eq(7).children().eq(1).text().trim();
            moveTM = moveTable.eq(12).children().eq(0).text().trim();
            movePriority = moveTable.eq(12).children().eq(1).text().trim();
            moveTarget = moveTable.eq(12).children().eq(2).text().trim();
            moveContact = moveTable.eq(14).children().eq(2).text().trim()
          }

          resolve({
            id,
            moveName,
            moveType,
            moveCategory,
            movePP,
            movePower,
            moveAccuracy,
            moveDescription,
            moveEffect,
            moveEffectPercent,
            moveTM,
            movePriority,
            moveTarget,
            moveContact
          });
        } catch (e) {
          console.log("err?", e); // eslint-disable-line
          reject(e);
        }
      })}, 2000 * id);
  });
}

allTypes.forEach((type, index) => {
  allPromises.push(getMoveNames(type));
});

Promise.all(allPromises).then(values => {
  return [].concat.apply([], values);
}).then(allMoves => {
  allMoves
    .filter((item) => item.indexOf("This AttackDex") < 0)
    .forEach((move, index) => {
      allMovePromises.push(getMoveData(move, index));
    });
}).then(() => {
  return Promise.all(allMovePromises);
}).then(values => {
  fs.writeFile("src/data/moves.json", JSON.stringify(values), err => {
    if (err) return console.log(err);
    console.log("moves.json written successfully");
  });
}).then(() => {
  fs.writeFile("src/data/movedErrorLog.json", JSON.stringify(errors), err => {
    if (err) return console.log(err);
    console.log("Error log written successfully");
  });
})
.catch(reason => {
  console.log(reason)
});