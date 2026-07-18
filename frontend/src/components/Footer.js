import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* ===== Left: Logo + Brand ===== */}
        <div className="footer-brand">
          <div className="footer-logo-card">
            <img
              src="/assets/Basnayaka-logo.png"
              alt="BFH Logo"
              className="footer-logo-icon"
            />
            <div className="footer-logo-text">
              <span className="footer-brand-name">Basnayaka</span>
              <span className="footer-brand-sub">Furniture House</span>
            </div>
          </div>
          <p className="footer-tagline">
            Premium furniture with AI driven discovery.
          </p>
        </div>

        {/* ===== Center: Quick Links ===== */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/browse">Products</Link></li>
            <li><Link to="/ai-search">AI Search</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* ===== Right: WhatsApp ===== */}
        <div className="footer-social">
          <h4>Contact Us</h4>
          <a
            href="https://wa.me/94773132443"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
          >
            <i className="fab fa-whatsapp"></i>
            <span>+94 77 313 2443</span>
          </a>
        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Basnayaka Furniture House. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;