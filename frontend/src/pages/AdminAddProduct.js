import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';
import { getImageVector } from '../utils/aiUtils';
import './AdminAddProduct.css';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert('Please select an image');
    if (!form.name || !form.price) return alert('Name and Price are required');

    setLoading(true);

    try {
      // 1. Upload image to Cloudinary via backend
      const formData = new FormData();
      formData.append('image', imageFile);
      const uploadRes = await API.post('/products/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const imageUrl = uploadRes.data.imageUrl;

      // 2. Load image into an HTML element and compute AI vector
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
      await new Promise((resolve) => { img.onload = resolve; });
      
      const vector = await getImageVector(img);

      // 3. Send product data + vector to backend
      const productData = {
        ...form,
        price: parseFloat(form.price),
        imageUrl,
        vector
      };
      await API.post('/products', productData);

      alert('✅ Product added successfully!');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add product: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h1>➕ Add New Product</h1>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label>Product Name *</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price (LKR) *</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="3" />
        </div>
        <div className="form-group">
          <label>Category *</label>
          <select 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            required
            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#111', color: 'white' }}
          >
            <option value="">Select a Category</option>
            <option value="Living Room">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Dining">Dining</option>
            <option value="Office">Office</option>
            <option value="Outdoor">Outdoor</option>
          </select>
        </div>
        <div className="form-group">
          <label>Product Image *</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
          {imagePreview && <img src={imagePreview} alt="Preview" className="preview-img" />}
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Processing AI Vector...' : 'Save Product'}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;