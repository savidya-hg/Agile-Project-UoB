import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  // WhatsApp number (remove the + for the URL)
  const whatsappNumber = '94773132443';

  return (
    <div className="contact-page">
      {/* ===== HERO SECTION – with background image ===== */}
      <section 
        className="contact-hero" 
        style={{ backgroundImage: "url('/assets/get-in-touch.png')" }}
      >
        <div className="contact-hero-overlay">
          <div className="contact-hero-content">
            <h1 className="contact-title animate-fade-up">Get In Touch</h1>
            <p className="contact-subtitle animate-fade-up delay-1">
              We'd love to hear from you. Reach out for inquiries, custom orders, or to schedule a consultation.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT INFO GRID ===== */}
      <section className="contact-info-section">
        <div className="contact-grid">
          {/* ===== Address Card ===== */}
          <div className="contact-card animate-fade-up">
            <div className="contact-card-icon">
              <i className="fas fa-location-dot"></i>
            </div>
            <h3>Visit Our Showroom</h3>
            <p className="contact-address">
              No 211/1, Illukwatta,<br />
              Kadugannawa, Sri Lanka
            </p>
            <Link 
              to="https://maps.google.com/?q=Basnayaka+Furniture+Illukwatte"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <i className="fas fa-map-pin"></i> Open in Google Maps
            </Link>
          </div>

          {/* ===== WhatsApp Card ===== */}
          <div className="contact-card animate-fade-up delay-1">
            <div className="contact-card-icon">
              <i className="fab fa-whatsapp"></i>
            </div>
            <h3>WhatsApp Us</h3>
            <p className="contact-phone">+94 77 313 2443</p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-whatsapp-btn"
            >
              <i className="fab fa-whatsapp"></i> Chat Now
            </a>
          </div>

          {/* ===== Email Card ===== */}
          <div className="contact-card animate-fade-up delay-2">
            <div className="contact-card-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email Us</h3>
            <p className="contact-email">info@basnayakafurniture.com</p>
            <a
              href="mailto:info@basnayakafurniture.com"
              className="contact-link"
            >
              <i className="fas fa-paper-plane"></i> Send Email
            </a>
          </div>
        </div>
      </section>

      {/* ===== GOOGLE MAPS EMBED ===== */}
      <section className="map-section">
        <div className="map-container">
          <h2>Find Us on the Map</h2>
          <p>We're located in Illukwatta, Kadugannawa – just a short drive from Kandy.</p>
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Basnayaka+Furniture+Illukwatte+Kadugannawa"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Basnayaka Furniture Location"
            ></iframe>
          </div>
          <div className="map-actions">
            <a
              href="https://www.google.com/maps/dir//Basnayaka+Furniture+Illukwatte+Kadugannawa"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <i className="fas fa-directions"></i> Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* ===== CONSULTATION CTA ===== */}
      <section className="consultation-section">
        <div className="consultation-content">
          <h2>Book a Design Consultation</h2>
          <p>Let our experts help you create the perfect space. Free 30-minute session.</p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello%20Basnayaka%20Furniture%2C%20I%20would%20like%20to%20book%20a%20design%20consultation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <i className="fas fa-calendar-alt"></i> Schedule Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;