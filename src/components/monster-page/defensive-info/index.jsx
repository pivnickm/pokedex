import React from "react";
import { PropTypes } from 'prop-types';
import TypeIndicator from "../../type-indicator"

import "./index.css";

const DefensiveInfo = ({ defenseInfo }) => {
  return (
    <div className="DefensiveInfo">
      {defenseInfo.map((item, key) => (
        <div key={item.typeName} className="DefensiveInfo_item">
          <TypeIndicator
            type={item.typeName}
          />
          <span>{item.dmgMultiplier}</span>
        </div>
      ))}
    </div>
  );
};

DefensiveInfo.propTypes = {
  defenseInfo: PropTypes.array
}

DefensiveInfo.defaultProps = {
  defenseInfo: []
}

export default DefensiveInfo;
