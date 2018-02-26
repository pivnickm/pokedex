import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router";
import LazyLoad, { forceCheck } from "react-lazyload";

import TypeIndicator from "../../type-indicator"
import Spinner from "../../spinner";
import Image from "../../image";

import "./index.css";

class Item extends Component {
  componentDidUpdate(prevProps, prevState) {
    forceCheck();
  }

  render() {
    const { monsterName, monsterNumber, monsterTypes, monsterImage} = this.props
    return (
      <li
        className="MonsterList__item_wrapper"
      >
        <Link
          className="MonsterList__item_link"
          to={`/${monsterNumber}/basic-info`}
        >
          <LazyLoad
            height={75}
            placeholder={<Spinner />}
            unmountIfInvisible={true}
          >
            <div
              className="MonsterList__item"
            >
              <Image
                monsterImage={monsterImage}
                id={monsterNumber}
              />
              <p
                className="MonsterList__label"
              >
                {monsterName}
              </p>
              <div className="MonsterList__types">
                {monsterTypes.map((type, index) => (
                  <TypeIndicator
                    key={type}
                    type={type}
                  />
                ))}
              </div>
            </div>
          </LazyLoad>
        </Link>
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
