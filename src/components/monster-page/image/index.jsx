import React from "react";
import { PropTypes } from 'prop-types';

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