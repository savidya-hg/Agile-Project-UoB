import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isSending, setIsSending] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Format currency
  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    let message = '🪑 *NEW ORDER FROM BFH*\n\n';
    message += `👤 *Customer:* ${customerName}\n`;
    message += `📱 *Phone:* ${phoneNumber}\n`;
    message += `📅 *Delivery Date:* ${deliveryDate}\n\n`;
    message += `*ITEMS ORDERED:*\n`;
    message += `─────────────────\n\n`;

    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      message += `${index + 1}. ${item.quantity}x *${item.name}*\n`;
      message += `   ${formatPrice(item.price)} × ${item.quantity} = ${formatPrice(itemTotal)}\n\n`;
    });

    message += `─────────────────\n`;
    message += `*TOTAL: ${formatPrice(totalPrice)}*\n\n`;
    message += `Thank you for your order! 🙏`;

    return message;
  };

  // Handle WhatsApp order
  const handleSendOrder = () => {
    // Validation
    if (!customerName.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!phoneNumber.trim()) {
      alert('Please enter your phone number');
      return;
    }
    if (!deliveryDate) {
      alert('Please select a delivery date');
      return;
    }
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsSending(true);

    // Client's WhatsApp number (replace with actual number)
    const clientPhone = '947XXXXXXXXX'; // Replace with client's number
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp
    window.open(`https://wa.me/${clientPhone}?text=${encodedMessage}`, '_blank');

    // Clear cart after sending
    clearCart();
    setIsSending(false);

    // Show success message
    alert('✅ Order sent via WhatsApp! The shop will contact you shortly.');
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-empty">
            <div className="empty-cart-icon"><i className="fas fa-shopping-cart"></i></div>
            <h1>Your cart is empty</h1>
            <p>Browse our premium collection and add the pieces you love.</p>
            <Link to="/browse" className="cart-btn-primary">
              <i className="fas fa-store"></i> Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* ===== HEADER ===== */}
        <div className="cart-header">
          <div>
            <h1>Your Shopping Cart</h1>
            <p>{totalItems} {totalItems === 1 ? 'item' : 'items'} ready for your dream space.</p>
          </div>
          <div className="cart-header-line"></div>
        </div>

        <div className="cart-grid">
          {/* ===== CART ITEMS ===== */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image-wrap">
                  <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                </div>

                <div className="cart-item-info">
                  {item.category && (
                    <span className="cart-item-category">{item.category}</span>
                  )}
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                </div>

                <div className="cart-item-controls">
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="qty-btn"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="qty-btn"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-total">
                    <span className="cart-item-total-label">Subtotal</span>
                    <span className="cart-item-total-value">{formatPrice(item.price * item.quantity)}</span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="remove-btn"
                    aria-label="Remove item"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-actions">
              <Link to="/browse" className="continue-shopping">
                <i className="fas fa-arrow-left"></i> Continue Shopping
              </Link>
              <button onClick={() => clearCart()} className="clear-cart-btn">
                <i className="fas fa-trash-alt"></i> Clear Cart
              </button>
            </div>
          </div>

          {/* ===== ORDER SUMMARY ===== */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="summary-free">Free</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total</span>
              <span className="total-price">{formatPrice(totalPrice)}</span>
            </div>

            <div className="customer-form">
              <h3>Customer Details</h3>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Amila Perera"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 0712345678"
                  required
                />
              </div>
              <div className="form-group">
                <label>Delivery Date *</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              className="whatsapp-btn"
              onClick={handleSendOrder}
              disabled={isSending}
            >
              <i className="fab fa-whatsapp"></i>
              {isSending ? ' Sending...' : ' Send Order via WhatsApp'}
            </button>
            <p className="whatsapp-info">
              Your order will be sent directly to the shop via WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
