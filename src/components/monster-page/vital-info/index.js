import React from "react";
import { PropTypes } from 'prop-types';

import "./index.css";

const VitalInfo = ({ monsterInfo }) => {
  const {
    monsterSpecies,
    monsterHeight,
    monsterWeight,
    monsterBaseExp,
    monsterBaseHappiness,
    monsterCatchRate,
    monsterHatchSteps
  } = monsterInfo;
  return (
    <div
      className="VitalInfo"
    >
      <div className="VitalInfo__row">
        <div className="VitalInfo__species">
          <div className="VitalInfo__value">
              {monsterSpecies}
            </div>
            <div className="VitalInfo__label">
              Species
            </div>
        </div>
        <div className="VitalInfo__sizing">
          <div className="VitalInfo__height">
            <div className="VitalInfo__value">
              {monsterHeight}
            </div>
            <div className="VitalInfo__label">
              Height
            </div>
          </div>
          <div className="VitalInfo__weight">
            <div className="VitalInfo__value">
              {monsterWeight}
            </div>
            <div className="VitalInfo__label">
              Weight
            </div>
          </div>
        </div>
      </div>
      <div className="VitalInfo__row">
        <div className="VitalInfo__base">
          <div className="VitalInfo__value">
            {monsterBaseExp}
          </div>
          <div className="VitalInfo__label">
            Base EXP
          </div>
        </div>
        <div className="VitalInfo__base">
          <div className="VitalInfo__value">
            {monsterBaseHappiness}
          </div>
          <div className="VitalInfo__label">
            Base Happiness
          </div>
        </div>
        <div className="VitalInfo__base">
          <div className="VitalInfo__value">
            {monsterCatchRate}
          </div>
          <div className="VitalInfo__label">
            Catch Rate
          </div>
        </div>
      </div>
      <div className="VitalInfo__row">
        <div className="VitalInfo__base">
          <div className="VitalInfo__value">
            {monsterHatchSteps}
          </div>
          <div className="VitalInfo__label">
            Hatch Steps
          </div>
        </div>
      </div>
    </div>
  );
};

VitalInfo.propTypes = {
  monsterInfo: PropTypes.object
};

VitalInfo.defaultProps = {
  monsterInfo: {}
};


export default VitalInfo;