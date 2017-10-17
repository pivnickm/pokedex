import React, { Component } from "react";
import { PropTypes } from 'prop-types';

import Header from "../header";
import Image from "./image";
import MonsterTabs from "./monster-tabs";
import TypeIndicator from "../type-indicator"

import data from "../../data/monsters.json";
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
    const zeroes = "0000";
    const paddedId = (zeroes + monster.id).substr(-3, 3);
    console.log(monster);
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        monsterInfo: monster
      })
     );
    return (
      <div>
        <Header
          isHome={false}
          text={`#${paddedId} ${monster.monsterName}`}
        />
        <div
          className="MonsterPage"
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
            </div>
          </div>
          <Image
            id={monster.id}
          />
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
