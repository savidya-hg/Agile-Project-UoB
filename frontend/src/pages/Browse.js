import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/axiosConfig";
import AISearchModal from "../components/AISearchModal";
import ProductDetailsModal from "../components/ProductDetailsModal";
import { useCart } from "../context/CartContext";
import "./Browse.css";

const fallbackProducts = [
  {
    _id: "fb-1",
    name: "Sorensen Velvet Sectional Sofa",
    price: 385000,
    category: "Living Room",
    material: "Velvet",
    color: "Purple",
    imageUrl: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=800",
    description: "Luxurious deep-cushion sectional upholstered in premium velvet, featuring a custom-built pine wood frame."
  },
  {
    _id: "fb-2",
    name: "Augusta Marble Dining Table",
    price: 245000,
    category: "Dining",
    material: "Marble",
    color: "White",
    imageUrl: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=800",
    description: "Elegant polished white marble dining table with custom gold-finished steel supports."
  },
  {
    _id: "fb-3",
    name: "Hygge Oak Bed Frame",
    price: 195000,
    category: "Bedroom",
    material: "Oak",
    color: "Brown",
    imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
    description: "Minimalist Scandinavian design crafted from solid premium sustainable oakwood."
  },
  {
    _id: "fb-4",
    name: "Eames Silhouette Leather Lounge",
    price: 290000,
    category: "Living Room",
    material: "Leather",
    color: "Black",
    imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800",
    description: "Ergonomic modern classic lounge chair upholstered in grain-selected black leather."
  },
  {
    _id: "fb-5",
    name: "Modus Minimalist Desk",
    price: 135000,
    category: "Office",
    material: "Wood",
    color: "Grey",
    imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
    description: "Clean lines and spacious drawer compartments for the modern luxury home office."
  },
  {
    _id: "fb-6",
    name: "Adelphi Velvet Lounge Chair",
    price: 115000,
    category: "Bedroom",
    material: "Velvet",
    color: "Grey",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800",
    description: "Plush single-seater reading chair with accent brass legs and contoured backrest."
  }
];

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

  const categoriesList = ["Living Room", "Dining", "Office", "Bedroom", "Outdoor"];
  const materialsList = ["All", "Wood", "Oak", "Velvet", "Leather", "Marble", "Glass", "Metal", "Fabric"];

  // Fetch products from API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        if (res.data && res.data.length > 0) {
          setAllProducts(res.data);
        } else {
          setAllProducts(fallbackProducts);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setAllProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
    // eslint-disable-next-line
  }, [location.search]);

  // Compute final filtered list
  const filteredProducts = useMemo(() => {
    let list = allProducts.length > 0 ? allProducts : fallbackProducts;

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
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-stone-500 font-light text-lg">
        Loading luxury furniture collection...
      </div>
    );
  }

  return (
    <div className="browse-page min-h-screen font-sans">
      
      {/* ===== HERO BANNER SECTION (Matching Home & Contact pages) ===== */}
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 pb-24">

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Clean Filter Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 bg-white rounded-2xl p-6 shadow-sm border border-stone-200 lg:sticky lg:top-36">
            
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <h2 className="text-base font-bold text-stone-900 tracking-wide uppercase">Filters</h2>
              {(selectedCategories.length > 0 || maxPrice < 1000000 || selectedMaterial !== "All" || searchTerm !== "") && (
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setMaxPrice(1000000);
                    setSelectedMaterial("All");
                    setSearchTerm("");
                  }}
                  className="text-xs text-[#c19571] hover:text-[#a07450] font-semibold transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-stone-400 tracking-wider uppercase mb-3">Search</h3>
              <input
                type="text"
                placeholder="Search collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#c19571] text-stone-900 placeholder:text-stone-400 transition-colors mb-2.5"
              />

              {/* Single Clean Upload Photo Button */}
              <button
                type="button"
                onClick={() => setShowAISearchModal(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-stone-200 bg-white hover:border-[#c19571] hover:bg-[#c19571] text-stone-700 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs group"
              >
                <i className="fas fa-camera text-[#c19571] group-hover:text-white transition-colors"></i>
                <span>Upload a Photo</span>
              </button>
            </div>

            {/* CATEGORY */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-stone-900 tracking-wider uppercase mb-3">Category</h3>
              <div className="space-y-2.5">
                {categoriesList.map((cat) => (
                  <label key={cat} className="flex items-center space-x-2.5 cursor-pointer text-sm text-stone-600 hover:text-stone-900 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryCheckbox(cat)}
                      className="w-4 h-4 rounded border-stone-350 text-[#c19571] focus:ring-[#c19571] accent-[#c19571]"
                    />
                    <span className={selectedCategories.includes(cat) ? "font-semibold text-stone-900" : "font-normal text-stone-600"}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE RANGE */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-stone-900 tracking-wider uppercase mb-3">Price Range</h3>
              <input
                type="range"
                min="0"
                max="1000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#c19571] cursor-pointer"
              />
              <div className="flex justify-between text-xs text-stone-500 font-medium mt-2">
                <span>Rs. 0</span>
                <span className="text-[#c19571] font-semibold">
                  Rs. {maxPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* MATERIAL */}
            <div>
              <h3 className="text-xs font-bold text-stone-900 tracking-wider uppercase mb-3">Material</h3>
              <div className="flex flex-wrap gap-1.5">
                {materialsList.map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => setSelectedMaterial(mat)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                      selectedMaterial === mat
                        ? "bg-[#c19571] text-white shadow-xs"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Right Column: Product Grid */}
          <main className="flex-grow w-full">
            
            {/* Grid Header Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-stone-200 mb-8 gap-4">
              <span className="text-xs font-semibold text-stone-500 tracking-wider uppercase">
                Showing {filteredProducts.length} Premium Items
              </span>
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-xs text-stone-400 font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-700 font-semibold"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-stone-100">
                <svg className="w-12 h-12 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <h3 className="text-lg font-bold text-stone-900">No items found</h3>
                <p className="text-stone-500 text-sm mt-1.5 font-light">
                  Try adjusting your sidebar filters or clearing your search term.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <article 
                    className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-stone-200/70 shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                    key={product._id || product.id}
                  >
                    {/* Fixed height image wrapper with dark overlay & View Details button on hover */}
                    <div 
                      className="h-64 w-full overflow-hidden relative bg-stone-50"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-bold bg-white/90 text-stone-800 rounded-full tracking-wider uppercase backdrop-blur-md shadow-xs">
                        {product.category}
                      </span>

                      {/* Dark overlay + Centered View Details Button */}
                      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-20">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                          className="px-5 py-2.5 bg-white text-stone-900 font-semibold text-xs rounded-full shadow-lg hover:bg-[#c19571] hover:text-white transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2"
                        >
                          <i className="fas fa-eye"></i>
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="p-5 flex flex-col flex-grow justify-between bg-white">
                      <div>
                        <h3 
                          onClick={() => setSelectedProduct(product)}
                          className="font-bold text-base text-stone-900 tracking-tight line-clamp-2 leading-snug hover:text-[#c19571] transition-colors"
                        >
                          {product.name}
                        </h3>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                            {product.material || "Wood"}
                          </span>
                          <strong className="text-[#c19571] font-extrabold text-base tracking-wide">
                            Rs. {Number(product.price || 0).toLocaleString()}
                          </strong>
                        </div>
                      </div>

                      {/* Add to Cart button */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="mt-5 w-full py-2.5 rounded-xl border border-stone-300 font-medium text-sm text-stone-800 hover:bg-[#c19571] hover:border-[#c19571] hover:text-white transition-all duration-300 focus:outline-none flex items-center justify-center gap-2 shadow-xs"
                      >
                        <i className="fas fa-shopping-cart text-xs"></i>
                        Add to Cart
                      </button>
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