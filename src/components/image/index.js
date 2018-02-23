import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as getImageActions from "../../actions/get-image";

import "./index.css";

class Image extends Component {
  componentDidMount() {
    this.props.getImageActions.getImage(`${parseInt(this.props.id, 10)}.png`);
  }

  render() {
    return (
      <img
        className="MonsterList__sprite"
        src={this.props.image[parseInt(this.props.id, 10)]}
        alt={this.props.id}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    image: state.getImage.urls
  };
};

const mapDispatchToProps = dispatch => ({
  getImageActions: bindActionCreators(getImageActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Image);
