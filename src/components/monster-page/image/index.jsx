import React from "react";
import { PropTypes } from 'prop-types';

import TypeIndicator from "../../type-indicator"
import "./index.css";

const Image = ({ id, types }) => {
  return (
    <div
      className="VisualInfo"
    >
      <div
        className="VisualInfo__sprite_wrapper"
      >
        <img
          className="VisualInfo__sprite"
          src={require(`../../../data/images/hi_res/${id}.png`)}
          alt={id}
        />
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