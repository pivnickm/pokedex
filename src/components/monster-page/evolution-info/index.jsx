import React from "react";
import { PropTypes } from 'prop-types';
import EvolutionInfoItem from "./item";

import "./index.css";

const EvolutionInfo = ({ monsterInfo  }) => {
  const { monsterEvolutions } = monsterInfo;
  return (
    <div className="MonsterPage__EvolutionInfo_wrap">
      { monsterEvolutions.map((evoStage, index) =>
        <EvolutionInfoItem
          key={`${evoStage[0].name}_wrap`}
          evolutions={evoStage}
        />
      )}
    </div>
  );
}

EvolutionInfo.propTypes = {
  monsterInfo: PropTypes.object.isRequired
}

EvolutionInfo.defaultProps = {
  monsterInfo: {}
}

export default EvolutionInfo;
