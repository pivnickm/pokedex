import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router";
import LazyLoad from "react-lazyload";
import { getPokemonPath } from "../../../routes";

import TypeIndicator from "../../type-indicator"
import Image from "../../image";

import "./index.css";

class Item extends Component {

  render() {
    const { monsterName, monsterNumber, monsterTypes } = this.props
    return (
      <LazyLoad
        height={200}
        placeholder={<p className="placeholder">Loading...</p>}
        unmountIfInvisible={true}
        offset={165}
      >
        <li
          className="MonsterList__item_wrapper"
        >
          <Link
            className="MonsterList__item_link"
            to={getPokemonPath(monsterNumber)}
          >
            <div
              className="MonsterList__item"
            >
              <Image
                className="MonsterList__item_image"
                id={monsterNumber}
              />
              <div
                className="MonsterList__label"
              >
                {monsterName}
                <div className="MonsterList__types">
                  {monsterTypes[0].map((type, index) => (
                    <TypeIndicator
                      key={type}
                      type={type}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </li>
      </LazyLoad>
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
