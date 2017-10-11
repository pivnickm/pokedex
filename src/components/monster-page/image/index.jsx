import React from "react";
import { PropTypes } from 'prop-types';

import TypeIndicator from "../../type-indicator"
import "./index.css";

const Image = ({ id, types, height, weight }) => {
  return (
    <div
      className="VisualInfo"
    >
      <img
        className="VisualInfo__sprite"
        src={require(`../../../data/images/hi_res/${id}.png`)}
        alt={id}
      />
      <div className="VitalInfo__sizing">
        <div className="VitalInfo__height">
          <div className="VitalInfo__value">
            {height}
          </div>
          <div className="VitalInfo__label">
            Height
          </div>
        </div>
        <div className="VitalInfo__weight">
          <div className="VitalInfo__value">
            {weight}
          </div>
          <div className="VitalInfo__label">
            Weight
          </div>
        </div>
      </div>
      <div
        className="VisualInfo__type_wrapper"
      >
        {types.map((type, index) => (
          <TypeIndicator
            key={type}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

Image.propTypes = {
  id: PropTypes.number,
  types: PropTypes.array
};

Image.defaultProps = {
  id: 1,
  types: []
};


export default Image;