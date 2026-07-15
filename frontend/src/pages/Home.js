import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* HERO SECTION – full width with background image */}
      <section className="hero-section" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Find Furniture Smarter</h1>
            <p className="hero-subtitle">
              Upload a photo and discover matching pieces from our premium collection.
              Craft your perfect space with unparalleled precision.
            </p>
            <div className="hero-buttons">
              <Link to="/browse" className="btn-primary">
                <i className="fas fa-store"></i> Explore Collection
              </Link>
              <Link to="/browse" className="btn-secondary">
                <i className="fas fa-camera"></i> Upload Photo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION – clean cards */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <i className="fas fa-couch stat-icon"></i>
            <span className="stat-number">1000+</span>
            <span className="stat-label">PREMIUM PRODUCTS</span>
          </div>
          <div className="stat-item">
            <i className="fas fa-star stat-icon"></i>
            <span className="stat-number">95%</span>
            <span className="stat-label">SATISFACTION RATE</span>
          </div>
          <div className="stat-item">
            <i className="fab fa-whatsapp stat-icon"></i>
            <span className="stat-number">24/7</span>
            <span className="stat-label">WHATSAPP SUPPORT</span>
          </div>
        </div>
      </section>

      {/* CURATED SPACES – room cards */}
      <section className="spaces-section">
        <div className="spaces-header">
          <h2>Curated Spaces</h2>
          <p>Explore our meticulously designed collections by room.</p>
          <Link to="/browse" className="view-all-link">
            View All <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="spaces-grid">
          <div className="space-card">
            <div className="space-icon"><i className="fas fa-couch"></i></div>
            <h3>Living Room</h3>
            <p>The heart of your home, redefined.</p>
          </div>
          <div className="space-card">
            <div className="space-icon"><i className="fas fa-bed"></i></div>
            <h3>Bedroom</h3>
            <p>Sanctuaries of serenity.</p>
          </div>
          <div className="space-card">
            <div className="space-icon"><i className="fas fa-utensils"></i></div>
            <h3>Dining</h3>
            <p>Gather and celebrate in style.</p>
          </div>
          <div className="space-card">
            <div className="space-icon"><i className="fas fa-chair"></i></div>
            <h3>Office</h3>
            <p>Productivity meets elegance.</p>
          </div>
        </div>
      </section>

      {/* FOOTER – simple and elegant */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h2>BFH</h2>
            <p>Defining modern luxury through exceptional craftsmanship and intelligent design discovery.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">Brand Story</Link></li>
                <li><Link to="/collections">Collections</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Innovation</h4>
              <ul>
                <li><Link to="/ai-experience">AI Experience</Link></li>
                <li><Link to="/material-science">Material Science</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Basnayaka Furniture House. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;