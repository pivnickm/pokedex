import React, { Component } from 'react';
import { forceCheck } from 'react-lazyload';

import './index.css';

class App extends Component {
  componentDidMount() {
    window.addEventListener("resize", forceCheck);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", forceCheck);
  }

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App;
