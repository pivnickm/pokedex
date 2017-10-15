import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';

import Image from "./image";
import VitalInfo from "./vital-info";
import DefensiveInfo from "./defensive-info";
import MoveList from "./move-list";
import EvolutionInfo from "./evolution-info";
import MonsterTabs from "./monster-tabs";
import TypeIndicator from "../type-indicator"

import * as colors from "../../data/colors.js";
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
      <div
        className="MonsterPage"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${colors[monster.monsterTypes[0]]}, #eee)`,
        }}
      >
        <div className="MonsterPage__basic">
          <div className="VitalInfo__name">
            <Link
              className="VitalInfo__back"
              to={"/"}
            >
              <i className="icon icon-left-big icon-big" />
            </Link>
            <span className="VitalInfo__label">
              #{paddedId}
            </span>
            <span className="VitalInfo__label name">
              {monster.monsterName}
            </span>
          </div>
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
        <MonsterTabs
          id={monster.id}
        />
        <div className="MonsterPage__tabContent">
          {childrenWithProps}
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
