import React from "react";
import { PropTypes } from 'prop-types';
import { Link } from "react-router";
import LazyLoad from "react-lazyload";

import TypeIndicator from "../type-indicator"
import Spinner from "../spinner";

import "./index.css";

const List = ({ monsters }) => {
  return (
    <ul className="MonsterList">
      { monsters.map((item) =>
        <li
          className="MonsterList__item_wrapper"
          key={item.id}
        >
          <Link
            className="MonsterList__item_link"
            to={`/pokemon/${item.id}`}
          >
            <div
              className="MonsterList__item"
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
              <div>
                <p
                  className="MonsterList__label"
                >
                  {item.monsterName}
                </p>
                <TypeIndicator
                  types={item.monsterTypes}
                />
              </div>
            </div>
          </Link>
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
