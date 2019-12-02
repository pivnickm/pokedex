import React from "react";
import { PropTypes } from 'prop-types';

import MoveListItem from "./item"

import "./index.css";

const MoveList = ({ monsterInfo }) => {
  const enhancedMoves = monsterInfo.monsterMoves.map((moveSet) => {
    return {
      header: moveSet.header,
      moves: [
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
        ...moveSet.moves
      ]
    };
  });
  return (
    <div className="MoveList">
      { enhancedMoves.map((moveSet, index) => (
        <div className="MoveList_wrapper" key={index}>
          <h4 className="MoveList_header">{moveSet.header}</h4>
          { moveSet.moves.map((move, index) => (
            <MoveListItem
              move={move}
              key={`${move.name}_${index}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

MoveList.propTypes = {
  monsterInfo: PropTypes.object
}

MoveList.defaultProps = {
  monsterInfo: {}
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