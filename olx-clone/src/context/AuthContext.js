import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem('olx_clone_isLoggedIn');
    return storedLoggedIn === 'true';
  });
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('olx_clone_userId') || null;
  });

  useEffect(() => {
    localStorage.setItem('olx_clone_isLoggedIn', isLoggedIn);
    if (isLoggedIn) {
      localStorage.setItem('olx_clone_userId', userId);
    } else {
      localStorage.removeItem('olx_clone_userId');
    }
  }, [isLoggedIn, userId]);

  const login = (username, password) => {
    if (username === 'admin@1234' && password === 'chamiya1234') {
      setIsLoggedIn(true);
      setUserId('admin@1234');
      alert('Logged in as Admin!');
    } else {
      // For other users, just set a generic ID or handle as needed
      setIsLoggedIn(true);
      setUserId(`user_${Date.now()}`); // Unique ID for non-admin users
      alert('Logged in!');
    }
  };

  const logout = () => {
    console.log('Logout function called.');
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoggedIn(false);
      setUserId(null);
      alert('Logged out!'); // Placeholder for actual logout logic
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
