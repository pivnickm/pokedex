import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router";

import typeData from "../../../data/typeData.json";
import * as colors from "../../../data/colors.js";

import "./index.css";

const TypeList = () => {
  return (
    <div className="TypeList__wrapper">
      {typeData.map((item, index) =>
        <div key={index} className="TypeList__typeWrapper">
          <Link
            className="TypeList__link"
            to={`movedex/${item.type.toLowerCase()}`}
          >
            <div
              id={item.type}
              className="typeWrapper__header"
              style={{
                backgroundColor: `${colors[item.type]}`
              }}
            >
              {item.type}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

TypeList.propTypes = {
  id: PropTypes.string
}

TypeList.defaultProps = {
  id: ""
}

export default TypeList;
