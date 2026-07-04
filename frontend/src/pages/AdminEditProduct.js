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
    category: '' 
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentImage, setCurrentImage] = useState('');

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        const product = res.data;
        setForm({
          name: product.name,
          price: product.price,
          description: product.description || '',
          category: product.category || ''
        });
        setCurrentImage(product.imageUrl);
        setImagePreview(product.imageUrl);
      } catch (err) {
        console.error('Error fetching product:', err);
        alert('Product not found');
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

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
    if (!form.name || !form.price) {
      return alert('Name and Price are required');
    }

    setSaving(true);

    try {
      let imageUrl = currentImage;

      // If a new image was uploaded, upload it
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadRes = await API.post('/products/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadRes.data.imageUrl;
      }

      // Compute new AI vector (even if image hasn't changed, we might need to recompute)
      let vector = [];
      if (imageFile) {
        // New image → compute new vector
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;
        await new Promise((resolve) => { img.onload = resolve; });
        vector = await getImageVector(img);
      } else {
        // Keep existing vector (or we could recompute from existing image)
        // For simplicity, we'll keep the existing vector
        const existingRes = await API.get(`/products/${id}`);
        vector = existingRes.data.vector || [];
      }

      // Update product
      const productData = {
        ...form,
        price: parseFloat(form.price),
        imageUrl,
        vector
      };
      await API.put(`/products/${id}`, productData);

      alert('✅ Product updated successfully!');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update product: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading product...</div>;

  return (
    <div className="add-product-container">
      <h1>✏️ Edit Product</h1>
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
          <label>Category</label>
          <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Living Room" />
        </div>
        <div className="form-group">
          <label>Product Image</label>
          {imagePreview && (
            <div>
              <img src={imagePreview} alt="Preview" className="preview-img" />
              <button 
                type="button" 
                onClick={() => {
                  setImagePreview(currentImage);
                  setImageFile(null);
                }}
                className="btn-secondary" 
                style={{ marginTop: '0.5rem' }}
              >
                Revert to original
              </button>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            style={{ marginTop: '0.5rem' }}
          />
          <p className="hint">Upload a new image to replace the current one (optional)</p>
        </div>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Updating...' : 'Update Product'}
        </button>
        <button 
          type="button" 
          onClick={() => navigate('/admin')} 
          className="btn-secondary"
          style={{ marginLeft: '1rem' }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;