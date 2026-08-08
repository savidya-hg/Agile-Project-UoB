import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/axiosConfig";
import AISearchModal from "../components/AISearchModal";
import ProductDetailsModal from "../components/ProductDetailsModal";
import { useCart } from "../context/CartContext";
import "./Browse.css";



const Browse = () => {
  const location = useLocation();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showAISearchModal, setShowAISearchModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useCart();

  const [categoriesList, setCategoriesList] = useState(["Living Room", "Dining", "Office", "Bedroom", "Outdoor"]);
  const [materialsList, setMaterialsList] = useState(["All", "Wood", "Oak", "Velvet", "Leather", "Marble", "Glass", "Metal", "Fabric"]);

  // Fetch products and settings from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, settingsRes] = await Promise.all([
          API.get("/products").catch(() => ({ data: [] })),
          API.get("/settings").catch(() => ({ data: null }))
        ]);

        if (productsRes.data && productsRes.data.length > 0) {
          setAllProducts(productsRes.data);
        } else {
          setAllProducts([]);
        }

        if (settingsRes.data) {
          if (settingsRes.data.categories) setCategoriesList(settingsRes.data.categories);
          if (settingsRes.data.materials) setMaterialsList(["All", ...settingsRes.data.materials]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle category & AI modal updates from URL search query
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlCategory = params.get("category");
    const aiParam = params.get("ai");

    if (aiParam === "true") {
      setShowAISearchModal(true);
    }

    if (urlCategory) {
      const cleanUrl = urlCategory.toLowerCase().replace(/[^a-z0-9]/g, "");
      const matched = categoriesList.find(
        (cat) => cat.toLowerCase().replace(/[^a-z0-9]/g, "") === cleanUrl
      );
      if (matched) {
        setSelectedCategories([matched]);
      }
    } else {
      setSelectedCategories([]);
    }
  }, [location.search, categoriesList]);

  // Compute final filtered list
  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    // Text search
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      list = list.filter((p) =>
        `${p.name || ""} ${p.description || ""} ${p.category || ""} ${p.material || ""} ${p.color || ""}`
          .toLowerCase()
          .includes(lower)
      );
    }

    // Category checkboxes
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }

    // Price range
    list = list.filter((p) => Number(p.price || 0) <= maxPrice);

    // Material tags
    if (selectedMaterial !== "All") {
      list = list.filter((p) =>
        `${p.material || ""} ${p.color || ""}`.toLowerCase().includes(selectedMaterial.toLowerCase())
      );
    }

    // Sorting
    const sorted = [...list];
    if (sortBy === "price-low") {
      sorted.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else {
      // Default: reverse / newest arrivals
      sorted.reverse();
    }

    return sorted;
  }, [allProducts, searchTerm, selectedCategories, maxPrice, selectedMaterial, sortBy]);

  const handleCategoryCheckbox = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} has been added to your cart.`);
  };

  if (loading) {
    return (
      <div className="browse-loading">
        Loading luxury furniture collection...
      </div>
    );
  }

  return (
    <div className="browse-page">

      {/* ===== HERO BANNER SECTION ===== */}
      <section className="browse-hero" style={{ backgroundImage: "url('/assets/hero-img.png')" }}>
        <div className="browse-hero-overlay">
          <div className="browse-hero-content animate-fade-up">
            <span className="browse-hero-badge">BFH Exclusive Catalog</span>
            <h1 className="browse-hero-title">Browse Our Collection</h1>
            <p className="browse-hero-subtitle">
              Explore handcrafted furniture designed with premium materials and timeless style.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="browse-body">
        <div className="browse-body-inner">

          {/* Left Column: Filter Sidebar */}
          <aside className="browse-sidebar">

            {/* Filter Header */}
            <div className="sidebar-header">
              <h2 className="sidebar-title">Filters</h2>
              {(selectedCategories.length > 0 || maxPrice < 1000000 || selectedMaterial !== "All" || searchTerm !== "") && (
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setMaxPrice(1000000);
                    setSelectedMaterial("All");
                    setSearchTerm("");
                  }}
                  className="sidebar-clear-btn"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="sidebar-section">
              <h3 className="sidebar-label">Search</h3>
              <input
                type="text"
                placeholder="Search collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sidebar-search-input"
              />

              {/* Upload Photo Button */}
              <button
                type="button"
                onClick={() => setShowAISearchModal(true)}
                className="sidebar-upload-btn"
              >
                <i className="fas fa-camera sidebar-upload-icon"></i>
                <span>Upload a Photo</span>
              </button>
            </div>

            {/* CATEGORY */}
            <div className="sidebar-section">
              <h3 className="sidebar-label">Category</h3>
              <div className="sidebar-checkbox-group">
                {categoriesList.map((cat) => (
                  <label key={cat} className="sidebar-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryCheckbox(cat)}
                      className="sidebar-checkbox"
                    />
                    <span className={selectedCategories.includes(cat) ? "active" : ""}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE RANGE */}
            <div className="sidebar-section">
              <h3 className="sidebar-label">Price Range</h3>
              <input
                type="range"
                min="0"
                max="1000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="sidebar-range"
              />
              <div className="sidebar-range-labels">
                <span>Rs. 0</span>
                <span className="price-highlight">Rs. {maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* MATERIAL */}
            <div className="sidebar-section-last">
              <h3 className="sidebar-label">Material</h3>
              <div className="sidebar-material-tags">
                {materialsList.map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => setSelectedMaterial(mat)}
                    className={`material-tag ${selectedMaterial === mat ? "active" : ""}`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Right Column: Product Grid */}
          <main className="browse-main">

            {/* Grid Header */}
            <div className="grid-header">
              <span className="grid-count">
                Showing {filteredProducts.length} Premium Items
              </span>
              <div className="grid-sort">
                <span className="sort-label">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="no-items-box">
                <svg className="no-items-icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <h3 className="no-items-title">No items found</h3>
                <p className="no-items-text">
                  Try adjusting your sidebar filters or clearing your search term.
                </p>
              </div>
            ) : (
              <div className="bfh-product-grid">
                {filteredProducts.map((product) => (
                  <article
                    className="bfh-product-card"
                    key={product._id || product.id}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="card-image-wrapper">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        loading="lazy"
                      />
                      <div className="card-hover-overlay">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                          className="view-details-btn"
                        >
                          View Details
                        </button>
                      </div>
                    </div>

                    <div className="product-info">
                      <h3>
                        {product.name}
                      </h3>
                      <div className="product-price">
                        Rs. {Number(product.price || 0).toLocaleString()}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* AI Search Popup Modal */}
      {showAISearchModal && (
        <AISearchModal onClose={() => setShowAISearchModal(false)} />
      )}

    </div>
  );
};

export default Browse;