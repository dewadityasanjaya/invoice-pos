import React from 'react';
import '../../styles/Header.css';
import { FaUserCircle, FaBell, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/logo-pos.png';

function Header() {
  return (
    <header className="App-header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="header-right">
        <FaEnvelope className="header-icon" />
        <FaBell className="header-icon" />
        <FaUserCircle className="header-icon" />
      </div>
    </header>
  );
}

export default Header;
