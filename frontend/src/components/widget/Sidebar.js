import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="Sidebar">
      <ul>
        <li><NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink></li>
        <li><NavLink to="/invoice" className={({ isActive }) => (isActive ? 'active' : '')}>Invoice</NavLink></li>
        <li><NavLink to="/product" className={({ isActive }) => (isActive ? 'active' : '')}>Product</NavLink></li>
        <li><NavLink to="/customer" className={({ isActive }) => (isActive ? 'active' : '')}>Customer</NavLink></li>
        <li><NavLink to="/salesperson" className={({ isActive }) => (isActive ? 'active' : '')}>Salesperson</NavLink></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
