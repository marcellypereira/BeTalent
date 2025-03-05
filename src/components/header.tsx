import React from "react";
import styles from "../styles/header.module.css";
import logo from "../assets/images/logo.png" 

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="" />
      </div>
    </header>
  );
};

export default Header;