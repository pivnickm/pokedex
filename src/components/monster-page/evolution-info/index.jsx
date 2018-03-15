import React from "react";
import { PropTypes } from "prop-types";
import EvolutionItem from "./item";

import "./index.css";

const EvolutionInfo = ({ monsterEvolutions  }) => {
  console.log(monsterEvolutions); // eslint-disable-line
  return (
    <div className="EvolutionInfo__wrap">
      { monsterEvolutions.map((stageItems, index) =>
        <EvolutionItem
          stage={stageItems}
        />
      )}
    </div>
  );
}

EvolutionInfo.propTypes = {
  monsterEvolutions: PropTypes.array.isRequired
}

EvolutionInfo.defaultProps = {
  monsterEvolutions: []
}

export default EvolutionInfo;
