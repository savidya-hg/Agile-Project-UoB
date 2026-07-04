import React, { useState } from 'react';
import { getImageVector, cosineSimilarity } from '../utils/aiUtils';
import './AIUploader.css';

const AIUploader = ({ products, onSearchResults }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset states
    setError('');
    setUploading(true);
    setPreview(URL.createObjectURL(file));

    try {
      // 1. Load image into an HTML element
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((resolve) => { img.onload = resolve; });

      // 2. Get AI vector for the uploaded image
      const userVector = await getImageVector(img);

      // 3. Compare with all products
      const results = products.map(product => {
        if (!product.vector || product.vector.length === 0) {
          return { ...product, similarity: 0 };
        }
        const similarity = cosineSimilarity(userVector, product.vector);
        return { ...product, similarity };
      });

      // 4. Sort by similarity (highest first) and get top 3
      const topMatches = results
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3);

      // 5. Send results to parent component
      onSearchResults(topMatches);

    } catch (err) {
      console.error('AI Search Error:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setError('');
    onSearchResults(null); // Reset results
    // Clear file input
    const fileInput = document.getElementById('ai-upload-input');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="ai-uploader">
      <div className="upload-area">
        <label htmlFor="ai-upload-input" className="upload-label">
          <div className="upload-icon">📷</div>
          <span>Upload a photo of furniture</span>
          <span className="upload-hint">Find similar items in our collection</span>
        </label>
        <input
          id="ai-upload-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      {uploading && (
        <div className="ai-loading">
          <div className="spinner"></div>
          <p>Analyzing your image with AI...</p>
        </div>
      )}

      {preview && !uploading && (
        <div className="preview-container">
          <img src={preview} alt="Uploaded furniture" className="preview-image" />
          <button className="clear-btn" onClick={handleClear}>✕</button>
        </div>
      )}

      {error && <div className="ai-error">{error}</div>}
    </div>
  );
};

export default AIUploader;