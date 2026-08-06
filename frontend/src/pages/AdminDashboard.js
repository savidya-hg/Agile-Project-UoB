import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';
import DashboardOverview from '../components/admin/DashboardOverview';
import InventoryManager from '../components/admin/InventoryManager';
import StoreSettings from '../components/admin/StoreSettings';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'inventory', 'settings'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // --- Views ---
  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview products={products} />;
      case 'inventory':
        return <InventoryManager products={products} loading={loading} navigate={navigate} handleDelete={handleDelete} />;
      case 'settings':
        return <StoreSettings />;
      default:
        return <DashboardOverview products={products} />;
    }
  };

  // --- Main Layout ---
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>BFH Admin</h2>
        </div>
        <nav className="admin-nav">
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <i className="fas fa-chart-line"></i> Dashboard
          </button>
          <button 
            className={`nav-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <i className="fas fa-boxes-stacked"></i> Manage Inventory
          </button>
          <button 
            className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-cog"></i> Settings
          </button>
        </nav>
        <div className="admin-sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content">
        {renderView()}
      </main>
    </div>
  );
};

export default AdminDashboard;