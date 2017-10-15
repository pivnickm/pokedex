import React from "react";
import { PropTypes } from 'prop-types';

import "./index.css";

const VitalInfo = ({ monsterInfo }) => {
  const { monsterSpecies, monsterHeight, monsterWeight } = monsterInfo;
  return (
    <div
      className="VitalInfo"
    >
      <div className="VitalInfo__species">
        {monsterSpecies}
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
  );
};

VitalInfo.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  species: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string
};

VitalInfo.defaultProps = {
  id: "001",
  name: "",
  species: "",
  height: "0m",
  weight: "0.0kg"
};


export default VitalInfo;