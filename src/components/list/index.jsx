import React, { Component } from "react";
// import LazyLoad, { forceCheck } from "react-lazyload";
import Sidebar from 'react-sidebar';
import Header from "../header";
import SidebarContent from "../sidebar";
//import Spinner from "../spinner";
import Item from "./item";
import { forceCheck } from "react-lazyload";

import data from "../../data/monsters2.json";
import "./index.css";

class List extends Component {
	constructor(props) {
    super(props);

    this.state= {
      term: "",
      sidebarOpen: false
    };

		this.filterMonsters = this.filterMonsters.bind(this);
		this.onSearch = this.onSearch.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSearch(evt) {
    this.setState({
      term: evt.target.value
    });
  }

  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }

  filterMonsters(data) {
    const term = this.state.term;

    return data.filter(monster => {
      const { monsterName } = monster;

      return monsterName.toLowerCase().startsWith(term.toLowerCase())
    });
  }

  componentDidUpdate(prevProps, prevState) {
    forceCheck();
  }

  render() {
    const monsters = this.filterMonsters(data);
    return (
      <Sidebar
        sidebar={SidebarContent}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
      >
        <Header
          isHome={true}
          onSearch={this.onSearch}
          onClick={this.openTray}
        />
        <a onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}>HI</a>
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
      </Sidebar>
    );
  }
}

export default List;
