import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const correctPassword = process.env.REACT_APP_ADMIN_PASS || 'admin123';

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsLoggedIn(true);
      localStorage.setItem('adminAuth', 'true');
      fetchProducts();
    } else {
      alert('Wrong password!');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsLoggedIn(false);
    setProducts([]);
  };

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsLoggedIn(true);
      fetchProducts();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  // --- Login Screen ---
  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <button type="submit" className="btn-primary">Login</button>
          </form>
          <p className="hint">Default: admin123</p>
        </div>
      </div>
    );
  }

  // --- Dashboard ---
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>📦 Manage Inventory</h1>
        <div>
          <button className="btn-primary" onClick={() => window.location.href='/admin/add'}>+ Add New</button>
          <button className="btn-secondary" onClick={handleLogout} style={{marginLeft:'1rem'}}>Logout</button>
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="admin-product-grid">
          {products.length === 0 && <p>No products yet. Add one!</p>}
          {products.map(p => (
            <div key={p._id} className="admin-product-card">
              <img src={p.imageUrl} alt={p.name} />
              <div className="info">
                <h3>{p.name}</h3>
                <p className="price">Rs. {p.price}</p>
                <p className="category">{p.category}</p>
                <div className="actions">
                  <button className="btn-edit" onClick={() => window.location.href=`/admin/edit/${p._id}`}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(p._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;