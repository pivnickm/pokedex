import React, { Component } from 'react';
import { forceCheck } from 'react-lazyload';
import './index.css';
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
    const id = this.props.params.id || 1;
    const children = React.Children.map(this.props.children, (child) => {
      if (child.type.name === "List") {
        return React.cloneElement(child, {
          monsters: filteredData
        });
      } else if (child.type.name === "Test") {
        return React.cloneElement(child, {
          monster: filteredData.find((pokemon) => {
            return pokemon.id === parseInt(id, 10);
          })
        });
      }
    });
    return (
      <div className="App">
        <div className="App-header">
          {/* TODO: hide if not on index */}
          <Filter
            onSearch={this.onSearch}
          />
        </div>
        <div className="MonsterContent">
          {children}
        </div>
      </div>
    );
  }
}

export default App;
