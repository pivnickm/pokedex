import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { Link, browserHistory } from "react-router";
import Hammer from "react-hammerjs";

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
    this.handleSwipe = this.handleSwipe.bind(this);
  }

  changeForm(event) {
    this.setState({form: event.target.value});
  }

  componentDidMount() {
    this.scrollTop = 0;
  }

  set scrollTop(x) {
    (document.scrollingElement || document.documentElement).scrollTop = x;
  }

  handleSwipe({direction}) {
    const numMonsterId = parseInt(this.props.params.id, 10);
    const currPath = this.props.routes[2].path; //basic-info, moves, etc
    const LEFT = 2;
    const RIGHT = 4;

    if (direction === LEFT && numMonsterId < 494) {
      browserHistory.push(getPokemonPath(numMonsterId + 1, currPath));
    } else if (direction === RIGHT && numMonsterId > 1) {
      browserHistory.push(getPokemonPath(numMonsterId - 1, currPath));
    }
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
    const currPath = this.props.routes[2].path; //basic-info, moves, etc
    console.log(monster);
    return (
      <div>
        <Header
          isHome={false}
          text={`#${monster.id} ${monster.monsterName}`}
        />
        <Hammer onSwipe={this.handleSwipe}>
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
                    to={getPokemonPath(numMonsterId - 1, currPath)}
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
                <div>
                  {monster.monsterDexEntry}
                </div>
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
                    to={getPokemonPath(numMonsterId + 1, currPath)}
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
        </Hammer>
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
