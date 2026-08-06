import React from 'react';

const InventoryManager = ({ products, loading, navigate, handleDelete }) => {
  return (
    <div className="admin-view inventory-view animate-fade-up">
      <div className="admin-header">
        <h2><i className="fas fa-boxes-stacked"></i> Manage Inventory</h2>
        <button className="btn-primary" onClick={() => navigate('/admin/add')}>+ Add New Product</button>
      </div>

      {loading ? (
        <p className="loading-text">Loading products...</p>
      ) : (
        <div className="admin-product-grid">
          {products.length === 0 && <div className="empty-state">No products found. Add your first item!</div>}
          {products.map(p => (
            <div key={p._id} className="admin-product-card">
              <div className="img-wrapper">
                <img src={p.imageUrl} alt={p.name} />
              </div>
              <div className="info">
                <h3>{p.name}</h3>
                <p className="price">Rs. {Number(p.price).toLocaleString()}</p>
                <p className="category">{p.category || 'Uncategorized'} {p.material ? `• ${p.material}` : ''}</p>
                <div className="actions">
                  <button className="btn-edit" onClick={() => navigate(`/admin/edit/${p._id}`)}>Edit</button>
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

export default InventoryManager;
