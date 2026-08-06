// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AISearchModal from './AISearchModal';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showAISearch, setShowAISearch] = useState(false);
    const [category, setCategory] = useState('');
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([{ value: '', label: 'All Categories' }]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Must import API inside or at the top if not imported.
                // It looks like API isn't imported, let's just use fetch or import it.
                // Wait, it's better to add the import at the top. I'll do that in a separate chunk or just use fetch for simplicity.
                // I will use fetch since we are hitting our own proxy.
                const res = await fetch('/api/settings');
                const data = await res.json();
                if (data && data.categories) {
                    const dynamicCats = data.categories.map(c => ({
                        value: c.toLowerCase().replace(/[^a-z0-9]/g, "-"),
                        label: c
                    }));
                    setCategories([{ value: '', label: 'All Categories' }, ...dynamicCats]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

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

                    {/* Left: links + category */}
                    <div className="nav-left">
                        <ul className="nav-links">
                            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link to="/browse" onClick={() => setMenuOpen(false)}>Products</Link></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); setShowAISearch(true); setMenuOpen(false); }}>AI Search</a></li>
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
            {showAISearch && <AISearchModal onClose={() => setShowAISearch(false)} />}
        </header>
    );
};

export default Navbar;