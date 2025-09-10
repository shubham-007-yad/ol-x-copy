import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdDetails from './pages/AdDetails';
import PostAdForm from './pages/PostAdForm';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Cart from './pages/Cart';
import EditAdForm from './pages/EditAdForm';
import MyAds from './pages/MyAds';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout'; // Import Checkout
import MyOrders from './pages/MyOrders'; // Import MyOrders
import ContactSeller from './pages/ContactSeller';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Set a random product background image on load
    const randomImageId = Math.floor(Math.random() * 1000);
    document.body.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080/?products&sig=${randomImageId}')`;
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Toaster position="top-right" reverseOrder={false} />
            <Header setSearchQuery={setSearchQuery} />
            <main>
              <Routes>
                <Route path="/" element={<Home searchQuery={searchQuery} />} />
                <Route path="/ad/:id" element={<AdDetails />} />
                <Route path="/post-ad" element={<PostAdForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/edit-ad/:id" element={<EditAdForm />} />
                <Route path="/my-ads" element={<MyAds />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} /> {/* New Checkout route */}
                <Route path="/my-orders" element={<MyOrders />} /> {/* New MyOrders route */}
                <Route path="/contact-seller/:adId" element={<ContactSeller />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;