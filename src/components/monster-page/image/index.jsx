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
          src={`/hi_res/${id}.png`}
          alt={id}
        />
      </div>
      <div
        className="VisualInfo__type_wrapper"
      >
        <TypeIndicator
          types={types}
        />
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