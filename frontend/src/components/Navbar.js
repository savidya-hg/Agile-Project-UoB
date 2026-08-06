// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AISearchModal from './AISearchModal';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showAISearch, setShowAISearch] = useState(false);
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();

    return (
        <header className="navbar-header">
            <div className="navbar-inner">
                {/* ===== LOGO CARD – image + text side-by-side ===== */}
                <Link to="/" className="logo-card">
                    <img
                        src="/assets/Basnayaka-logo.png"
                        alt="BFH Logo"
                        className="logo-icon"
                    />
                    <div className="logo-text">
                        <span className="brand-name">Basnayaka</span>
                        <span className="brand-sub">Furniture House</span>
                    </div>
                </Link>

                {/* ===== NAVIGATION PILL ===== */}
                <div className="nav-pill">
                    <div className="nav-gold-line"></div>

                    {/* Left: links */}
                    <div className="nav-left">
                        <ul className="nav-links">
                            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link to="/browse" onClick={() => setMenuOpen(false)}>Products</Link></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); setShowAISearch(true); setMenuOpen(false); }}>AI Search</a></li>
                            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                        </ul>
                    </div>

                    {/* Right: admin and cart icons */}
                    <div className="nav-right">
                        <Link to="/cart" className="cart-link" title="Shopping Cart">
                            <i className="fas fa-shopping-cart"></i>
                            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                        </Link>
                        <Link to="/admin" className="cart-link" title="Admin Dashboard">
                            <i className="fas fa-user-shield"></i>
                        </Link>
                    </div>

                    {/* Hamburger (mobile) */}
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
                <ul>
                    <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/browse" onClick={() => setMenuOpen(false)}>Products</Link></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setShowAISearch(true); setMenuOpen(false); }}>AI Search</a></li>
                    <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                </ul>
            </div>
            {showAISearch && <AISearchModal onClose={() => setShowAISearch(false)} />}
        </header>
    );
};

export default Navbar;