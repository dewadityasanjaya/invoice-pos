import React from 'react';
import '../Header.css'; // Create and use a CSS file for Header specific styles
import { FaUserCircle, FaBell, FaEnvelope } from 'react-icons/fa';

function Header() {
  return (
    <header className="App-header">
      <div className="header-left">
        <img src="/path/to/logo.png" alt="Logo" className="logo" /> {/* Replace with your logo path */}
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
