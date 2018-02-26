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
              <span
                className="MonsterTabs__List_link_text"
              >
                {item.title}
              </span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

MonsterTabs.propTypes = {
  id: PropTypes.string
};

MonsterTabs.defaultProps = {
  id: "001"
};


export default MonsterTabs;