import React from "react";
import { PropTypes } from 'prop-types';

import MoveListItem from "./item"

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
          <MoveListItem
            move={move}
            key={`${move.name}_${index}`}
          />
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