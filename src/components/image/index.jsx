import React from 'react';
import { PropTypes } from 'prop-types';

import "./index.css";

const  Image = ({ id, monsterImage }) => {
  return (
    <div className="MonsterList__sprite_wrapper">
      <img
        className="MonsterList__sprite"
        src={monsterImage}
        alt={id}
      />
    </div>
  );
}

Image.propTypes = {
  monsterImage: PropTypes.string,
  id: PropTypes.string
}

Image.defaultProps = {
  monsterImage: "",
  id: ""
}

export default Image;
