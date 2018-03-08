import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { browserHistory } from "react-router";
import Hammer from "react-hammerjs";

import Header from "../header";
import Image from "../image";
import VitalInfo from "./vital-info";
import BaseStats from "./base-stats";
import DefensiveInfo from "./defensive-info";
import MoveList from "./move-list";
import TypeIndicator from "../type-indicator"
import FourOhFour from '../four-oh-four';
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
    const LEFT = 2;
    const RIGHT = 4;

    if (direction === LEFT && numMonsterId < 494) {
      browserHistory.push(getPokemonPath(numMonsterId + 1));
    } else if (direction === RIGHT && numMonsterId > 1) {
      browserHistory.push(getPokemonPath(numMonsterId - 1));
    }
  }

  render() {
    const monster = data[this.props.params.id - 1];
    let pageBackgroundColor;
    let showType
    if (monster) {
      pageBackgroundColor = monster && monster.monsterHasMultiform ?
        `${monster.monsterTypes[0][0]}Lighten` : `${monster.monsterTypes[0][0]}Lighten`;
      showType = (monster && monster.monsterTypes.length > 1) ? this.state.form : 0;
    }

    console.log(monster);
    return (
      <div>
        <Header
          isHome={false}
          text={monster ? `#${monster.id} ${monster.monsterName}` : ""}
        />
        { monster
        ?
          <Hammer onSwipe={this.handleSwipe}>
            <div
              className="MonsterPage"
            >
              <div className="MonsterPage__basic">
                <VitalInfo
                  monsterInfo={monster}
                />
                <div className="MonsterPage__visualInfo">
                  <Image
                    id={monster.id}
                    form={this.state.form}
                  />
                  { monster.monsterHasMultiform &&
                    <div className="MonsterPage__formChanger">
                      <select
                        className="MonsterPage__formSelect"
                        onChange={this.changeForm}
                        value={this.state.form}
                      >
                        { monster.monsterForms.map((form, index) =>
                          <option value={index} key={form}>{form}</option>
                        )}
                      </select>
                    </div>
                  }
                  <div
                    className="VisualInfo__type_wrapper"
                    >
                    {monster.monsterTypes[showType].map((type, index) => (
                      <TypeIndicator
                      key={type}
                      type={type}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="MonsterPage__tabContent">
                <p
                  className="MonsterPage__sectionHeader"
                  style={{
                    backgroundColor: `${colors[pageBackgroundColor]}`,
                  }}
                >
                  Pokedex Entry
                </p>
                <p className="dexEntry__text">
                  {monster.monsterDexEntry}
                </p>
                <p
                  className="MonsterPage__sectionHeader"
                  style={{
                    backgroundColor: `${colors[pageBackgroundColor]}`,
                  }}
                >
                  Abilities
                </p>
                {monster.monsterAbility.map((ability, index) =>
                  <p
                    className="dexEntry__text"
                    key={`${ability.abilityName}_${index}`}
                  >
                    <span className="ability_name">{ability.abilityName}</span>: {ability.abilityDescription}
                  </p>
                )}
                <p
                  className="MonsterPage__sectionHeader"
                  style={{
                    backgroundColor: `${colors[pageBackgroundColor]}`,
                  }}
                >
                  Base Stats
                </p>
                <BaseStats
                  monsterInfo={monster}
                />
                <p
                  className="MonsterPage__sectionHeader"
                  style={{
                    backgroundColor: `${colors[pageBackgroundColor]}`,
                  }}
                >
                  Defensive Info
                </p>
                <DefensiveInfo
                  monsterInfo={monster}
                />
                <p
                  className="MonsterPage__sectionHeader"
                  style={{
                    backgroundColor: `${colors[pageBackgroundColor]}`,
                  }}
                >
                  Movesets
                </p>
                <MoveList
                  monsterInfo={monster}
                />
              </div>
            </div>
          </Hammer>
        :
          <FourOhFour />
        }
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
