import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/assets/Basnayaka-logo.png" alt="BFH Logo" className="logo-img" />
          <span className="brand-text">Basnayaka Furniture House</span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fas fa-bars"></i>
        </button>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/browse" className="nav-link" onClick={() => setMenuOpen(false)}>Browse</Link></li>
          <li><Link to="/admin" className="nav-link" onClick={() => setMenuOpen(false)}>Admin</Link></li>
          <li>
            <Link to="/cart" className="nav-link cart-link" onClick={() => setMenuOpen(false)}>
              <i className="fas fa-shopping-cart"></i>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;