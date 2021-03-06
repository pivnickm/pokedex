import React from "react";
import { PropTypes } from 'prop-types';
import TypeIndicator from "../../type-indicator"

import "./index.css";

const DefensiveInfo = ({ monsterInfo }) => {
  const { monsterDefensive } = monsterInfo;
  return (
    <div className="DefensiveInfo">
      <div className="DefensiveInfo__header">
        Damage Taken
      </div>
      <div className="DefensiveInfo__types">
        {monsterDefensive.map((item, key) =>
          item.dmgMultiplier !== 1 &&
            <div key={item.typeName} className="DefensiveInfo__item">
              <TypeIndicator
                type={item.typeName}
              />
              <div className="DefensiveInfo__value">
                {item.dmgMultiplier}x
              </div>
            </div>
        )}
      </div>
    </div>
  );
}

DefensiveInfo.propTypes = {
  monsterInfo: PropTypes.object
}

DefensiveInfo.defaultProps = {
  monsterInfo: {}
}

export default DefensiveInfo;
