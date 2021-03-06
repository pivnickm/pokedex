import React from "react";
import { PropTypes } from 'prop-types';
import { Link } from "react-router";
import Filter from "../filter";

import "./index.css";
import "../../fontello/css/fontello.css";

const Header = ({ isHome, onSearch, text, onClick }) => {
  return (
  <div className="Header">
    { isHome
    ?
      <div
        className="Header__inner"
      >
        <i
          className="icon icon-menu icon-big"
          onClick={onClick}
        />
        <Filter
          onSearch={onSearch}
        />
      </div>
    :
      <div
        className="Header__inner"
      >
        <Link
          className="Header__inner_link"
          to={"/"}
        >
          <i className="icon icon-left-big icon-big" />
        </Link>
        <div className="Header__inner_text">
          {text}
        </div>
      </div>
    }
  </div>
  );
};

Header.propTypes = {
  isHome: PropTypes.bool,
  onSearch: PropTypes.func,
  text: PropTypes.string
}

Header.defaultProps = {
  isHome: false,
  onSearch: () => {},
  text: ""
}

export default Header;
