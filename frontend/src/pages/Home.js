import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-gray-900 font-sans flex flex-col justify-between">
      
      <div>
        {/* 2. STATISTICS BAR (White Background, repositioned directly under Navbar) */}
        <section className="bg-white py-10 md:py-14 border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
              
              {/* Box Section */}
              <div className="flex flex-col items-center text-center px-4 md:border-r border-gray-150">
                <div className="bg-purple-50 p-3 rounded-full mb-3.5 text-purple-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="text-3xl font-extrabold text-black tracking-tight">1000+</span>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 mt-1.5 uppercase">PREMIUM PRODUCTS</span>
              </div>

              {/* Star Section */}
              <div className="flex flex-col items-center text-center px-4 md:border-r border-gray-150">
                <div className="bg-purple-50 p-3 rounded-full mb-3.5 text-purple-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.97 2.88a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.88a1 1 0 00-1.175 0l-3.97 2.88c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.88c-.773-.564-.373-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
                  </svg>
                </div>
                <span className="text-3xl font-extrabold text-black tracking-tight">95%</span>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 mt-1.5 uppercase">SATISFACTION RATE</span>
              </div>

              {/* Chat Section */}
              <div className="flex flex-col items-center text-center px-4">
                <div className="bg-purple-50 p-3 rounded-full mb-3.5 text-purple-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-3xl font-extrabold text-black tracking-tight">24/7</span>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 mt-1.5 uppercase">WHATSAPP SUPPORT</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CURATED SPACES (Bento Box Grid Layout) */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            {/* Header area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-black text-4xl md:text-5xl font-extrabold tracking-tight">
                  Curated Spaces
                </h2>
                <p className="text-gray-500 text-sm md:text-base mt-2.5 font-medium">
                  Explore our meticulously designed collections by room.
                </p>
              </div>
              <Link 
                to="/browse" 
                className="group text-purple-600 hover:text-purple-800 font-semibold tracking-wide flex items-center transition-colors text-sm"
              >
                <span>View All</span> 
                <span className="ml-1.5 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
              </Link>
            </div>

            {/* Bento Grid (Exactly 3 columns and 2 rows on desktop) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column (Takes up 2/3 of total width) */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                
                {/* Top Row: Living Room (Large wide card spanning 2 columns) */}
                <Link 
                  to="/browse?category=Living%20Room"
                  className="group relative sm:col-span-2 overflow-hidden rounded-2xl h-[360px] shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-103"
                    style={{ 
                      backgroundImage: `url('https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=1200')` 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10">
                    <h3 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">Living Room</h3>
                    <p className="text-gray-300 text-xs md:text-sm mt-1.5 font-light">The heart of your home, redefined.</p>
                  </div>
                </Link>

                {/* Bottom Row - Card 1: Dining */}
                <Link 
                  to="/browse?category=Dining"
                  className="group relative overflow-hidden rounded-2xl h-[300px] shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-103"
                    style={{ 
                      backgroundImage: `url('https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=800')` 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                    <h3 className="text-white text-xl md:text-2xl font-extrabold tracking-tight">Dining</h3>
                    <p className="text-gray-300 text-xs mt-1.5 font-light">Elegance at the dining table.</p>
                  </div>
                </Link>

                {/* Bottom Row - Card 2: Office */}
                <Link 
                  to="/browse?category=Office"
                  className="group relative overflow-hidden rounded-2xl h-[300px] shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-103"
                    style={{ 
                      backgroundImage: `url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800')` 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                    <h3 className="text-white text-xl md:text-2xl font-extrabold tracking-tight">Office</h3>
                    <p className="text-gray-300 text-xs mt-1.5 font-light">Productivity, refined.</p>
                  </div>
                </Link>

              </div>

              {/* Right Side Bedroom (Spans full height of left column's top and bottom rows combined) */}
              <Link 
                to="/browse?category=Bedroom"
                className="group relative lg:col-span-1 overflow-hidden rounded-2xl min-h-[400px] lg:h-full shadow-sm hover:shadow-md transition-shadow duration-300 flex"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-103 w-full h-full"
                  style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800')` 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10 w-full">
                  <h3 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">Bedroom</h3>
                  <p className="text-gray-300 text-xs md:text-sm mt-1.5 font-light">Sanctuaries of serenity.</p>
                </div>
              </Link>

            </div>

          </div>
        </section>
      </div>

      {/* 4. FOOTER */}
      <footer id="contact-section" className="bg-white border-t border-gray-100 py-10 transition-all duration-300 mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-black tracking-widest text-black">BFH</span>
            <span className="text-gray-300 font-light">|</span>
            <span className="text-xs md:text-sm text-gray-500 font-light">Defining modern luxury through exceptional craftsmanship.</span>
          </div>
          <p className="text-gray-400 text-[11px] md:text-xs font-semibold tracking-wider">
            &copy; 2026 Basnayake Furniture House. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;