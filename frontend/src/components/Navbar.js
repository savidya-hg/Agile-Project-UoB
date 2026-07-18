import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  const categories = [
    { name: 'Living Room', path: '/browse?category=Living%20Room' },
    { name: 'Dining', path: '/browse?category=Dining' },
    { name: 'Office', path: '/browse?category=Office' },
    { name: 'Bedroom', path: '/browse?category=Bedroom' }
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-black tracking-widest text-black hover:opacity-80 transition-opacity">
          BFH
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-sm font-medium tracking-wide transition-colors duration-300 py-1 ${
              isActive('/') ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'
            }`}
          >
            Home
          </Link>
          <Link
            to="/browse"
            className={`text-sm font-medium tracking-wide transition-colors duration-300 py-1 ${
              isActive('/browse') && !location.search.includes('ai=true') ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'
            }`}
          >
            Shop
          </Link>
          <Link
            to="/browse?ai=true"
            className={`text-sm font-medium tracking-wide transition-colors duration-300 py-1 ${
              location.search.includes('ai=true') ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'
            }`}
          >
            AI Search
          </Link>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('contact-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-sm font-medium tracking-wide text-gray-500 hover:text-black transition-colors duration-300 py-1"
          >
            Contact
          </a>

          {/* All Categories Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 text-sm font-medium tracking-wide text-gray-500 hover:text-black transition-colors duration-300 py-1 focus:outline-none"
            >
              <span>All Categories</span>
              <svg className={`w-4 h-4 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.path}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Exactly two icons (strictly no text) */}
        <div className="flex items-center space-x-3.5 md:space-x-5">
          <Link 
            to="/admin" 
            className="p-2.5 text-gray-500 hover:text-black hover:bg-gray-50 rounded-full transition-colors duration-300"
            aria-label="Admin Dashboard"
          >
            {/* User-Shield Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </Link>

          <Link 
            to="/cart" 
            className="relative p-2.5 text-gray-500 hover:text-black hover:bg-gray-50 rounded-full transition-colors duration-300"
            aria-label="Cart"
          >
            {/* Cart Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-luxury-lilac text-black text-xs font-bold border border-white shadow-sm px-1">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-black hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-6 absolute left-0 w-full shadow-lg z-40 transition-all duration-300">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium tracking-wide py-2 ${
                isActive('/') ? 'text-black font-semibold border-l-2 border-black pl-3' : 'text-gray-500 hover:text-black hover:pl-3 transition-all'
              }`}
            >
              Home
            </Link>
            <Link
              to="/browse"
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium tracking-wide py-2 ${
                isActive('/browse') && !location.search.includes('ai=true') ? 'text-black font-semibold border-l-2 border-black pl-3' : 'text-gray-500 hover:text-black hover:pl-3 transition-all'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/browse?ai=true"
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium tracking-wide py-2 ${
                location.search.includes('ai=true') ? 'text-black font-semibold border-l-2 border-black pl-3' : 'text-gray-500 hover:text-black hover:pl-3 transition-all'
              }`}
            >
              AI Search
            </Link>
            <a
              href="#contact"
              onClick={(e) => {
                setIsOpen(false);
                e.preventDefault();
                const el = document.getElementById('contact-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-base font-medium tracking-wide py-2 text-gray-500 hover:text-black hover:pl-3 transition-all"
            >
              Contact
            </a>
            
            {/* Mobile Categories list */}
            <div className="pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-400 tracking-wider uppercase block mb-2 px-1">Categories</span>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium text-gray-500 hover:text-black py-2 pl-3"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium tracking-wide py-2 text-gray-500 hover:text-black hover:pl-3 transition-all flex items-center space-x-2 border-t border-gray-100 pt-3"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span>Admin</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;