// Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [category, setCategory] = useState('');
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();
    const navigate = useNavigate();

    const categories = [
        { value: '', label: 'All Categories' },
        { value: 'living-room', label: 'Living Room' },
        { value: 'bedroom', label: 'Bedroom' },
        { value: 'dining', label: 'Dining' },
        { value: 'office', label: 'Office' },
        { value: 'outdoor', label: 'Outdoor' },
    ];

    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        setCategory(selected);
        if (selected) {
            navigate(`/browse?category=${selected}`);
        } else {
            navigate('/browse');
        }
        setMenuOpen(false);
    };

    return (
        <header className="navbar-header">
            <div className="navbar-inner">
                {/* ===== LOGO CARD – image + text side-by-side ===== */}
                <div className="logo-card">
                    <img
                        src="/assets/Basnayaka-logo.png"
                        alt="BFH Logo"
                        className="logo-icon"
                    />
                    <div className="logo-text">
                        <span className="brand-name">Basnayaka</span>
                        <span className="brand-sub">Furniture House</span>
                    </div>
                </div>

                {/* ===== NAVIGATION PILL ===== */}
                <div className="nav-pill">
                    <div className="nav-gold-line"></div>

                    {/* Left: links + category */}
                    <div className="nav-left">
                        <ul className="nav-links">
                            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link to="/browse" onClick={() => setMenuOpen(false)}>Products</Link></li>
                            <li><Link to="/ai-search" onClick={() => setMenuOpen(false)}>AI Search</Link></li>
                            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                        </ul>
                        <div className="category-wrapper">
                            <select
                                value={category}
                                onChange={handleCategoryChange}
                                className="category-select"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Right: cart only (social removed) */}
                    <div className="nav-right">
                        <Link to="/cart" className="cart-link">
                            <i className="fas fa-shopping-cart"></i>
                            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
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
                    <li><Link to="/ai-search" onClick={() => setMenuOpen(false)}>AI Search</Link></li>
                    <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                    <li>
                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            className="category-select-mobile"
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;