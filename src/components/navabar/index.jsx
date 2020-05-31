import React from "react";

import "./navbar.scss";
import Logo from "../logo";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="container">
          <a href="/" className="brand">
            <Logo />
            acker News
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
