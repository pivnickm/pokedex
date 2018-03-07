import React from "react";

import pikachuLibre from "../../data/images/hi_res/25-libre.png";

import "./index.css";

const FourOhFour = () => {
  return (
    <div
      className="NotFound"
    >
      <img src={pikachuLibre} alt="Pikachu Libre is sad the page cannot be found!" />
      <h1>Error 404</h1>
      <h2>Pikachu Libre is sad the page cannot be found!</h2>
    </div>
  );
};


export default FourOhFour;