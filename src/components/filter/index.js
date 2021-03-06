import React from "react";
import { PropTypes } from 'prop-types';
import "./index.css";

const Filter = ({ onSearch }) => {
  return (
    <input
      className="MonsterFilter"
      onChange={onSearch}
      placeholder="Filter Pokemon"
    />
  );
};

Filter.propTypes = {
  onSearch: PropTypes.func
};

Filter.defaultProps = {
  onSearch: () => {}
};


export default Filter;
