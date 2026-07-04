import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Find Furniture Smarter</h1>
        <p>Upload a furniture photo and discover matching products instantly within our premium collections.</p>
        <div className="hero-buttons">
          <Link to="/browse" className="btn-primary">Explore Collection</Link>
          <Link to="/browse" className="btn-secondary">Upload Photo</Link>
        </div>
      </div>
      <div className="stats">
        <div><span>1000+</span> Premium Products</div>
        <div><span>95%</span> Satisfaction Rate</div>
        <div><span>24/7</span> Support</div>
      </div>
      <div className="curated-spaces">
        <h2>Curated Spaces</h2>
        <div className="room-grid">
          <div className="room-card">Living Room</div>
          <div className="room-card">Bedroom</div>
          <div className="room-card">Dining</div>
          <div className="room-card">Office</div>
        </div>
      </div>
    </div>
  );
};

export default Home;