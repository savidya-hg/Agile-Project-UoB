import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../api/axiosConfig';
import AIUploader from '../components/AIUploader';
import './Browse.css';
import { useCart } from '../context/CartContext';

const Browse = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null); // null = show all products
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();
  const location = useLocation();

  // Scroll to AI section if URL has ?ai=true
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('ai') === 'true') {
      const aiSection = document.querySelector('.ai-section');
      if (aiSection) {
        setTimeout(() => {
          aiSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // Fetch all products on load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setAllProducts(res.data);
        
        // Extract unique categories
        const cats = ['All', ...new Set(res.data.map(p => p.category).filter(c => c))];
        setCategories(cats);

        // Check if category is specified in query parameters on mount
        const params = new URLSearchParams(location.search);
        const queryCat = params.get('category');
        if (queryCat) {
          // Find matching category case-insensitively
          const matchingCat = cats.find(c => c.toLowerCase() === queryCat.toLowerCase());
          if (matchingCat) {
            setSelectedCategory(matchingCat);
            const filtered = res.data.filter(p => p.category === matchingCat);
            setDisplayedProducts(filtered);
          } else {
            setDisplayedProducts(res.data);
          }
        } else {
          setDisplayedProducts(res.data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location.search]);

  // Handle AI search results
  const handleAISearch = (results) => {
    if (results && results.length > 0) {
      setSearchResults(results);
      setDisplayedProducts(results);
      // Clear text search when AI results appear
      setSearchTerm('');
    } else if (results === null) {
      // Reset to show all products
      setSearchResults(null);
      applyFiltersAndSearch(allProducts, searchTerm, selectedCategory);
    }
  };

  // Filter products by text search and category
  const applyFiltersAndSearch = (products, term, category) => {
    let filtered = [...products];
    
    // Text search
    if (term.trim()) {
      const lowerTerm = term.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(lowerTerm) ||
        p.description.toLowerCase().includes(lowerTerm) ||
        p.category.toLowerCase().includes(lowerTerm)
      );
    }
    
    // Category filter
    if (category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }
    
    setDisplayedProducts(filtered);
  };

  // Handle text search input
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // If AI results are showing, clear them when user types
    if (searchResults !== null) {
      setSearchResults(null);
    }
    applyFiltersAndSearch(allProducts, term, selectedCategory);
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (searchResults !== null) {
      setSearchResults(null);
    }
    applyFiltersAndSearch(allProducts, searchTerm, category);
  };

  // Add to cart function (will be implemented in Sprint 3)
  const handleAddToCart = (product) => {
  addToCart(product);
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item._id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart! 🛒');
  };

  if (loading) return <div className="loading">Loading furniture...</div>;

  return (
    <div className="browse-page">
      <h1>🪑 Our Collection</h1>
      
      {/* AI Upload Section */}
      <div className="ai-section">
        <h2>🔍 Find Furniture Smarter</h2>
        <p>Upload a photo and let AI find similar items in our collection</p>
        <AIUploader products={allProducts} onSearchResults={handleAISearch} />
        
        {searchResults && (
          <div className="ai-results-banner">
            <strong>AI found {searchResults.length} matches!</strong>
            <button onClick={() => handleAISearch(null)} className="clear-results-btn">
              Show all products
            </button>
          </div>
        )}
      </div>

      {/* Search & Filter */}
      <div className="search-filters">
        <input 
          type="text" 
          placeholder="Search furniture..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {displayedProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="product-grid">
          {displayedProducts.map(p => (
            <div key={p._id} className="product-card">
              <img src={p.imageUrl} alt={p.name} />
              <div className="info">
                <h3>{p.name}</h3>
                <p className="price">Rs. {p.price.toLocaleString()}</p>
                <p className="category">{p.category}</p>
                {searchResults && (
                  <p className="similarity">
                    Match: {(p.similarity * 100).toFixed(1)}%
                  </p>
                )}
                <button 
                  className="btn-add-cart"
                  onClick={() => handleAddToCart(p)}
                  >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;