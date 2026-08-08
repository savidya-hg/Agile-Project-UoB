import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {


  return (
    <div className="home-page">
      {/* ===== HERO ===== */}
      <section className="hero-section" style={{ backgroundImage: "url('/assets/hero-img.png')" }}>
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
              <Link to="/browse?ai=true" className="btn-secondary">
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

      {/* ===== CURATED SPACES ===== */}
      <section className="spaces-section">
        <div className="spaces-header">
          <h2>Curated Spaces</h2>
          <p>Explore our meticulously designed collections by room.</p>
          <Link to="/browse" className="view-all-link">
            View All <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="spaces-grid">
          <Link to="/browse?category=living-room" className="space-card animate-fade-up" style={{ backgroundImage: "url('/assets/living_room_scene.png')" }}>
            <div className="space-card-content">
              <h3>Living Room</h3>
              <p>The heart of your home, redefined.</p>
            </div>
          </Link>
          <Link to="/browse?category=bedroom" className="space-card animate-fade-up delay-1" style={{ backgroundImage: "url('/assets/bedroom_scene.png')" }}>
            <div className="space-card-content">
              <h3>Bedroom</h3>
              <p>Sanctuaries of serenity.</p>
            </div>
          </Link>
          <Link to="/browse?category=dining" className="space-card animate-fade-up delay-2" style={{ backgroundImage: "url('/assets/dining_scene.png')" }}>
            <div className="space-card-content">
              <h3>Dining</h3>
              <p>Gather and celebrate in style.</p>
            </div>
          </Link>
          <Link to="/browse?category=office" className="space-card animate-fade-up delay-3" style={{ backgroundImage: "url('/assets/office_scene.png')" }}>
            <div className="space-card-content">
              <h3>Office</h3>
              <p>Productivity meets elegance.</p>
            </div>
          </Link>
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
    </div>
  );
};

export default Home;