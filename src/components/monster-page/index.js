import React from "react";
import { PropTypes } from 'prop-types';

import Image from "./image";
import VitalInfo from "./vital-info";
import DefensiveInfo from "./defensive-info";

import * as colors from "../../data/colors.js";
import "./index.css";

const MonsterPage = ({ monster }) => {
  console.log(monster);
  const zeroes = "0000";
  const paddedId = (zeroes + monster.id).substr(-3, 3);
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
        height={monster.monsterHeight}
        weight={monster.monsterWeight}
      />
      <Image
        id={monster.id}
        types={monster.monsterTypes}
      />
      <DefensiveInfo
        defenseInfo={monster.monsterDefensive}
      />
    </div>
  );
};

MonsterPage.propTypes = {
  monsters: PropTypes.object
};

MonsterPage.defaultProps = {
  monsters: {}
};


export default MonsterPage;
