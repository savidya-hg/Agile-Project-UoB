import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';
import './Browse.css';

const Browse = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading furniture...</div>;

  return (
    <div className="browse-page">
      <h1>🪑 Our Collection</h1>
      <div className="product-grid">
        {products.map(p => (
          <div key={p._id} className="product-card">
            <img src={p.imageUrl} alt={p.name} />
            <div className="info">
              <h3>{p.name}</h3>
              <p className="price">Rs. {p.price.toLocaleString()}</p>
              <p className="category">{p.category}</p>
              <button className="btn-add-cart">Add to Cart</button> {/* We'll implement this in Sprint 3 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;