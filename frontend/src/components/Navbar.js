import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="navbar container">
      <Link to="/" className="logo">🏠 BFH</Link>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>☰</button>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/browse" onClick={() => setIsOpen(false)}>Browse</Link></li>
        <li><Link to="/admin" onClick={() => setIsOpen(false)}>Admin</Link></li>
        <li><Link to="/cart" onClick={() => setIsOpen(false)}>🛒 Cart</Link></li>
      </ul>
    </nav>
  );
};
export default Navbar;