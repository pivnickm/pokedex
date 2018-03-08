import React from 'react';
import { PropTypes } from 'prop-types';

import "./index.css";

const  Image = ({ id, form, className }) => {
  let formName = "";
  if (form > 0) {
    formName = `-${form}`
  }
  return (
    <div className={`MonsterList__sprite_wrapper ${className}`}>
      <img
        className="MonsterList__sprite"
        // src={require(`../../data/images/hi_res/${parseInt(id, 10)}${formName}.png`)}
        src={require(`../../data/images/svg/${parseInt(id, 10)}${formName}.svg`)}
        alt={id}
      />
    </div>
  );
}

Image.propTypes = {
  id: PropTypes.string
}

Image.defaultProps = {
  id: ""
}

export default Image;
