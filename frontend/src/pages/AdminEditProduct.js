import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';
import { getImageVector } from '../utils/aiUtils';
import './AdminAddProduct.css';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    category: '',
    material: ''
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [settings, setSettings] = useState({ categories: [], materials: [] });

  // Fetch product data and settings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, settingsRes] = await Promise.all([
          API.get(`/products/${id}`),
          API.get('/settings').catch(() => ({ data: { categories: [], materials: [] } }))
        ]);
        
        const product = productRes.data;
        if (settingsRes.data && settingsRes.data.categories) {
          setSettings(settingsRes.data);
        }

        setForm({
          name: product.name,
          price: product.price,
          description: product.description || '',
          category: product.category || '',
          material: product.material || ''
        });
        const imagesArray = product.images && product.images.length > 0 ? product.images : [product.imageUrl];
        setCurrentImages(imagesArray);
        setImagePreviews(imagesArray);
      } catch (err) {
        console.error('Error fetching product:', err);
        alert('Product not found');
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

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
    if (!form.name || !form.price) {
      return alert('Name and Price are required');
    }

    setSaving(true);

    try {
      let imageUrl = currentImages[0];
      let images = currentImages;

      // If a new image was uploaded, upload it
      if (imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach(file => {
          formData.append('images', file);
        });
        const uploadRes = await API.post('/products/upload-multiple', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        images = uploadRes.data.imageUrls;
        imageUrl = images[0];
      }

      // Compute new AI vector (even if image hasn't changed, we might need to recompute)
      let vector = [];
      if (imageFiles.length > 0) {
        // New image → compute new vector on primary image
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;
        await new Promise((resolve) => { img.onload = resolve; });
        vector = await getImageVector(img);
      } else {
        // Keep existing vector
        const existingRes = await API.get(`/products/${id}`);
        vector = existingRes.data.vector || [];
      }

      // Update product
      const productData = {
        ...form,
        price: parseFloat(form.price),
        imageUrl,
        images,
        vector
      };
      await API.put(`/products/${id}`, productData);

      alert('Product updated successfully!');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('Failed to update product: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading product...</div>;

  return (
    <div className="add-product-wrapper">
      <div className="add-product-container">
        <h1><i className="fas fa-pen-to-square" style={{ color: '#c49a6c' }}></i> Edit Product</h1>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group">
            <label>Product Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Price (LKR) *</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} required />
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
            <label>Product Images (Up to 5)</label>
            {imagePreviews.length > 0 && (
              <div>
                <div className="previews-container">
                  {imagePreviews.map((src, index) => (
                    <img key={index} src={src} alt={`Preview ${index}`} className="preview-img" style={{ marginRight: '10px', width: '80px', height: '80px', objectFit: 'cover' }} />
                  ))}
                </div>
                <button 
                  type="button" 
                  onClick={() => {
                    setImagePreviews(currentImages);
                    setImageFiles([]);
                  }}
                  className="btn-secondary" 
                  style={{ marginTop: '0.5rem', display: 'block' }}
                >
                  Revert to original
                </button>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*"
              multiple 
              onChange={handleImageChange} 
              style={{ marginTop: '0.5rem' }}
            />
            <p className="hint">Upload new images to completely replace the current ones (optional)</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Updating...' : 'Update Product'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/admin')} 
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProduct;