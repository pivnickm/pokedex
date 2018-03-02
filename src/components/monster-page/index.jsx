import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { Link } from "react-router";

import Header from "../header";
import Image from "../image";
import MonsterTabs from "./monster-tabs";
import TypeIndicator from "../type-indicator"
import { getPokemonPath } from "../../routes";

import * as colors from "../../data/colors.js";
import data from "../../data/monsters2.json";
import "./index.css";

class MonsterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: 0
    };

    this.changeForm = this.changeForm.bind(this);
    this.cycle = this.cycle.bind(this);
  }

  changeForm(event) {
    this.setState({form: event.target.value});
  }

  cycle(dir) {
    if (dir < 0) {
      // move backwards
      console.log("BACK"); // eslint-disable-line
    } else {
      // move forwards
      console.log("FORWARDS"); // eslint-disable-line
    }
  }

  componentDidMount() {
    this.scrollTop = 0;
  }

  set scrollTop(x) {
    (document.scrollingElement || document.documentElement).scrollTop = x;
  }

  render() {
    const monster = data[this.props.params.id - 1];
    const pageBackgroundColor = monster.monsterHasMultiform ?
      `${monster.monsterTypes[0][0]}Lighten` : `${monster.monsterTypes[0][0]}Lighten`;
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        monsterInfo: monster
      })
    );
    const showType = monster.monsterTypes.length > 1 ? this.state.form : 0;
    const numMonsterId = parseInt(monster.id, 10);
    console.log(monster);
    return (
      <div>
        <Header
          isHome={false}
          text={`#${monster.id} ${monster.monsterName}`}
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
              className="MonsterPage__nav"
            >
              { numMonsterId > 1 &&
                <Link
                  className="MonsterPage__nav_back"
                  to={getPokemonPath(numMonsterId - 1)}
                  >
                  <i className="icon icon-left-open" />
                </Link>
              }
            </div>
            <div
              className="VisualInfo__type_wrapper"
            >
              {monster.monsterTypes[showType].map((type, index) => (
                <TypeIndicator
                  key={type}
                  type={type}
                />
              ))}
              <div className="VisualInfo__gender_wrapper">
                { monster.monsterGenderSplit}
              </div>
              { monster.monsterHasMultiform &&
                <select id="lang" onChange={this.changeForm} value={this.state.form}>
                  { monster.monsterForms.map((form, index) =>
                    <option value={index} key={form}>{form}</option>
                  )}
                </select>
              }
            </div>
            <Image
              id={monster.id}
              form={this.state.form}
            />
            <div
              className="MonsterPage__nav"
            >
              { numMonsterId < 493 &&
                <Link
                  className="MonsterPage__nav_forward"
                  to={getPokemonPath(numMonsterId + 1)}
                >
                  <i className="icon icon-right-open" />
                </Link>
              }
            </div>
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
