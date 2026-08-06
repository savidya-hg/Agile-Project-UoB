import React from 'react';

const StoreSettings = () => {
  return (
    <div className="admin-view settings-view animate-fade-up">
      <h2><i className="fas fa-cog"></i> Store Settings</h2>
      <p className="settings-desc">Manage store configurations. (Note: These are placeholders as no backend model exists yet).</p>
      
      <div className="settings-grid">
        <div className="settings-section">
          <h3>Delivery Configuration</h3>
          <div className="form-group">
            <label>Base Delivery Price (Rs.)</label>
            <input type="number" defaultValue={2500} />
          </div>
          <button className="btn-secondary" onClick={() => alert('Settings saved (placeholder)')}>Save Delivery Settings</button>
        </div>

        <div className="settings-section">
          <h3>Manage Categories</h3>
          <ul className="settings-list">
            <li>Living Room <button className="delete-icon"><i className="fas fa-trash"></i></button></li>
            <li>Bedroom <button className="delete-icon"><i className="fas fa-trash"></i></button></li>
            <li>Dining <button className="delete-icon"><i className="fas fa-trash"></i></button></li>
          </ul>
          <div className="add-setting">
            <input type="text" placeholder="New Category Name" />
            <button className="btn-primary">Add Category</button>
          </div>
        </div>

        <div className="settings-section">
          <h3>Manage Materials</h3>
          <ul className="settings-list">
            <li>Teak Wood <button className="delete-icon"><i className="fas fa-trash"></i></button></li>
            <li>Mahogany <button className="delete-icon"><i className="fas fa-trash"></i></button></li>
            <li>Leather <button className="delete-icon"><i className="fas fa-trash"></i></button></li>
          </ul>
          <div className="add-setting">
            <input type="text" placeholder="New Material Name" />
            <button className="btn-primary">Add Material</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSettings;
