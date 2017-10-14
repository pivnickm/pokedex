import React from "react";
import { PropTypes } from 'prop-types';

import BaseStats from "../base-stats";

import "./index.css";

const VitalInfo = ({ id, name, species, height, weight, stats }) => {
  return (
    <div
      className="VitalInfo"
    >
      <div className="VitalInfo__name">
        <span className="VitalInfo__label">
          #{id}
        </span>
        <span className="VitalInfo__label name">
          {name}
        </span>
      </div>
      <div className="VitalInfo__species">
        {species}
      </div>
      <BaseStats
        stats={stats}
      />
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