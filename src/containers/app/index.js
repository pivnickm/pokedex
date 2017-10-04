import React, { Component } from 'react';
import { forceCheck } from 'react-lazyload';
import Header from "../../components/header";
import data from "../../data/monsters.json"

import './index.css';

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

  componentDidMount() {
    window.addEventListener("resize", forceCheck);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", forceCheck);
  }


  filterMonsters(data) {
    const term = this.state.term;

    return data.filter(monster => {
      const { monsterName } = monster;

      return monsterName.toLowerCase().startsWith(term.toLowerCase())
    });
  }

  render() {
    const { router, params, children } = this.props;
    const isHome = router.location.pathname === "/";
    const filteredData = this.filterMonsters(data);
    const id = params.id || 1;
    const childPage = React.Children.map(children, (child) => {
      if (child.type.name === "List") {
        return React.cloneElement(child, {
          monsters: filteredData
        });
      } else if (child.type.name === "MonsterPage") {
        return React.cloneElement(child, {
          monster: filteredData.find((pokemon) => {
            return pokemon.id === parseInt(id, 10);
          })
        });
      }
    });
    return (
      <div className="App">
        <Header
          isHome={isHome}
          onSearch={this.onSearch}
        />
        <div className="MonsterContent">
          {childPage}
        </div>
      </div>
    );
  }
}

export default App;
