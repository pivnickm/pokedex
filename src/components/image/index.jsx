import React from 'react';
import { PropTypes } from 'prop-types';

import "./index.css";

const  Image = ({ id, form, className }) => {
  let formName = "";
  if (form > 0) {
    formName = `-${form}`
  }
  return (
    <img
      className={`MonsterList__sprite ${className}`}
      src={require(`../../data/images/svg/${parseInt(id, 10)}${formName}.svg`)}
      alt={id}
    />
  );
}

Image.propTypes = {
  id: PropTypes.string
}

Image.defaultProps = {
  id: ""
}

export default Image;
