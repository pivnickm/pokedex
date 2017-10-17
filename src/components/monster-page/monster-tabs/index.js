import React from "react";
import { PropTypes } from 'prop-types';
import { Link } from "react-router";

import tabData from "./tab-data";
import "./index.css";

const MonsterTabs = ({ id }) => {
  return (
    <div className="MonsterTabs">
      <ul
        className="MonsterTabs__List"
      >
        { tabData.tabLinks.map((item, index) =>
          <li
            className="MonsterTabs__List_item"
            key={item.title}
          >
            <Link
              to={`/${id}/${item.to}`}
              className="MonsterTabs__List_link"
              activeClassName="MonsterTabs__active"
              onlyActiveOnIndex={true}
            >
              <i className={`icon ${item.iconName}`} />
            </Link>
          </li>
        )}
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