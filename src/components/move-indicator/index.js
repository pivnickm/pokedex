import React from "react";
import { PropTypes } from 'prop-types';

import "./index.css";
import "../../fontello/css/fontello.css";

const MoveIndicator = ({ type }) => {
  const types = {
    "Physical": "certificate",
    "Status or Support": "dot-circled",
    "Special": "dwolla"
  }
  return (
    <div
      className={`MoveType MoveType__${type.substr(0, 4)}`}
    >
      <i className={`icon icon-${types[type]}`} />
    </div>
  );
};

MoveIndicator.propTypes = {
  type: PropTypes.string
};

MoveIndicator.defaultProps = {
  types: ""
};


export default MoveIndicator;