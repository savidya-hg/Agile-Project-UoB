import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // Sample furniture images from Unsplash (replace with your own)
  const featuredProducts = [
    { id: 1, name: 'Elegant Sofa', price: '$1,200', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Minimalist Bed', price: '$2,100', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Dining Table', price: '$1,800', image: 'https://images.unsplash.com/photo-1617806118239-18e1b0e11c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Office Chair', price: '$450', image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 5, name: 'Bookshelf', price: '$750', image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 6, name: 'Coffee Table', price: '$600', image: 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="home-page">
      {/* ===== HERO ===== */}
      <section className="hero-section" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title animate-fade-up">Find Furniture Smarter</h1>
            <p className="hero-subtitle animate-fade-up delay-1">
              Upload a photo and discover matching pieces from our premium collection.
              Craft your perfect space with unparalleled precision.
            </p>
            <div className="hero-buttons animate-fade-up delay-2">
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

      {/* ===== STATS ===== */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item animate-fade-up">
            <i className="fas fa-couch stat-icon"></i>
            <span className="stat-number">1000+</span>
            <span className="stat-label">PREMIUM PRODUCTS</span>
          </div>
          <div className="stat-item animate-fade-up delay-1">
            <i className="fas fa-star stat-icon"></i>
            <span className="stat-number">95%</span>
            <span className="stat-label">SATISFACTION RATE</span>
          </div>
          <div className="stat-item animate-fade-up delay-2">
            <i className="fab fa-whatsapp stat-icon"></i>
            <span className="stat-number">24/7</span>
            <span className="stat-label">WHATSAPP SUPPORT</span>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS (NEW) ===== */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Furniture</h2>
          <p>Our most loved pieces, curated for your dream space.</p>
          <div className="section-line"></div>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product, index) => (
            <div className="product-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }} key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <Link to={`/product/${product.id}`} className="btn-outline">View Details</Link>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <span className="product-price">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <Link to="/browse" className="btn-primary">Browse All Products <i className="fas fa-arrow-right"></i></Link>
        </div>
      </section>

      {/* ===== CURATED SPACES (existing) ===== */}
      <section className="spaces-section">
        <div className="spaces-header">
          <h2>Curated Spaces</h2>
          <p>Explore our meticulously designed collections by room.</p>
          <Link to="/browse" className="view-all-link">
            View All <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="spaces-grid">
          <div className="space-card animate-fade-up">
            <div className="space-icon"><i className="fas fa-couch"></i></div>
            <h3>Living Room</h3>
            <p>The heart of your home, redefined.</p>
          </div>
          <div className="space-card animate-fade-up delay-1">
            <div className="space-icon"><i className="fas fa-bed"></i></div>
            <h3>Bedroom</h3>
            <p>Sanctuaries of serenity.</p>
          </div>
          <div className="space-card animate-fade-up delay-2">
            <div className="space-icon"><i className="fas fa-utensils"></i></div>
            <h3>Dining</h3>
            <p>Gather and celebrate in style.</p>
          </div>
          <div className="space-card animate-fade-up delay-3">
            <div className="space-icon"><i className="fas fa-chair"></i></div>
            <h3>Office</h3>
            <p>Productivity meets elegance.</p>
          </div>
        </div>
      </section>

      {/* ===== CONSULTATION CTA (like ENOLA's "Запись на мастер класс") ===== */}
      <section className="consultation-section">
        <div className="consultation-content">
          <h2>Book a Design Consultation</h2>
          <p>Let our experts help you create the perfect space. Free 30-minute session.</p>
          <Link to="/contact" className="btn-primary">
            <i className="fas fa-calendar-alt"></i> Schedule Now
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
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