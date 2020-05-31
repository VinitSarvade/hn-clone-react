import React from "react";

import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="container">
          <a href="/" className="brand">
            <div className="logo">H</div>
            acker News
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
