import React, { Component } from 'react';
// import LazyLoad, { forceCheck } from "react-lazyload";

import Header from "../header";
//import Spinner from "../spinner";
import Item from "./item";

import data from "../../data/monsters2.json";
import "./index.css";

class List extends Component {
	constructor(props) {
    super(props);

    this.state= {
      term: "",
      isTrayOpen: false
    };

		this.filterMonsters = this.filterMonsters.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.openTray = this.openTray.bind(this);
  }

  onSearch(evt) {
    this.setState({
      term: evt.target.value
    });
  }

  openTray() {
    this.setState((prevState) => ({
      isTrayOpen: !prevState.isTrayOpen
    }))
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
          onClick={this.openTray}
        />
        <ul className="MonsterList">
          { monsters.map((item) =>
            <Item
              key={item.monsterName}
              monsterName={item.monsterName}
              monsterId={parseInt(item.id, 10)}
              monsterNumber={item.id}
              monsterTypes={item.monsterTypes}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default List;
