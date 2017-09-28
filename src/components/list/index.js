import React, { PropTypes } from "react";
//import * as colors from "../../constants/colors.js";

import "./index.css";

const colors = {
  Normal: "#A8A878",
  Water: "#6890F0",
  Fire: "#F08030",
  Grass: "#78C850",
  Flying: "#A890F0",
  Poison: "#A040A0",
  Dark: "#705848",
  Psychic: "#F85888",
  Steel: "#B8B8D0",
  Electric: "#F8D030",
  Fighting: "#C03028",
  Ground: "#E0C068",
  Rock: "#B8A038",
  Bug: "#A8B820",
  Ice: "#98D8D8",
  Dragon: "#7038F8",
  Ghost: "#705898"
};

const List = ({ monsters }) => {
  return (
    <ul className="MonsterList">
      { monsters.map((item) =>
        <li
          className="MonsterList__item_wrapper"
          style={ (item.monsterTypes.length > 1)
            ?
              { backgroundImage: `linear-gradient(45deg, ${colors[item.monsterTypes[0]]} 50%, ${colors[item.monsterTypes[1]]} 50%)` }
            :
              { backgroundColor: `${colors[item.monsterTypes[0]]}` }
          }
          data-wtf={`${colors[item.monsterTypes[0]]}`}
          key={item.id}
        >
          <div className="MonsterList__item">
            <img
              className="MonsterList__sprite"
              src={`/hi_res/${item.id}.png`}
              alt={item.id}
            />
            <p
              className="MonsterList__label"
            >
              {item.monsterName}
            </p>
          </div>
        </li>
      )}
    </ul>
  );
};

List.propTypes = {
  monsters: PropTypes.array
};

List.defaultProps = {
  monsters: []
};


export default List;
