import React from "react";

import "./index.css";

const Spinner = () => {
  return (
    <div className="PokeballSpinner">
      <div className="PokeballSpinner__center"></div>
      <div className="PokeballSpinner__seam"></div>
    </div>
  );
};

export default Spinner;
