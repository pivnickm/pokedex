import React from 'react';
import { PropTypes } from 'prop-types';
import ErrorBoundary from "../errorBoundary"

import "./index.css";

const  Image = ({ id, form, className }) => {
  let formName = "";
  if (form > 0) {
    formName = `-${form}`
  }
  return (
    <ErrorBoundary>
      <img
        className={`MonsterList__sprite ${className}`}
        // src={require(`../../data/images/svg/${parseInt(id, 10)}${formName}.svg`)}
        src={require(`../../data/images/png/${parseInt(id, 10)}${formName}.png`)}
        onError={() => { throw new Error("image not found"); }}
        alt={id}
      />
    </ErrorBoundary>
  );
}

Image.propTypes = {
  id: PropTypes.string
}

Image.defaultProps = {
  id: ""
}

export default Image;
