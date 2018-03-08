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
        <Filter
          onSearch={onSearch}
        />
        <Link className="Header__inner_appLink types" to="/types">
          <i className="icon icon-fire icon-big" />
          <span className="Header__inner_appLinkText">TypeDex</span>
        </Link>
        <Link className="Header__inner_appLink" to="/movedex">
          <i className="icon icon-hand-grab-o icon-big" />
          <span className="Header__inner_appLinkText">MoveDex</span>
        </Link>
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
        <Link className="Header__inner_appLink types" to="/types">
          <i className="icon icon-fire icon-big" />
          <span className="Header__inner_appLinkText">TypeDex</span>
        </Link>
        <Link className="Header__inner_appLink" to="/movedex">
          <i className="icon icon-hand-grab-o icon-big" />
          <span className="Header__inner_appLinkText">MoveDex</span>
        </Link>
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
