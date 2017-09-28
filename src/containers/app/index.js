import React, { Component } from 'react';
import './index.css';
import List from "../../components/list";
import Filter from "../../components/filter";
import data from "../../data/monsters.json"

class App extends Component {
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

  filterMonsters(data) {
    const term = this.state.term;

    return data.filter(monster => {
      const { monsterName } = monster;

      return monsterName.toLowerCase().includes(term.toLowerCase())
    });
  }

  render() {
    const filteredData = this.filterMonsters(data);
    return (
      <div className="App">
        <div className="App-header">
          <Filter
            onSearch={this.onSearch}
          />
        </div>
        <div className="MonsterContent">
          <List
            monsters={filteredData}
          />
        </div>
      </div>
    );
  }
}

export default App;
