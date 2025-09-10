import React, { createContext, useState, useEffect } from 'react'; // Import useEffect

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart state from localStorage or an empty array
  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem('olx_clone_cart');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('olx_clone_cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]); // Dependency array: run effect when 'cart' changes

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingProductIndex > -1) {
        // Product already in cart, increment quantity
        const newCart = [...prevCart];
        newCart[existingProductIndex] = {
          ...newCart[existingProductIndex],
          quantity: (newCart[existingProductIndex].quantity || 1) + 1,
        };
        return newCart;
      } else {
        // Product not in cart, add with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.title} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const adjustQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      const newCart = prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) } // Ensure quantity is at least 1
          : item
      );
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, adjustQuantity, setCart }}>
      {children}
    </CartContext.Provider>
  );
};