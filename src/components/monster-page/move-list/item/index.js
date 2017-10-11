import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import TypeIndicator from "../../../type-indicator"
import MoveIndicator from "../../../move-indicator"
import "./index.css";

class MoveListItem extends Component {
	constructor(props) {
    super(props);

    this.state= {
      isOpen: false
    };

    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const { move } = this.props;
    return (
      <div className="MoveList__row" onClick={this.toggleOpen}>
        <div
          className="MoveList__row_wrap"
        >
          <span className="MoveList__row_item_level">{move.level}</span>
          <span className="MoveList__row_item_move">{move.name}</span>
          <span className="MoveList__row_item">
            { move.type.header
            ?
              move.type.text
            :
              <TypeIndicator
                type={move.type}
              />
            }
          </span>
          <span className="MoveList__row_item">{move.power}</span>
          <span className="MoveList__row_item">
          { !move.type.header &&
            <i
              className={`
                MoveList__row_drawer
                icon
                icon-up-open
                ${(this.state.isOpen
                ?
                  "icon__open"
                  :
                  "icon__closed"
              )}`}
            />
          }
          </span>
        </div>
        { !move.type.header &&
          <div
            className={`
              MoveList__row_item_more
              ${(this.state.isOpen
              ?
                "MoveList__open"
              :
                "MoveList__closed"

            )}`}
          >
            <div className="MoveList__row_item_sub">
              { !move.category.header &&
                <MoveIndicator
                    type={move.category}
                />
              }
            </div>
            <div className="MoveList__row_item_sub">
              <div>Accuracy</div>
              <div>{move.accuracy}</div>
            </div>
            <div className="MoveList__row_item_sub">
              <div>PP</div>
              <div>{move.pp}</div>
            </div>
            { move.notes &&
              <div className="MoveList__row_item_sub">
                <div>Notes</div>
                <div>{move.notes}</div>
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

MoveListItem.propTypes = {
  monsters: PropTypes.array
};

MoveListItem.defaultProps = {
  monsters: []
};


export default MoveListItem;
