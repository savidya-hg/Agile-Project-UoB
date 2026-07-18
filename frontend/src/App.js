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
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;