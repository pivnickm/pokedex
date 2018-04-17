import React, { Component } from 'react';
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
import { getPokemonPath } from "../../../routes";

import TypeIndicator from "../../type-indicator"
import Image from "../../image";

import "./index.css";

class Item extends Component {

  render() {
    const { monsterName, monsterNumber, monsterTypes } = this.props
    return (
      <li
        className="MonsterList__item_wrapper"
        onClick={() => { browserHistory.push(getPokemonPath(monsterNumber))} }
      >
        <Image
          className="MonsterList__item_image"
          id={monsterNumber}
        />
        <span className="MonsterList__label">{monsterName}</span>
        {monsterTypes[0].map((type, index) => (
          <TypeIndicator
            key={type}
            type={type}
          />
        ))}
      </li>
    );
  }
}

Item.propTypes = {
  monsterName: PropTypes.string,
  monsterNumber: PropTypes.string,
  monsterTypes: PropTypes.array
};

Item.defaultProps = {
  monsterName: "",
  monsterNumber: "",
  monsterTypes: []
};

export default Item;
