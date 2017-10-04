import React from "react";
import { PropTypes } from 'prop-types';
import { Link } from "react-router";
import Filter from "../filter";

import "./index.css";
import "../../fontello/css/fontello.css";

const Header = ({ isHome, onSearch }) => {
  return (
  <div className="Header">
    { isHome
    ?
      <div
        className="HomeHeader"
      >
        <i className="icon icon-menu icon-big" />
        <Filter
          onSearch={onSearch}
        />
      </div>
    :
      <div
        className="GenHeader"
      >
        <Link
          className="GenHeader__homeLink"
          to={"/"}
        >
          <i className="icon icon-left-big icon-big" />
        </Link>
      </div>
    }
  </div>
  );
};

Header.propTypes = {
  isHome: PropTypes.bool
}

Header.defaultProps = {
  isHome: false
}

export default Header;
