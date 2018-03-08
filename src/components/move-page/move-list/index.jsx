import React from "react";

import MoveIndicator from "../../move-indicator";
import * as colors from "../../../data/colors.js";

import "./index.css";

const MoveList = ({ ...props }) => {
  const { moveData, params } = props;
  const movesOfType = moveData.filter((item) => item.moveType.toLowerCase() === params.type);
  const properType = params.type.replace(/\b\w/g, l => l.toUpperCase());
  const pageBackgroundColor = `${properType}Lighten`;

  return (
    <div className="MoveList__wrapper">
      <h2>{properType} Type Moves</h2>
      {movesOfType.map((item, index) =>
        <div
          className="MoveList__item"
          key={item.id}
        >
          <span
            className="MoveList__item_name"
            style={{
              backgroundColor: `${colors[pageBackgroundColor]}`
            }}
          >
            {item.moveName}
          </span>
          <div className="MonsterList__row">
            <div className="MoveList__item_description">
              <div className="VitalInfo__value">
                {item.moveDescription}
              </div>
            </div>
          </div>
            <div className="MonsterList__row">
              {item.moveEffect &&
                <div className="MoveList__item_moveBasics">
                  <div className="VitalInfo__value">
                    {item.moveEffect}
                  </div>
                  <div className="VitalInfo__label">
                    Secondary Effect
                  </div>
                </div>
              }
              { item.moveEffectPercent &&
                <div className="MoveList__item_moveBasics">
                  <div className="VitalInfo__value">
                    {item.moveEffectPercent}
                  </div>
                  <div className="VitalInfo__label">
                    Secondary Effect Percentage
                  </div>
                </div>
              }
            </div>
          <div className="MonsterList__row">
            <div className="MoveList__item_moveBasics">
              <div className="VitalInfo__value">
                {item.moveAccuracy}
              </div>
              <div className="VitalInfo__label">
                Accuracy
              </div>
            </div>
            <div className="MoveList__item_moveBasics">
              <div className="VitalInfo__value">
                {item.movePower}
              </div>
              <div className="VitalInfo__label">
                Power
              </div>
            </div>
            <div className="MoveList__item_moveBasics">
              <div className="VitalInfo__value">
                {item.movePP}
              </div>
              <div className="VitalInfo__label">
                PP
              </div>
            </div>
            <div className="MoveList__item_moveBasics">
              <div className="VitalInfo__value">
                <MoveIndicator
                  type={item.moveCategory}
                />
              </div>
              <div className="VitalInfo__label">
                Category
              </div>
            </div>
          </div>
          <div className="MonsterList__row">
            <div className="MoveList__item_moveBasics">
              <div className="VitalInfo__value">
                {item.movePriority}
              </div>
              <div className="VitalInfo__label">
                Priority
              </div>
            </div>
            <div className="MoveList__item_moveBasics">
              <div className="VitalInfo__value">
                {item.moveTM}
              </div>
              <div className="VitalInfo__label">
                TM
              </div>
            </div>
            <div className="MoveList__item_moveBasics">
              <div className="VitalInfo__value">
                {item.moveContact}
              </div>
              <div className="VitalInfo__label">
                Contact
              </div>
            </div>
            <div className="MoveList__item_moveBasics">
              <div className="VitalInfo__value">
                {item.moveTarget}
              </div>
              <div className="VitalInfo__label">
                Target
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoveList;
