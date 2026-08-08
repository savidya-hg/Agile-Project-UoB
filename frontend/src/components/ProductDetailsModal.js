import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import './ProductDetailsModal.css';

const ProductDetailsModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { settings } = useSettings();
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const images = product.images && product.images.length > 0 ? product.images : [product.imageUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-slide logic
  useEffect(() => {
    if (images.length <= 1 || isHovering) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length, isHovering]);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    e.target.style.transformOrigin = `${x}% ${y}%`;
  };

  if (!product) return null;

  const formattedPrice = Number(product.price || 0).toLocaleString();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleWhatsAppOrder = () => {
    const clientPhone = settings?.whatsappNumber || '94773132443';
    let message = `*BFH PRODUCT INQUIRY / ORDER*\n\n`;
    message += `*Item:* ${product.name}\n`;
    message += `*Price:* Rs. ${formattedPrice}\n`;
    message += `*Category:* ${product.category || 'Furniture'}\n`;
    message += `*Material:* ${product.material || 'N/A'}\n`;
    message += `*Quantity:* ${quantity}\n\n`;
    message += `Hello BFH, I am interested in purchasing this product. Please share availability details!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${clientPhone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="product-modal-close" onClick={onClose} aria-label="Close modal">
          <i className="fas fa-times"></i>
        </button>

        <div className="product-modal-body">
          {/* Left Column: Interactive Image Gallery */}
          <div className="product-modal-image-col">
            <div 
              className="product-modal-img-wrapper" 
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={(e) => {
                setIsHovering(false);
                e.target.style.transformOrigin = 'center center';
              }}
            >
              <img src={images[currentImageIndex]} alt={product.name} className="zoomable-image" />
              <span className="product-modal-badge">{product.category || 'Luxury Collection'}</span>
              
              {/* Arrows for sliding */}
              {images.length > 1 && (
                <>
                  <button className="slider-arrow prev" onClick={prevImage}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="slider-arrow next" onClick={nextImage}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </>
              )}
            </div>
            
            {/* Dots Indicator */}
            {images.length > 1 && (
              <div className="slider-dots">
                {images.map((_, idx) => (
                  <button 
                    key={idx}
                    className={`slider-dot ${idx === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="product-modal-thumbnails">
                {images.map((imgSrc, idx) => (
                  <div 
                    key={idx} 
                    className={`thumbnail-wrapper ${idx === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img src={imgSrc} alt={`Thumbnail ${idx}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="product-modal-info-col">
            <div className="product-modal-tags">
              <span className="tag-category">{product.category}</span>
              {product.material && <span className="tag-material"><i className="fas fa-couch"></i> {product.material}</span>}
            </div>

            <h2 className="product-modal-title">{product.name}</h2>
            <div className="product-modal-price">Rs. {formattedPrice}</div>

            <div className="product-modal-divider"></div>

            <div className="product-modal-description-section">
              <h3>Description</h3>
              <p>
                {product.description || "Crafted with precision and exquisite craftsmanship, this luxury furniture piece blends contemporary aesthetics with timeless durability for elevated interior spaces."}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="product-modal-quantity-row">
              <span className="quantity-label">Quantity:</span>
              <div className="quantity-controls">
                <button 
                  type="button" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="quantity-number">{quantity}</span>
                <button 
                  type="button" 
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>

            {/* Added Toast Alert */}
            {addedNotice && (
              <div className="added-toast">
                <i className="fas fa-check-circle"></i> Added {quantity} item(s) to your cart!
              </div>
            )}

            {/* Action Buttons */}
            <div className="product-modal-actions">
              <button className="btn-add-cart" onClick={handleAddToCart}>
                <i className="fas fa-shopping-cart"></i>
                Add to Cart ({quantity})
              </button>

              <button className="btn-whatsapp-order" onClick={handleWhatsAppOrder}>
                <i className="fab fa-whatsapp"></i>
                Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
