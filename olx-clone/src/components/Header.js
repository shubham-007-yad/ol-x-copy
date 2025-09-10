import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { motion } from 'framer-motion';

const Header = ({ setSearchQuery }) => {
  const { cart } = useContext(CartContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await api.get('/ads');
        setAds(response.data);
      } catch (error) {
        console.error('Failed to fetch ads:', error);
      }
    };
    fetchAds();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value);

    if (value.length > 0) {
      const filteredSuggestions = ads.filter((ad) =>
        ad.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.title);
    setSearchQuery(suggestion.title);
    setSuggestions([]);
  };

  return (
    <header>
      <nav>
        <div className="navbar-left">
          <Link to="/">
            <motion.h1
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              OLX Clone
            </motion.h1>
          </Link>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            value={inputValue}
            onChange={handleChange}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="navbar-right">
          <div className="nav-links">
            <Link to="/">
              <button className="home-button">Home</button>
            </Link>
            {isLoggedIn && (
              <Link to="/my-orders">My Orders</Link>
            )}
            <Link to="/about">About</Link>
            {isLoggedIn && (
              <Link to="/profile">Profile</Link>
            )}
            {isLoggedIn && (
              <Link to="/my-ads">
                <button>My Ads</button>
              </Link>
            )}
            {isLoggedIn && (
              <Link to="/post-ad">
                <button>Post Ad</button>
              </Link>
            )}
            <Link to="/cart" className="cart-link">
              <span>🛒</span>
              <span className="cart-count">{cart.length}</span>
            </Link>
            {isLoggedIn && (
              <button onClick={logout}>Logout</button>
            )}
            {!isLoggedIn && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
