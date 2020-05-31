import React from "react";

import "./loader.scss";
import Logo from "../logo";

const index = () => {
  return (
    <div className="loader-container">
      <div className="wrapper">
        <Logo className="loader" />
      </div>
    </div>
  );
};

export default index;
