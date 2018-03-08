import React from "react";
import { PropTypes } from 'prop-types';

import "./index.css";

const TypeIndicator = ({ type }) => {
  return (
    <span
      className={`type ${type}`}
    >
      {type === "Curse" ? "???" : type}
    </span>
  );
};

TypeIndicator.propTypes = {
  type: PropTypes.string
};

TypeIndicator.defaultProps = {
  types: ""
};


export default TypeIndicator;