import React from "react";
import { PropTypes } from 'prop-types';
// import { Link } from "react-router";

import "./index.css";

const TypeIndicator = ({ type }) => {
  return (
    // <Link
    //   to={`types#${type}`}
    // >
      <span
        className={`type ${type}`}
      >
        {type}
      </span>
    // </Link>
  );
};

TypeIndicator.propTypes = {
  type: PropTypes.string
};

TypeIndicator.defaultProps = {
  types: ""
};


export default TypeIndicator;