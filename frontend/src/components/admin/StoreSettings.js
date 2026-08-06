import React, { useState, useEffect } from 'react';
import API from '../../api/axiosConfig';

const StoreSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newCat, setNewCat] = useState('');
  const [newMat, setNewMat] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await API.get('/settings');
      setSettings(res.data);
      setDeliveryPrice(res.data.deliveryPrice !== undefined ? res.data.deliveryPrice : 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (updatedFields) => {
    try {
      const res = await API.put('/settings', updatedFields);
      setSettings(res.data);
      alert('Settings saved!');
    } catch (err) {
      alert('Failed to save settings: ' + err.message);
    }
  };

  const handleSaveDelivery = () => {
    saveSettings({ deliveryPrice: Number(deliveryPrice) });
  };

  const handleAddCategory = () => {
    if (!newCat.trim()) return;
    const updatedCategories = [...settings.categories, newCat.trim()];
    saveSettings({ categories: updatedCategories });
    setNewCat('');
  };

  const handleDeleteCategory = (catToDelete) => {
    const updatedCategories = settings.categories.filter(c => c !== catToDelete);
    saveSettings({ categories: updatedCategories });
  };

  const handleAddMaterial = () => {
    if (!newMat.trim()) return;
    const updatedMaterials = [...settings.materials, newMat.trim()];
    saveSettings({ materials: updatedMaterials });
    setNewMat('');
  };

  const handleDeleteMaterial = (matToDelete) => {
    const updatedMaterials = settings.materials.filter(m => m !== matToDelete);
    saveSettings({ materials: updatedMaterials });
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="admin-view settings-view animate-fade-up">
      <h2><i className="fas fa-cog"></i> Store Settings</h2>
      <p className="settings-desc">Manage store configurations dynamically.</p>
      
      <div className="settings-grid">
        <div className="settings-section">
          <h3>Delivery Configuration</h3>
          <div className="form-group">
            <label>Base Delivery Price (Rs.)</label>
            <input 
              type="number" 
              value={deliveryPrice} 
              onChange={(e) => setDeliveryPrice(e.target.value)} 
            />
          </div>
          <button className="btn-secondary" onClick={handleSaveDelivery}>Save Delivery Settings</button>
        </div>

        <div className="settings-section">
          <h3>Manage Categories</h3>
          <ul className="settings-list">
            {settings.categories.map((cat, index) => (
              <li key={index}>
                {cat} 
                <button className="delete-icon" onClick={() => handleDeleteCategory(cat)}>
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
          <div className="add-setting">
            <input 
              type="text" 
              placeholder="New Category Name" 
              value={newCat} 
              onChange={(e) => setNewCat(e.target.value)} 
            />
            <button className="btn-primary" onClick={handleAddCategory}>Add Category</button>
          </div>
        </div>

        <div className="settings-section">
          <h3>Manage Materials</h3>
          <ul className="settings-list">
            {settings.materials.map((mat, index) => (
              <li key={index}>
                {mat} 
                <button className="delete-icon" onClick={() => handleDeleteMaterial(mat)}>
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
          <div className="add-setting">
            <input 
              type="text" 
              placeholder="New Material Name" 
              value={newMat} 
              onChange={(e) => setNewMat(e.target.value)} 
            />
            <button className="btn-primary" onClick={handleAddMaterial}>Add Material</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSettings;
