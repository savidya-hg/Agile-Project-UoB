import React, { useEffect, useMemo, useState } from "react";
import API from "../api/axiosConfig";
import AIUploader from "../components/AIUploader";
import { useCart } from "../context/CartContext";
import "./Browse.css";

const Browse = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const { addToCart } = useCart();

  const categories = useMemo(() => {
    const list = allProducts.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set(list)];
  }, [allProducts]);

  const materials = ["All", "Oak", "Velvet", "Leather", "Marble", "Wood"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setAllProducts(res.data || []);
        setDisplayedProducts(res.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const applyFilters = (products, term, category, material, sort) => {
    let filtered = [...products];

    if (term.trim()) {
      const lower = term.toLowerCase();
      filtered = filtered.filter((p) =>
        `${p.name || ""} ${p.description || ""} ${p.category || ""}`
          .toLowerCase()
          .includes(lower)
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (material !== "All") {
      filtered = filtered.filter((p) =>
        `${p.material || ""} ${p.description || ""} ${p.category || ""}`
          .toLowerCase()
          .includes(material.toLowerCase())
      );
    }

    if (sort === "price-low") {
      filtered.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sort === "price-high") {
      filtered.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else {
      filtered.reverse();
    }

    setDisplayedProducts(filtered);
  };

  const handleAISearch = (results) => {
    if (results && results.length > 0) {
      setSearchResults(results);
      setDisplayedProducts(results);
      setSearchTerm("");
      setSelectedCategory("All");
      setSelectedMaterial("All");
      return;
    }

    setSearchResults(null);
    applyFilters(allProducts, searchTerm, selectedCategory, selectedMaterial, sortBy);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchResults(null);
    applyFilters(allProducts, value, selectedCategory, selectedMaterial, sortBy);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchResults(null);
    applyFilters(allProducts, searchTerm, category, selectedMaterial, sortBy);
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    setSearchResults(null);
    applyFilters(allProducts, searchTerm, selectedCategory, material, sortBy);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    applyFilters(
      searchResults || allProducts,
      searchTerm,
      selectedCategory,
      selectedMaterial,
      value
    );
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart`);
  };

  if (loading) {
    return <div className="bfh-loading">Loading luxury furniture...</div>;
  }

  return (
    <div className="bfh-shop-page">
      <aside className="bfh-filter-panel">
        <h2>Filters</h2>

        <div className="bfh-ai-mini">
          <span>AI Recommendations</span>
          <span className={searchResults ? "toggle active" : "toggle"}></span>
        </div>

        <div className="filter-block">
          <h4>Category</h4>
          {categories.map((cat) => (
            <label key={cat} className="check-row">
              <input
                type="radio"
                checked={selectedCategory === cat}
                onChange={() => handleCategoryChange(cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>

        <div className="filter-block">
          <h4>Price Range</h4>
          <div className="price-line"></div>
          <div className="price-range-text">
            <span>Rs. 0</span>
            <span>Rs. 1,000,000+</span>
          </div>
        </div>

        <div className="filter-block">
          <h4>Material</h4>
          <div className="material-tags">
            {materials.map((mat) => (
              <button
                key={mat}
                className={selectedMaterial === mat ? "material active" : "material"}
                onClick={() => handleMaterialChange(mat)}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="bfh-shop-content">
        <div className="breadcrumb">Home › Shop</div>

        <div className="shop-header">
          <div>
            <h1>Home Shop</h1>
            <p>
              Showing {displayedProducts.length} of {allProducts.length} luxury items
            </p>
          </div>

          <select className="sort-select" value={sortBy} onChange={handleSortChange}>
            <option value="newest">Newest Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="bfh-ai-box">
          <h3>AI Visual Search</h3>
          <p>Upload a furniture photo and find the 3 most similar products.</p>
          <AIUploader products={allProducts} onSearchResults={handleAISearch} />

          {searchResults && (
            <div className="ai-result-bar">
              AI found {searchResults.length} similar products.
              <button onClick={() => handleAISearch(null)}>Show All</button>
            </div>
          )}
        </div>

        <input
          className="bfh-search-input"
          type="text"
          placeholder="Search furniture by name, category or description..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {displayedProducts.length === 0 ? (
          <div className="no-products">No products found.</div>
        ) : (
          <div className="bfh-product-grid">
            {displayedProducts.map((product) => (
              <div className="bfh-product-card" key={product._id}>
                <button className="wishlist-btn">♡</button>

                <img src={product.imageUrl} alt={product.name} />

                <div className="product-info">
                  <h3>
                    {product.name}
                    <span> Rs. {Number(product.price || 0).toLocaleString()}</span>
                  </h3>

                  <p className="description">{product.description}</p>

                  <div className="product-meta">
                    <span></span>
                    {product.material || product.category || "Furniture"}
                  </div>

                  {searchResults && product.similarity !== undefined && (
                    <p className="similarity">
                      Match: {(product.similarity * 100).toFixed(1)}%
                    </p>
                  )}

                  <button className="add-cart-btn" onClick={() => handleAddToCart(product)}>
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pagination">
          <button>‹</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>...</button>
          <button>12</button>
          <button>›</button>
        </div>
      </main>
    </div>
  );
};

export default Browse;