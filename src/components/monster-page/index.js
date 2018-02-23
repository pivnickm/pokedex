import React, { Component } from "react";
import { PropTypes } from 'prop-types';

import Header from "../header";
import Image from "./image";
import MonsterTabs from "./monster-tabs";
import TypeIndicator from "../type-indicator"

import * as colors from "../../data/colors.js";
import data from "../../data/monsters2.json";
import "./index.css";

class MonsterPage extends Component {
  componentDidMount() {
    this.scrollTop = 0;
  }

  set scrollTop(x) {
    (document.scrollingElement || document.documentElement).scrollTop = x;
  }

  render() {
    const monster = data[this.props.params.id - 1];
    const paddedId = ("0000" + monster.id).substr(-3, 3);
    const pageBackgroundColor = `${monster.monsterTypes[0]}Lighten`;
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        monsterInfo: monster
      })
    );
    console.log(monster);
    return (
      <div>
        <Header
          isHome={false}
          text={`#${paddedId} ${monster.monsterName}`}
        />
        <div
          className="MonsterPage"
          style={{
            backgroundColor: `${colors[pageBackgroundColor]}`,
          }}
        >
          <MonsterTabs
            id={monster.id}
          />
          <div className="MonsterPage__basic">
            <div
              className="VisualInfo__type_wrapper"
            >
              {monster.monsterTypes.map((type, index) => (
                <TypeIndicator
                  key={type}
                  type={type}
                />
              ))}
              <div className="VisualInfo__gender_wrapper">
                {monster.monsterGenderSplit}
              </div>
            </div>
            <Image
              id={monster.id}
            />
          </div>
          <div className="MonsterPage__tabContent">
            {childrenWithProps}
          </div>
        </div>
      </div>
    );
  }
}

MonsterPage.propTypes = {
  params: PropTypes.object
};

MonsterPage.defaultProps = {
  params: {
    id: 1
  }
};


export default MonsterPage;
