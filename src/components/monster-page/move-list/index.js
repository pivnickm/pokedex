import React from "react";
import { PropTypes } from 'prop-types';

import TypeIndicator from "../../type-indicator"
import MoveIndicator from "../../move-indicator"
import "./index.css";

const MoveList = ({ moves }) => {
  const enhancedMoves =
  [
    ...[{
      level: "Level",
      name: "Move",
      type: {
        text: "Type",
        header: true
      },
      power: "Power",
      category: {
        text: "Category",
        header: true
      },
      accuracy: "Accuracy",
      pp: "PP"
    }],
    ...moves
  ]
  return (
    <div className="MoveList">
      <div className="DefensiveInfo__header">
        Learned Moves
      </div>
      <div className="MoveList__moves">
        { enhancedMoves.map((move, index) =>
          <div className="MoveList__row" key={`${move.name}_${index}`}>
            <span className="MoveList__row_item_level">{move.level}</span>
            <span className="MoveList__row_item_move">{move.name}</span>
            <span className="MoveList__row_item">
              { move.type.header
              ?
                move.type.text
              :
                <TypeIndicator
                  type={move.type}
                />
              }
            </span>
            <span className="MoveList__row_item">{move.power}</span>
            { !move.type.header &&
              <div
                className="MoveList__row_item_more"
              >
                <div className="MoveList__row_item">
                  { !move.category.header &&
                    <MoveIndicator
                        type={move.category}
                    />
                  }
                </div>
                <span className="MoveList__row_item_acc">Accuracy: {move.accuracy}</span>
                <span className="MoveList__row_item">PP: {move.pp}</span>
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}

MoveList.propTypes = {
  defenseInf:PropTypes.array
}

MoveList.defaultProps = {
  defenseInf:[]
}

export default MoveList;

/*

accuracy:"100%"
category:"Physical"
level:"1"
name:"Tackle"
power:"50"
pp:"35"
type:"Normal"

*/