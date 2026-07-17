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
  const totalItems = getTotalItems();

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
      <div className="cart-empty">
        <div className="empty-cart-icon">🛒</div>
        <h1>Your cart is empty</h1>
        <p>Browse our premium collection and add the pieces you love.</p>
        <Link to="/browse" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Page header — mirrors the Home hero styling */}
      <header className="cart-header">
        <div className="cart-header-text">
          <h1>Your Shopping Cart</h1>
          <p>Review your selected pieces and send your order in seconds.</p>
        </div>
        <span className="cart-count-pill">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </header>

      <div className="cart-grid">
        {/* Cart Items */}
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <span className="cart-item-category">{item.category}</span>
                <p className="cart-item-price">{formatPrice(item.price)}</p>
              </div>
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
                <p>{formatPrice(item.price * item.quantity)}</p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="remove-btn"
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <div className="cart-actions">
            <Link to="/browse" className="continue-shopping-btn">
              ← Continue Shopping
            </Link>
            <button onClick={() => clearCart()} className="clear-cart-btn">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span className="free-tag">Free</span>
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
            {isSending ? 'Sending...' : '📱 Send Order via WhatsApp'}
          </button>
          <p className="whatsapp-info">
            🔒 Your order is sent directly to the shop via WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
