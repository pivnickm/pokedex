import React, { Component } from "react";

import Header from "../header";

import moveData from "../../data/moves.json";
import "./index.css";

class MovePage extends Component {
  componentDidMount() {
    this.scrollTop = 0;
  }

  set scrollTop(x) {
    (document.scrollingElement || document.documentElement).scrollTop = x;
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        moveData
      })
    );

    return (
      <div>
        <Header
          isHome={false}
        />
        {childrenWithProps}
      </div>
    );
  }
}

export default MovePage;
