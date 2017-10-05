import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import TypeIndicator from "../../type-indicator"

import "./index.css";

class DefensiveInfo extends Component {
  constructor(props) {
    super(props);

    this.state= {
      defensiveDataOpen: false
    };

    this.toggleDefensiveData = this.toggleDefensiveData.bind(this);
  }


  toggleDefensiveData() {
    this.setState((prevState) => ({
      defensiveDataOpen: !prevState.defensiveDataOpen
    }));
  }

  render() {
    const { defenseInfo } = this.props;
    return (
      <div className="DefensiveInfo">
        <div className="DefensiveInfo__header">
          Damage Taken
        </div>
        <div className="DefensiveInfo__types">
          {defenseInfo.map((item, key) =>
            item.dmgMultiplier !== 1 &&
              <div key={item.typeName} className="DefensiveInfo__item">
                <TypeIndicator
                  type={item.typeName}
                />
                <div className="DefensiveInfo__value">
                  {item.dmgMultiplier}
                </div>
              </div>
          )}
        </div>
      </div>
    );
  }
}

DefensiveInfo.propTypes = {
  defenseInfo: PropTypes.array
}

DefensiveInfo.defaultProps = {
  defenseInfo: []
}

export default DefensiveInfo;
