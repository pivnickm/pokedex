import React from "react";
import { PropTypes } from 'prop-types';
import { Link } from "react-router";

import "./index.css";

const MonsterTabs = ({ id }) => {
  return (
    <div className="MonsterTabs">
      <ul
        className="MonsterTabs__List"
      >
        <li
          className="MonsterTabs__List_item"
        >
          <Link
            to={`/${id}/basic-info`}
            className="MonsterTabs__List_link"
          >
            Info
          </Link>
        </li>
        <li
          className="MonsterTabs__List_item"
        >
          <Link
            to={`/${id}/moves`}
            className="MonsterTabs__List_link"
          >
            Moves
          </Link>
        </li>
        <li
          className="MonsterTabs__List_item"
        >
          <Link
            to={`/${id}/stats`}
            className="MonsterTabs__List_link"
          >
            Stats
          </Link>
        </li>
        <li
          className="MonsterTabs__List_item"
        >
          <Link
            to={`/${id}/evolutions`}
            className="MonsterTabs__List_link"
          >
            Evolutions
          </Link>
        </li>
        <li
          className="MonsterTabs__List_item"
        >
          <Link
            to={`/${id}/defense`}
            className="MonsterTabs__List_link"
          >
            Weaknesses
          </Link>
        </li>
      </ul>
    </div>
  );
};

MonsterTabs.propTypes = {
  id: PropTypes.number,
  types: PropTypes.array
};

MonsterTabs.defaultProps = {
  id: 1,
  types: []
};


export default MonsterTabs;