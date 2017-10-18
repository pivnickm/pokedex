import React from "react";
import { PropTypes } from 'prop-types';

import "./index.css";

// TODO: convert these to hex or something? add it to colors file?
const barColor = (value) => {
  if (value <= 50) {
    return "red";
  } else if (value <= 75) {
    return "orange";
  } else if (value <= 100) {
    return "yellowgreen";
  } else if (value <= 175) {
    return "green";
  } else if (value <= 200) {
    return "limegreen";
  } else {
    return "cyan";
  }
}

const BaseStats = ({ monsterInfo }) => {
  const { monsterStats } = monsterInfo;
  return (
    <div className="BaseStats">
      { monsterStats.map((item) =>
        <div
          className="BaseStats__item_row"
          key={item.statName}
        >
          <span
            className="BaseStats__item_label"
          >
            {item.statName
              .replace("Special Attack", "Sp. Atk.")
              .replace("Special Defense", "Sp. Def.")}
          </span>
          <div
            className="BaseStats__item_value"
          >
            <div
              className="BaseStats__item_bar"
              style={{
                width: `calc(${(item.statValue / 2)}px + 2.5px - .5rem)`, // kinda bad, but makes 255 fit the width totally
                backgroundColor: barColor(item.statValue)
              }}
            >
              {item.statValue}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

BaseStats.propTypes = {
  defenseInfo: PropTypes.array
}

BaseStats.defaultProps = {
  defenseInfo: []
}

export default BaseStats;
