import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import AdminDashboard from './pages/AdminDashboard';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminEditProduct from './pages/AdminEditProduct';
import Cart from './pages/Cart';
import './App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        {/* No container div here – each page controls its own layout */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AdminAddProduct />} />
          <Route path="/admin/edit/:id" element={<AdminEditProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;