import React from "react";
import { PropTypes } from 'prop-types';
import { Link } from "react-router";

import "./index.css";

const VitalInfo = ({ id, name, species, height, weight }) => {
  return (
    <div
      className="VitalInfo"
    >
      <div className="VitalInfo__name">
        <Link
          className="VitalInfo__back"
          to={"/"}
        >
          <i className="icon icon-left-big icon-big" />
        </Link>
        <span className="VitalInfo__label">
          #{id}
        </span>
        <span className="VitalInfo__label">
          {name}
        </span>
      </div>
      <div className="VitalInfo__species">
        {species}
      </div>
      <div className="VitalInfo__sizing">
        <div className="VitalInfo__height">
          <div className="VitalInfo__label">
            Height
          </div>
          <div className="VitalInfo__value">
            {height}
          </div>
        </div>
        <div className="VitalInfo__weight">
          <div className="VitalInfo__label">
            Weight
          </div>
          <div className="VitalInfo__value">
            {weight}
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