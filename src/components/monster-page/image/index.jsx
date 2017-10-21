import React from "react";
import { PropTypes } from 'prop-types';

import "./index.css";

const Image = ({ id }) => {
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
  id: PropTypes.number
};

Image.defaultProps = {
  id: 1
};


export default Image;