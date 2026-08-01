import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductDetailsModal.css';

const ProductDetailsModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

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
    const clientPhone = '94773132443';
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
          {/* Left Column: Large Product Image */}
          <div className="product-modal-image-col">
            <div className="product-modal-img-wrapper">
              <img src={product.imageUrl} alt={product.name} />
              <span className="product-modal-badge">{product.category || 'Luxury Collection'}</span>
            </div>
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
