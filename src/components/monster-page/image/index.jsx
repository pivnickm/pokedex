import React from "react";
import { PropTypes } from 'prop-types';

import "./index.css";

const Image = ({ id, monsterImage }) => {
  return (
    <div
      className="VisualInfo"
    >
      <img
        className="VisualInfo__sprite"
        src={monsterImage}
        alt={id}
      />
    </div>
  );
};

Image.propTypes = {
  monsterImage: PropTypes.string,
  id: PropTypes.string
};

Image.defaultProps = {
  id: "",
  monsterImage: ""
};


export default Image;