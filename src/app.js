import React, { Component } from "react";
import { Router, browserHistory } from "react-router";
import { useBasename } from 'history';
import routes from "./routes";

class App extends Component {
  render () {
    return (
      <Router history={useBasename(() => browserHistory)({ basename: '/pokedex' })}>
        {routes}
      </Router>
    );
  }
}

export default App;