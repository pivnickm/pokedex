import React from "react";
import { PropTypes } from 'prop-types';

const EvolutionItem = ({ stage  }) => {
  return (
    <div className="EvolutionInfo">
      {stage.map((evoStage, index) =>
        <div
          className="EvolutionInfo__wrap_item"
          key={evoStage.name}
        >
          { evoStage.method &&
            <p className="EvolutionInfo__wrap_method">{evoStage.method}</p>
          }
          <div
            className="EvolutionInfo__stage_wrap"
          >
            <img
              className="EvolutionInfo__wrap_image"
              src={require(`../../../../data/images/svg/${evoStage.id}.svg`)}
              alt={evoStage.id}
            />
            <span className="EvolutionInfo__stage_id">
              {`#${("0000" + evoStage.id).substr(-3, 3)}`}
            </span>
            <div className="EvolutionInfo__stage_name">
              {evoStage.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

EvolutionItem.propTypes = {
  stage: PropTypes.array
}

EvolutionItem.defaultProps = {
  stage: []
}

export default EvolutionItem;