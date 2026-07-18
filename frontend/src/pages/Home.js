import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      
      {/* 2. HERO SECTION */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-black">
        {/* Background Image with warm lighting and moody setting */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=2000')` 
          }}
        />
        
        {/* Dark moody overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 lg:from-black/80 lg:via-black/40 lg:to-transparent" />
        
        {/* Content (Left-aligned, vertically centered) */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-10 flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Find Furniture
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mt-1 bg-clip-text text-transparent bg-gradient-to-r from-luxury-lilac via-purple-300 to-purple-200">
              Smarter
            </h1>
            
            <p className="text-gray-300 text-base md:text-lg mt-6 leading-relaxed max-w-xl">
              Upload a furniture photo and discover matching products instantly within our premium collections. 
              Craft your perfect space with unparalleled precision.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link 
                to="/browse" 
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-luxury-lilac to-purple-300 text-black font-semibold tracking-wide shadow-lg hover:shadow-xl hover:opacity-90 active:scale-98 transition-all duration-350 text-center"
              >
                Explore Collection
              </Link>
              <Link 
                to="/browse?ai=true" 
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-gray-400 text-white font-semibold tracking-wide hover:bg-white hover:text-black hover:border-white active:scale-98 transition-all duration-350"
              >
                {/* Camera Icon */}
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Upload Photo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATISTICS BAR (White Background) */}
      <section className="bg-white py-12 md:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
            {/* Box Section */}
            <div className="flex flex-col items-center text-center px-4 md:border-r border-gray-200">
              <div className="bg-purple-50 p-3.5 rounded-full mb-4 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-4xl font-extrabold text-black tracking-tight">1000+</span>
              <span className="text-[11px] font-bold tracking-widest text-gray-400 mt-2 uppercase">PREMIUM PRODUCTS</span>
            </div>

            {/* Star Section */}
            <div className="flex flex-col items-center text-center px-4 md:border-r border-gray-200">
              <div className="bg-purple-50 p-3.5 rounded-full mb-4 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.97 2.88a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.88a1 1 0 00-1.175 0l-3.97 2.88c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.88c-.773-.564-.373-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
                </svg>
              </div>
              <span className="text-4xl font-extrabold text-black tracking-tight">95%</span>
              <span className="text-[11px] font-bold tracking-widest text-gray-400 mt-2 uppercase">SATISFACTION RATE</span>
            </div>

            {/* Chat Section */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="bg-purple-50 p-3.5 rounded-full mb-4 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-4xl font-extrabold text-black tracking-tight">24/7</span>
              <span className="text-[11px] font-bold tracking-widest text-gray-400 mt-2 uppercase">WHATSAPP SUPPORT</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATED SPACES (Bento Box Grid) */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
            <div>
              <h2 className="text-black text-4xl md:text-5xl font-extrabold tracking-tight">
                Curated Spaces
              </h2>
              <p className="text-gray-500 text-base md:text-lg mt-3 font-medium">
                Explore our meticulously designed collections by room.
              </p>
            </div>
            <Link 
              to="/browse" 
              className="group text-purple-600 hover:text-purple-800 font-semibold tracking-wide flex items-center transition-colors text-base"
            >
              View All 
              <span className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
            </Link>
          </div>

          {/* Bento Box Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Takes up 2/3 of total width on desktop) */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* Top: Living Room (Large wide card spanning 2 sub-columns) */}
              <Link 
                to="/browse?category=Living%20Room"
                className="group relative sm:col-span-2 overflow-hidden rounded-3xl h-[360px] shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=1200')` 
                  }}
                />
                {/* Bottom to top gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  <h3 className="text-white text-3xl font-bold tracking-tight">Living Room</h3>
                  <p className="text-gray-300 text-sm md:text-base mt-2 font-medium">The heart of your home, redefined.</p>
                </div>
              </Link>

              {/* Bottom Left: Dining (Square Card) */}
              <Link 
                to="/browse?category=Dining"
                className="group relative overflow-hidden rounded-3xl h-[300px] shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=800')` 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl font-bold tracking-tight">Dining</h3>
                  <p className="text-gray-300 text-xs mt-1.5 font-medium">Eleganza at the dining table.</p>
                </div>
              </Link>

              {/* Bottom Right: Office (Square Card) */}
              <Link 
                to="/browse?category=Office"
                className="group relative overflow-hidden rounded-3xl h-[300px] shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800')` 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl font-bold tracking-tight">Office</h3>
                  <p className="text-gray-300 text-xs mt-1.5 font-medium">Productivity, refined.</p>
                </div>
              </Link>

            </div>

            {/* Right Column: Bedroom (Spans full height of left column on desktop) */}
            <Link 
              to="/browse?category=Bedroom"
              className="group relative lg:col-span-1 overflow-hidden rounded-3xl h-[450px] lg:h-auto min-h-[400px] shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 lg:h-full"
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800')` 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <h3 className="text-white text-3xl font-bold tracking-tight">Bedroom</h3>
                <p className="text-gray-300 text-sm mt-2 font-medium">Sanctuaries of serenity.</p>
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* 5. FOOTER (White Background) */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Top section: 4-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Branding */}
            <div className="flex flex-col space-y-4">
              <span className="text-2xl font-black tracking-widest text-black">BFH</span>
              <p className="text-gray-500 text-sm leading-relaxed pr-4">
                Defining modern luxury through exceptional craftsmanship and intelligent design discovery.
              </p>
            </div>

            {/* Column 2: Company Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-black">Company</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/#story" className="text-gray-500 hover:text-black text-sm transition-colors duration-250">
                    Brand Story
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="text-gray-500 hover:text-black text-sm transition-colors duration-250">
                    Collections
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Innovation Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-black">Innovation</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/browse?ai=true" className="text-gray-500 hover:text-black text-sm transition-colors duration-250">
                    AI Experience
                  </Link>
                </li>
                <li>
                  <Link to="/#materials" className="text-gray-500 hover:text-black text-sm transition-colors duration-250">
                    Material Science
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-black">Legal</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/#privacy" className="text-gray-500 hover:text-black text-sm transition-colors duration-250">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/#terms" className="text-gray-500 hover:text-black text-sm transition-colors duration-250">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom section: Border & Copyright */}
          <div className="border-t border-gray-100 pt-8 flex items-center justify-center">
            <p className="text-gray-400 text-xs text-center font-medium">
              &copy; 2026 Basnayake Furniture House. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Home;