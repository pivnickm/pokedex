const fs = require('fs');
const request = require('request-promise');
const cheerio = require('cheerio');

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
  let newEffect = effect;

  if (moveName === "Crush Grip") {
    newEffect = "Base Power = 110 * (Opponent's Current HP / Opponent's Max HP)";
  } else if (moveName === "Spit Up") {
    newEffect = "Releases power from Stockpile.	Base Power = (Stockpiles * 100)";
  } else if (moveName === "Swallow") {
    newEffect = "Absorbs power from Stockpile and recovers HP. 1 Stockpile = 1/4HP, 2 Stockpile = 1/2 HP, 3 Stockpile = full HP";
  } else if (moveName === "Trump Card") {
    newEffect = "Base power is dependant on the amount of PP that it has left. 1PP = 190, 2PP = 75, 3PP = 60, 4PP = 50, 5-8PP = 40";
  } else if (moveName === "Wring Out") {
    newEffect = "Base Power = 110 * (Opponent's Current HP / Opponent's Max HP)";
  } else if (moveName === "Water Spout") {
    newEffect = "Base Power = (Current HP * 150) / Max HP, max power is 150, min power is 1";
  } else if (moveName === "Eruption") {
    newEffect = "Base Power = (Current HP * 150) / Max HP, max power is 150, min power is 1";
  } else if (moveName === "Grass Knot") {
    newEffect = "Base power is dependant on target's weight, max power is 120, min power is 20";
  } else if (moveName === "Toxic Spikes") {
    newEffect = "1 layer poisons enemy, 2 layers badly poisons. Does not affect Flying, Steel, Poison types or enemies with Levitate";
  } else if (moveName === "Fling") {
    newEffect = "Base power and secondary effects are dependant on the item flung";
  } else if (moveName === "Punishment") {
    newEffect = "Base power increases by 20 for each stat increase. Max power is 200, min power is 1";
  } else if (moveName === "Magic Coat") {
    newEffect = "Any special move is reflected back to the attacker.";
  } else if (moveName === "Gyro Ball") {
    newEffect = "Base Power = 25 * (TargetSpeed / UserSpeed), max power is 150, min power is 1";
  } else if (moveName === "Low Kick") {
    newEffect = "Base power is dependant on target's weight, max power is 120, min power is 20";
  } else if (moveName === "Magnitude") {
    newEffect = "Move power is random: 10/30/50/70/90/110/150";
  } else if (moveName === "Spikes") {
    newEffect = "1 layer = 1/8 enemy max HP, 2 layers = 1/6 enemy max HP, 3 layers = 1/4 enemy max HP";
  } else if (moveName === "Stealth Rock") {
    newEffect = "Does damage relative to type advantage, 1/32 max HP for .25x effective -> 1/2 max HP for 4x effective";
  }

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
          const moveEffect = editEffect(moveName, moveTable.eq(7).children().eq(0).text().trim());
          const moveEffectPercent = moveTable.eq(7).children().eq(1).text().trim();
          const moveTM = moveTable.eq(12).children().eq(0).text().trim();
          const movePriority = moveTable.eq(12).children().eq(1).text().trim();
          const moveTarget = moveTable.eq(12).children().eq(2).text().trim();
          const moveContact = moveTable.eq(14).children().eq(2).text().trim();

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