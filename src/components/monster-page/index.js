import React, { Component } from "react";
import { PropTypes } from 'prop-types';

import Image from "./image";
import VitalInfo from "./vital-info";
import DefensiveInfo from "./defensive-info";
import MoveList from "./move-list";
import EvolutionInfo from "./evolution-info";

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
    return (
      <div
        className="MonsterPage"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${colors[monster.monsterTypes[0]]}, #eee)`,
        }}
      >
        <VitalInfo
          id={paddedId}
          name={monster.monsterName}
          species={monster.monsterSpecies}
          stats={monster.monsterStats}
        />
        <Image
          id={monster.id}
          types={monster.monsterTypes}
          height={monster.monsterHeight}
          weight={monster.monsterWeight}
        />
        <DefensiveInfo
          defenseInfo={monster.monsterDefensive}
        />
        <div className="MonsterPage__EvolutionInfo">
          <div className="DefensiveInfo__header">
            Evolutions
          </div>
          <div className="MonsterPage__EvolutionInfo_wrap">
            { monster.monsterEvolutions.map((evoStage, index) =>
              <EvolutionInfo
                key={`${evoStage[0].name}_wrap`}
                evolutions={evoStage}
              />
            )}
          </div>
        </div>
        <MoveList
          moves={monster.monsterMoves}
        />
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
