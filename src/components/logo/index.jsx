import React from "react";

import "./logo.scss";

const Logo = ({ className }) => {
  return <div className={`logo ${className || ""}`}>H</div>;
};

export default Logo;
