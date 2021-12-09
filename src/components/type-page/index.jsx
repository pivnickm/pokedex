import React, { Component } from "react";

import Header from "../header";
import TypeIndicator from "../type-indicator"

import * as colors from "../../data/colors.js";
import typeData from "../../data/typeData.json";
import "./index.css";

class TypePage extends Component {
  componentDidMount() {
    this.scrollTop = 0;
  }

  set scrollTop(x) {
    (document.scrollingElement || document.documentElement).scrollTop = x;
  }

  render() {
    return (
      <div>
        <Header
          isHome={false}
        />
        {typeData.map((item, index) =>
          <div key={index} className="typeWrapper">
            <div
              id={item.type}
              className="typeWrapper__header"
              style={{
                backgroundColor: `${colors[item.type]}`
              }}
            >
              {item.type}
            </div>
            <div
              className="typeWrapper__section types__stronger"
            >
              {item.typesAgainst.map((item, index) =>
                (item.multiplier > 1) &&
                  <div
                    className="typeWrapper__section_wrap"
                    key={`${item.multiplier}_${item.type}`}
                  >

                    <div className="typeWrapper__section_value">
                      <TypeIndicator
                        key={item.type}
                        type={item.type}
                      />
                    </div>
                    <div className="typeWrapper__section_value">
                      {item.multiplier}x
                    </div>
                  </div>
              )}
            </div>
            <div
              className="typeWrapper__section types__weaker"
            >
              {item.typesAgainst.map((item, index) =>
                (item.multiplier <= 1) &&
                  <div
                    className="typeWrapper__section_wrap"
                    key={`${item.multiplier}_${item.type}`}
                  >
                    <div className="typeWrapper__section_value">
                      <TypeIndicator
                        key={item.type}
                        type={item.type}
                      />
                    </div>
                    <div className="typeWrapper__section_value">
                      {item.multiplier}x
                    </div>
                  </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TypePage;
