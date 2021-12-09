import React from "react";
import { PropTypes } from 'prop-types';

import "./index.css";
import "../../fontello/css/fontello.css";

const MoveIndicator = ({ type }) => {
  return (
    <div
      className={`MoveType MoveType__${type.substr(0, 4)}`}
    >
      <img src={require(`../../images/${type.toLowerCase()}.png`)} alt={type} />
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