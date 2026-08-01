import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/axiosConfig";
import AIUploader from "../components/AIUploader";
import { useCart } from "../context/CartContext";

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
  const [searchResults, setSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedColor, setSelectedColor] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [aiEnabled, setAiEnabled] = useState(false);

  const { addToCart } = useCart();

  const categoriesList = ["Living Room", "Dining", "Office", "Bedroom"];
  const colorsList = ["All", "Black", "White", "Grey", "Purple", "Brown", "Oak", "Velvet", "Leather"];

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

  // Handle category updates from URL search query
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlCategory = params.get("category");
    const aiParam = params.get("ai");

    if (aiParam === "true") {
      setAiEnabled(true);
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

    // AI recommendation list
    if (searchResults && searchResults.length > 0) {
      list = searchResults;
    }

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

    // Color/Material tags
    if (selectedColor !== "All") {
      list = list.filter((p) =>
        `${p.color || ""} ${p.material || ""}`.toLowerCase().includes(selectedColor.toLowerCase())
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
  }, [allProducts, searchResults, searchTerm, selectedCategories, maxPrice, selectedColor, sortBy]);

  const handleCategoryCheckbox = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
    setSearchResults(null);
  };

  const handleAISearch = (results) => {
    if (results && results.length > 0) {
      setSearchResults(results);
      setSearchTerm("");
      setSelectedCategories([]);
      setSelectedColor("All");
      return;
    }
    setSearchResults(null);
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
    <div className="bg-[#FAF9F6] min-h-screen font-sans pt-8">
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Redesigned Filter Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            
            {/* Filter Title */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <h2 className="text-lg font-bold text-stone-900">Filters</h2>
              {(selectedCategories.length > 0 || maxPrice < 1000000 || selectedColor !== "All" || searchTerm !== "") && (
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setMaxPrice(1000000);
                    setSelectedColor("All");
                    setSearchTerm("");
                    setSearchResults(null);
                  }}
                  className="text-xs text-[#c19571] hover:text-[#a07450] font-semibold"
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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSearchResults(null);
                }}
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900"
              />
            </div>

            {/* AI Search Section */}
            <div className="mb-6 p-4 bg-stone-50 rounded-xl border border-stone-150">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-700 tracking-wide uppercase">AI Search Helper</span>
                <button
                  onClick={() => setAiEnabled(!aiEnabled)}
                  className={`w-8 h-4 rounded-full transition-colors relative focus:outline-none ${aiEnabled ? 'bg-[#c19571]' : 'bg-stone-300'}`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.25 transition-transform ${aiEnabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
              </div>
              {aiEnabled && (
                <div className="mt-2 space-y-2">
                  <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                    Upload an image to scan our luxury catalog for visually matching furniture.
                  </p>
                  <AIUploader products={allProducts} onSearchResults={handleAISearch} />
                  {searchResults && (
                    <button
                      onClick={() => handleAISearch(null)}
                      className="w-full py-1.5 text-xs font-bold bg-[#c19571] text-white rounded-lg hover:bg-[#a07450] transition-colors mt-2"
                    >
                      Clear AI Filter
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* CATEGORY (Checkboxes with accent colors) */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-stone-900 tracking-wider uppercase mb-3">CATEGORY</h3>
              <div className="space-y-2.5">
                {categoriesList.map((cat) => (
                  <label key={cat} className="flex items-center space-x-2.5 cursor-pointer text-sm text-stone-600 hover:text-stone-900">
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
              <h3 className="text-xs font-bold text-stone-900 tracking-wider uppercase mb-3">PRICE RANGE</h3>
              <input
                type="range"
                min="0"
                max="1000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setSearchResults(null);
                }}
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
              <h3 className="text-xs font-bold text-stone-900 tracking-wider uppercase mb-3">MATERIAL</h3>
              <div className="flex flex-wrap gap-1.5">
                {colorsList.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      setSearchResults(null);
                    }}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                      selectedColor === color
                        ? "bg-[#c19571] text-white"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {color}
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
                    className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                    key={product._id}
                  >
                    {/* Fixed height image wrapper */}
                    <div className="h-64 w-full overflow-hidden relative bg-stone-50">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 px-2.5 py-1 text-[9px] font-bold bg-white/90 text-stone-800 rounded-full tracking-wider uppercase backdrop-blur-xs shadow-xs">
                        {product.category}
                      </span>
                    </div>

                    {/* Content area with flex-grow to align card bottoms */}
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="font-bold text-base text-stone-900 tracking-tight line-clamp-2 min-h-[3rem] leading-snug">
                          {product.name}
                        </h3>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-stone-500">
                            {product.material || "Wood"}
                          </span>
                          <strong className="text-[#c19571] font-extrabold text-sm tracking-wide">
                            Rs. {Number(product.price || 0).toLocaleString()}
                          </strong>
                        </div>

                        {/* Description block with min-height and line-clamp to align button heights */}
                        <p className="flex-grow text-xs text-stone-500 line-clamp-2 my-2 min-h-[2.5rem] leading-relaxed font-light">
                          {product.description || "Indulge in modern luxury and supreme comfort with BFH curated furniture pieces."}
                        </p>
                      </div>

                      {/* Add to Cart button pushed to the absolute bottom */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="mt-auto w-full py-2.5 rounded-xl border border-stone-300 font-medium text-stone-800 hover:bg-[#c19571] hover:text-white transition-all duration-300 focus:outline-none"
                      >
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

    </div>
  );
};

export default Browse;