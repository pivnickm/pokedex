import React, { Component } from "react";
import { PropTypes } from 'prop-types';

import Header from "../header";
import Image from "../image";
import MonsterTabs from "./monster-tabs";
import TypeIndicator from "../type-indicator"

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

  render() {
    const monster = data[this.props.params.id - 1];
    const pageBackgroundColor = monster.monsterHasMultiform ?
      `${monster.monsterTypes[0].firstType}Lighten` : `${monster.monsterTypes[0]}Lighten`;
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        monsterInfo: monster
      })
    );
    const showType = monster.monsterTypes.length > 1 ? this.state.form : 0;
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
            </div>
            <Image
              id={monster.id}
              form={this.state.form}
            />
            { monster.monsterHasMultiform &&
              <select id="lang" onChange={this.changeForm} value={this.state.form}>
                { monster.monsterForms.map((form, index) =>
                  <option value={index} key={form}>{form}</option>
                )}
              </select>
            }
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
