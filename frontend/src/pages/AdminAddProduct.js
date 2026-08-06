import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';
import { getImageVector } from '../utils/aiUtils';
import './AdminAddProduct.css';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '', material: '' });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({ categories: [], materials: [] });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get('/settings');
        setSettings(res.data);
      } catch (err) {
        console.error('Failed to fetch settings', err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('You can only upload up to 5 images.');
      return;
    }
    setImageFiles(files);
    
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) return alert('Please select at least one image');
    if (!form.name || !form.price) return alert('Name and Price are required');

    setLoading(true);

    try {
      // 1. Upload images to Cloudinary via backend
      const formData = new FormData();
      imageFiles.forEach(file => {
        formData.append('images', file);
      });
      const uploadRes = await API.post('/products/upload-multiple', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const imageUrls = uploadRes.data.imageUrls;

      // 2. Load the FIRST image into an HTML element and compute AI vector
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageUrls[0];
      await new Promise((resolve) => { img.onload = resolve; });
      
      const vector = await getImageVector(img);

      // 3. Send product data + vector to backend
      const productData = {
        ...form,
        price: parseFloat(form.price),
        imageUrl: imageUrls[0], // primary fallback
        images: imageUrls,
        vector
      };
      await API.post('/products', productData);

      alert('Product added successfully!');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('Failed to add product: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-wrapper">
      <div className="add-product-container">
        <h1><i className="fas fa-plus-circle" style={{ color: '#c49a6c' }}></i> Add New Product</h1>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group">
            <label>Product Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Sorensen Velvet Sectional Sofa" required />
          </div>
          <div className="form-group">
            <label>Price (LKR) *</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 250000" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Enter product description..." />
          </div>
          <div className="form-group">
            <label>Category *</label>
            <select 
              name="category" 
              value={form.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Select a Category</option>
              {settings.categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Material / Fabric *</label>
            <select 
              name="material" 
              value={form.material} 
              onChange={handleChange} 
              required
            >
              <option value="">Select a Material</option>
              {settings.materials.map((mat, index) => (
                <option key={index} value={mat}>{mat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Product Images (Up to 5) *</label>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} required />
            <div className="previews-container">
              {imagePreviews.map((src, index) => (
                <img key={index} src={src} alt={`Preview ${index}`} className="preview-img" style={{ marginRight: '10px', width: '80px', height: '80px', objectFit: 'cover' }} />
              ))}
            </div>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Processing AI Vector...' : 'Save Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;