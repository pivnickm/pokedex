import React from "react";
import { PropTypes } from 'prop-types';
import LazyLoad from "react-lazyload";
import Spinner from "../spinner";

import "./index.css";

const List = ({ monsters }) => {
  return (
    <ul className="MonsterList">
      { monsters.map((item) =>
        <li
          className={
            `MonsterList__item_wrapper
            ${item.monsterTypes[1]
              ?
                item.monsterTypes[1]
              :
                item.monsterTypes[0]}`
            }
          key={item.id}
        >
          <div
            className={`MonsterList__item ${item.monsterTypes[0]}`}
          >
            <LazyLoad
              height={200}
              placeholder={<Spinner />}
            >
              <img
                className="MonsterList__sprite"
                src={`/hi_res/${item.id}.png`}
                alt={item.id}
              />
            </LazyLoad>
            <p
              className="MonsterList__label"
            >
              {item.monsterName}
            </p>
          </div>
        </li>
      )}
    </ul>
  );
};

List.propTypes = {
  monsters: PropTypes.array
};

List.defaultProps = {
  monsters: []
};


export default List;
