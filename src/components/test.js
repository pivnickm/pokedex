import React from "react";
import { PropTypes } from 'prop-types';


const Test = ({ monster }) => {
  return (
    <div>
      {monster.id} {monster.monsterName}
    </div>
  );
};

Test.propTypes = {
  monsters: PropTypes.array
};

Test.defaultProps = {
  monsters: []
};


export default Test;
