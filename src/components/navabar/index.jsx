import React from "react";

import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        <div className="container">
          <a href="/" className={styles.brand}>
            <div className={styles.logo}>H</div>
            acker News
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
