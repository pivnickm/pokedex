import React, { Component } from 'react';
import { Link } from "react-router";

import "./index.css";

class Sidebar extends Component {

  render() {
    const links = [
      {
        text: "TypeDex",
        icon: "icon-fire",
        url: "/types"
      }, {
        text: "MoveDex",
        icon: "icon-hand-grab-o",
        url: "/movedex"
      }
    ];
    return (
      <ul className="Sidebar__wrapper">
        {links.map((item) =>
          <li
            className="Sidebar__wrapper_item"
            key={item.text}
          >
            <Link className="Sidebar__appLink" to={item.url}>
              <i className={`icon ${item.icon} icon-big`} />
              <span className="Sidebar__appLinkText">
                {item.text}
              </span>
            </Link>
          </li>
        )}
      </ul>
    );
  }
}

export default Sidebar;
