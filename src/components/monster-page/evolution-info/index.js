import React from "react";
import { PropTypes } from 'prop-types';
import { Link } from "react-router";

import data from "../../../data/monsters.json";
import "./index.css";

const EvolutionInfo = ({ evolutions  }) => {
  const newItems = evolutions.filter((item) => {
    return data.find((innerItem) => {
      return innerItem.id === parseInt(item.id, 10);
    });
  });
  return (
    <div className="EvolutionInfo">
      { newItems.map((evolution, index) =>
        <div
          key={evolution.name}
          className="EvolutionInfo__item"
        >
        { evolution.method && evolution.method.length > 0 &&
          <span className="EvolutionInfo__item_method">{evolution.method}</span>
        }
        <Link
          className="EvolutionInfo__item_link"
          to={`/${evolution.id}`}
        >
          <img
            className="EvolutionInfo__sprite"
            src={require(`../../../data/images/hi_res/${evolution.id}.png`)}
            alt={evolution.id}
          />
          <span className="EvolutionInfo__item_text">{evolution.name}</span>
        </Link>
        </div>
      )}
    </div>
  );
}

EvolutionInfo.propTypes = {
  evolutions: PropTypes.array
}

EvolutionInfo.defaultProps = {
  evolutions: []
}

export default EvolutionInfo;
