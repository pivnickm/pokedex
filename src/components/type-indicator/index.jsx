import React from "react";
import { PropTypes } from 'prop-types';

import "./index.css";

const TypeIndicator = ({ types }) => {
  return (
    <div>
      {types.map((item) =>
        <span
          className={`type ${item}`}
          key={item}
        >
          {item}
        </span>
      )}
    </div>
  );
};

TypeIndicator.propTypes = {
  types: PropTypes.array
};

TypeIndicator.defaultProps = {
  types: []
};


export default TypeIndicator;