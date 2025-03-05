import React from "react";
import logo from "../assets/images/logo.png" 

const Header: React.FC = () => {
  return (
    <header>
      <div>
        <img src={logo} alt="" />
      </div>
    </header>
  );
};

export default Header;