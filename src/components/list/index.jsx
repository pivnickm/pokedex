import React, { Component } from "react";

import Header from "../header";
import Item from "./item";

// import data from "../../data/monsters2.json";
import data from "../../data/monstersGen7.json";
import "./index.css";


class List extends Component {
	constructor(props) {
    super(props);

    this.state= {
      term: "",
      generations: [10, 1, 2, 3, 4,5, 6,7],
      filteredGeneration: 10
    };

		this.filterMonsters = this.filterMonsters.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onFilterGen = this.onFilterGen.bind(this);
  }

  onSearch(evt) {
    this.setState({
      term: evt.target.value
    });
  }

  onFilterGen(evt) {
    const { value } = evt.target;
    this.setState({
      filteredGeneration: parseInt(value, 10)
    })
  }

  filterMonsters(data) {
    const { term, filteredGeneration } = this.state;
    let generationArray;

    if (filteredGeneration === 1) {
      generationArray = data.slice(0, 151);
    } else if (filteredGeneration === 2) {
      generationArray = data.slice(151, 251);
    } else if (filteredGeneration === 3) {
      generationArray = data.slice(251, 386);
    } else if (filteredGeneration === 4) {
      generationArray = data.slice(386, 493);
    } else if (filteredGeneration === 5) {
      generationArray = data.slice(493, 649);
    } else if (filteredGeneration === 6) {
      generationArray = data.slice(649, 721);
    } else if (filteredGeneration === 7) {
      generationArray = data.slice(721, 809);
    } else if (filteredGeneration === 10) {
      generationArray = data;
    }

    return generationArray.filter(monster => {
      const { monsterName } = monster;

      return monsterName.toLowerCase().startsWith(term.toLowerCase())
    });
  }

  render() {
    const monsters = this.filterMonsters(data);
    return (
      <div id="outer-container">
        <Header
          isHome={true}
          onSearch={this.onSearch}
          onClick={this.onSetSidebarOpen}
          generations={this.state.generations}
          filteredGeneration={this.state.filteredGeneration}
          onFilterGen={this.onFilterGen}
        />
        <ul className="MonsterList">
          {monsters.map((item) =>
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
