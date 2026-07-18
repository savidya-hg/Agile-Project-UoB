import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/axiosConfig";
import AIUploader from "../components/AIUploader";
import { useCart } from "../context/CartContext";
import "./Browse.css";

const Browse = () => {
  const location = useLocation();
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // AI section visibility
  const [aiEnabled, setAiEnabled] = useState(false);

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
      filtered.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    } else if (sort === "price-high") {
      filtered.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    } else {
      filtered.reverse();
    }

    setDisplayedProducts(filtered);
  };

  useEffect(() => {
    if (allProducts.length === 0) return;

    const params = new URLSearchParams(location.search);
    const urlCategory = params.get("category");

    if (urlCategory) {
      const cleanUrl = urlCategory.toLowerCase().replace(/[^a-z0-9]/g, "");
      const matchedCategory = allProducts
        .map((p) => p.category)
        .filter(Boolean)
        .find((cat) => cat.toLowerCase().replace(/[^a-z0-9]/g, "") === cleanUrl);

      if (matchedCategory) {
        setSelectedCategory(matchedCategory);
        applyFilters(
          allProducts,
          searchTerm,
          matchedCategory,
          selectedMaterial,
          sortBy
        );
      } else {
        setSelectedCategory("All");
        applyFilters(
          allProducts,
          searchTerm,
          "All",
          selectedMaterial,
          sortBy
        );
      }
    } else {
      setSelectedCategory("All");
      applyFilters(
        allProducts,
        searchTerm,
        "All",
        selectedMaterial,
        sortBy
      );
    }
    // eslint-disable-next-line
  }, [location.search, allProducts]);

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

    applyFilters(
      allProducts,
      searchTerm,
      selectedCategory,
      selectedMaterial,
      sortBy
    );
  };

  const handleAIToggle = () => {
    const nextValue = !aiEnabled;

    setAiEnabled(nextValue);

    if (!nextValue) {
      setSearchResults(null);

      applyFilters(
        allProducts,
        searchTerm,
        selectedCategory,
        selectedMaterial,
        sortBy
      );
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearchTerm(value);
    setSearchResults(null);

    applyFilters(
      allProducts,
      value,
      selectedCategory,
      selectedMaterial,
      sortBy
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchResults(null);

    applyFilters(
      allProducts,
      searchTerm,
      category,
      selectedMaterial,
      sortBy
    );
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    setSearchResults(null);

    applyFilters(
      allProducts,
      searchTerm,
      selectedCategory,
      material,
      sortBy
    );
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
    <div className="browse-wrapper">

      <div className="bfh-shop-page">
        <aside className="bfh-filter-panel">
          <h2>Filters</h2>

          <div
            className="bfh-ai-mini"
            onClick={handleAIToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleAIToggle();
              }
            }}
          >
            <span>AI Recommendations</span>

            <span
              className={aiEnabled ? "toggle active" : "toggle"}
            ></span>
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
                  type="button"
                  key={mat}
                  className={
                    selectedMaterial === mat
                      ? "material active"
                      : "material"
                  }
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
                Showing {displayedProducts.length} of {allProducts.length}{" "}
                luxury items
              </p>
            </div>

            <select
              className="sort-select"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          {aiEnabled && (
            <section className="ai-visual-section" id="ai-search-section">
              <div className="ai-analysis-card">
                <div className="ai-scan-icon">▣</div>

                <h2>
                  {searchResults ? "Analysis Complete" : "Analyzing Image..."}
                </h2>

                <p>
                  {searchResults
                    ? "Your visually similar furniture matches are ready."
                    : "Extracting textures, contours, and style archetypes."}
                </p>

                <div className="ai-progress-track">
                  <div
                    className={
                      searchResults
                        ? "ai-progress-fill complete"
                        : "ai-progress-fill"
                    }
                  ></div>
                </div>
              </div>

              <div className="ai-upload-wrapper">
                <AIUploader
                  products={allProducts}
                  onSearchResults={handleAISearch}
                />
              </div>

              <div className="ai-filter-row">
                <div className="ai-filter-buttons">
                  <button type="button" className="ai-filter-chip">
                    ◇ Category
                  </button>

                  <button type="button" className="ai-filter-chip">
                    ▣ Price
                  </button>
                </div>

                <p>
                  Showing{" "}
                  {searchResults
                    ? searchResults.length
                    : displayedProducts.length}{" "}
                  visually similar matches
                </p>
              </div>

              <div className="ai-results-divider"></div>

              <h2 className="ai-top-title">Top 3 Matches</h2>

              <div className="ai-match-grid">
                {(searchResults || displayedProducts)
                  .slice(0, 3)
                  .map((product, index) => (
                    <article className="ai-match-card" key={product._id}>
                      <div className="ai-match-image-wrap">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                        />

                        <span className="ai-match-badge">
                          {product.similarity !== undefined
                            ? `${(product.similarity * 100).toFixed(0)}% MATCH`
                            : `${98 - index * 7}% MATCH`}
                        </span>
                      </div>

                      <div className="ai-match-content">
                        <h3>{product.name}</h3>

                        <p>
                          {product.description ||
                            "Premium furniture selected through AI visual matching."}
                        </p>

                        <div className="ai-match-bottom">
                          <strong>
                            LKR{" "}
                            {Number(product.price || 0).toLocaleString()}
                          </strong>

                          <button
                            type="button"
                            onClick={() => handleAddToCart(product)}
                          >
                            →
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>

              {searchResults && (
                <div className="ai-show-all">
                  <button
                    type="button"
                    onClick={() => handleAISearch(null)}
                  >
                    Show All Products
                  </button>
                </div>
              )}
            </section>
          )}
          
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
                  <button type="button" className="wishlist-btn">
                    ♡
                  </button>

                  <img src={product.imageUrl} alt={product.name} />

                  <div className="product-info">
                    <h3>
                      {product.name}

                      <span>
                        {" "}
                        Rs.{" "}
                        {Number(product.price || 0).toLocaleString()}
                      </span>
                    </h3>

                    <p className="description">
                      {product.description}
                    </p>

                    <div className="product-meta">
                      <span></span>

                      {product.material ||
                        product.category ||
                        "Furniture"}
                    </div>

                    {searchResults &&
                      product.similarity !== undefined && (
                        <p className="similarity">
                          Match:{" "}
                          {(product.similarity * 100).toFixed(1)}%
                        </p>
                      )}

                    <button
                      type="button"
                      className="add-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pagination">
            <button type="button">‹</button>
            <button type="button" className="active">
              1
            </button>
            <button type="button">2</button>
            <button type="button">3</button>
            <button type="button">...</button>
            <button type="button">12</button>
            <button type="button">›</button>
          </div>
        </main>
      </div>

    </div>
  );
};

export default Browse;