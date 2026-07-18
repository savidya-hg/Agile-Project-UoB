import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import AdminDashboard from './pages/AdminDashboard';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminEditProduct from './pages/AdminEditProduct';
import Cart from './pages/Cart';
import AISearch from './pages/AISearch';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
<<<<<<< HEAD
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<div className="container mx-auto py-8"><Browse /></div>} />
            <Route path="/admin" element={<div className="container mx-auto py-8"><AdminDashboard /></div>} />
            <Route path="/admin/add" element={<div className="container mx-auto py-8"><AdminAddProduct /></div>} />
            <Route path="/admin/edit/:id" element={<div className="container mx-auto py-8"><AdminEditProduct /></div>} />
            <Route path="/cart" element={<div className="container mx-auto py-8"><Cart /></div>} />
          </Routes>
        </div>
=======
        {/* No container div here – each page controls its own layout */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AdminAddProduct />} />
          <Route path="/admin/edit/:id" element={<AdminEditProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/ai-search" element={<AISearch />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
>>>>>>> master
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;