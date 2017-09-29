import React, { Component } from 'react';
import { forceCheck } from 'react-lazyload';
import './index.css';
import List from "../../components/list";
import Filter from "../../components/filter";
import Spinner from "../../components/spinner";
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
