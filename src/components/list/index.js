import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from "react-router";
import LazyLoad, { forceCheck } from "react-lazyload";

import TypeIndicator from "../type-indicator"
import Header from "../header";
import Spinner from "../spinner";

import data from "../../data/monsters.json";
import "./index.css";

class List extends Component {
	constructor(props) {
    super(props);

    this.state= {
      term: ""
    };

		this.filterMonsters = this.filterMonsters.bind(this);
		this.onSearch = this.onSearch.bind(this);
  }

  onSearch(evt) {
    this.setState({
      term: evt.target.value
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.term !== this.state.term) {
      forceCheck();
    }
  }

  filterMonsters(data) {
    const term = this.state.term;

    return data.filter(monster => {
      const { monsterName } = monster;

      return monsterName.toLowerCase().startsWith(term.toLowerCase())
    });
  }

  render() {
    const monsters = this.filterMonsters(data);
    return (
      <div>
        <Header
          isHome={true}
          onSearch={this.onSearch}
        />
        <ul className="MonsterList">
          { monsters.map((item) =>
            <li
              className="MonsterList__item_wrapper"
              key={item.id}
            >
              <Link
                className="MonsterList__item_link"
                to={`/${item.id}/basic-info`}
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
                      src={require(`../../data/images/hi_res/${item.id}.png`)}
                      alt={item.id}
                    />
                  </LazyLoad>
                  <div>
                    <p
                      className="MonsterList__label"
                    >
                      {item.monsterName}
                    </p>
                    {item.monsterTypes.map((type, index) => (
                      <TypeIndicator
                        key={type}
                        type={type}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  monsters: PropTypes.array
};

List.defaultProps = {
  monsters: []
};


export default List;
