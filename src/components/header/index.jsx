import React from "react";
import { PropTypes } from 'prop-types';
import { Link } from "react-router";
import Filter from "../filter";

import "./index.css";
import "../../fontello/css/fontello.css";

const Header = ({
  isHome,
  onSearch,
  text,
  onClick,
  generations,
  filteredGeneration,
  onFilterGen
}) => {
  return (
  <div className="Header">
    <div
      className="Header__inner"
    >
      { isHome
      ?
        <Filter
          onSearch={onSearch}
        />
      :
        <React.Fragment>
          <Link
            className="Header__inner_link"
            to={"/"}
          >
            <i className="icon icon-left-big icon-big" />
          </Link>
          <div className="Header__inner_text">
            {text}
          </div>
        </React.Fragment>
      }
      <Link className="Header__inner_appLink types" to="/types">
        <i className="icon icon-fire icon-big" />
        <span className="Header__inner_appLinkText">TypeDex</span>
      </Link>
      <Link className="Header__inner_appLink" to="/movedex">
        <i className="icon icon-hand-grab-o icon-big" />
        <span className="Header__inner_appLinkText">MoveDex</span>
      </Link>
    </div>
    {generations && generations.map(gen => (
      <span className="GenFilter__wrapper" key={gen}>
        <input
          className="GenFilter__input"
          type="radio"
          id={`gen${gen}`}
          value={gen}
          checked={filteredGeneration === gen}
          onChange={onFilterGen}
        />
        <label className="GenFilter__label" for={`gen${gen}`}>
          {gen === 10 ? "All" : `Gen ${gen}`}
        </label>
      </span>
    ))}
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
