import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';
import { getImageVector, cosineSimilarity } from '../utils/aiUtils';
import { useCart } from '../context/CartContext';
import './AISearchModal.css';

const AISearchModal = ({ onClose }) => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  // Fetch all products on mount to perform similarity search
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data || []);
      } catch (err) {
        console.error('Error fetching products for AI search:', err);
        setError('Failed to initialize AI search database.');
      }
    };
    fetchProducts();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setUploading(true);
    setPreview(URL.createObjectURL(file));
    setMatches([]);

    try {
      // 1. Load image into an HTML element
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((resolve) => { img.onload = resolve; });

      // 2. Get AI vector for the uploaded image
      const userVector = await getImageVector(img);

      // 3. Compare with all products in the database
      const results = products.map(product => {
        if (!product.vector || product.vector.length === 0) {
          return { ...product, similarity: 0 };
        }
        const similarity = cosineSimilarity(userVector, product.vector);
        return { ...product, similarity };
      });

      // 4. Sort by similarity (highest first) and get top 3
      const topMatches = results
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3);

      setMatches(topMatches);
    } catch (err) {
      console.error('AI Search Error:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const handleClear = () => {
    setPreview(null);
    setMatches([]);
    setError('');
  };

  return (
    <div className="ai-modal-backdrop" onClick={onClose}>
      <div className="ai-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="ai-modal-close" onClick={onClose}>✕</button>

        <div className="ai-modal-header">
          <h2>AI Visual Search</h2>
          <p>Find matches from our premium collections in seconds.</p>
        </div>

        {error && <div className="ai-modal-error">{error}</div>}

        <div className="ai-modal-body">
          {/* UPLOAD & PREVIEW AREA */}
          <div className="ai-modal-upload-section">
            {!preview ? (
              <div className="ai-modal-upload-box">
                <label htmlFor="ai-modal-upload-input" className="ai-modal-upload-label">
                  <div className="ai-modal-upload-icon"><ion-icon name="image-outline"></ion-icon></div>
                  <span>Drop or select a photo of furniture</span>
                  <span className="ai-modal-upload-hint">We will analyze visual textures and styles</span>
                </label>
                <input
                  id="ai-modal-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>
            ) : (
              <div className="ai-modal-preview-card">
                <img src={preview} alt="Uploaded preview" />
                {!uploading && (
                  <button className="ai-modal-reset-btn" onClick={handleClear}>
                    Upload Different Photo
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RESULTS AREA */}
          <div className="ai-modal-results-section">
            {uploading && (
              <div className="ai-modal-loading">
                <div className="ai-modal-spinner"></div>
                <p>Running Neural Feature Extraction...</p>
                <span>Scanning design archetypes & contours</span>
              </div>
            )}

            {!uploading && preview && matches.length === 0 && (
              <div className="ai-modal-empty">No similar products found.</div>
            )}

            {!uploading && matches.length > 0 && (
              <div className="ai-modal-matches-list">
                <h3>Top Matches Found</h3>
                <div className="matches-grid">
                  {matches.map((p, index) => (
                    <div key={p._id || p.id} className="match-item">
                      <div className="match-rank">#{index + 1}</div>
                      <img src={p.imageUrl} alt={p.name} className="match-item-img" />
                      <div className="match-item-details">
                        <h4>{p.name}</h4>
                        <p className="match-item-price">Rs. {p.price}</p>
                        <span className="match-item-similarity">
                          {Math.round(p.similarity * 100)}% visual match
                        </span>
                      </div>
                      <button
                        className="match-item-cart-btn"
                        onClick={() => handleAddToCart(p)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!uploading && !preview && (
              <div className="ai-modal-placeholder-info">
                <div className="placeholder-icon"><ion-icon name="barcode-outline"></ion-icon></div>
                <h4>Ready to Scan</h4>
                <p>Upload a product image to view similar items from Basnayaka collections.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISearchModal;
