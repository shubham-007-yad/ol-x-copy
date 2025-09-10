import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, removeFromCart, adjustQuantity } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price) * (item.quantity || 1), 0).toFixed(2);
  };

  const handleBuyNow = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty. Add some items before buying!');
      return;
    }
    navigate('/checkout'); // Navigate to checkout page
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="item-details">
                <h2>{item.title}</h2>
                <p>Rs. {parseFloat(item.price).toFixed(2)}</p>
                <div className="quantity-control">
                  <button onClick={() => adjustQuantity(item.id, (item.quantity || 1) - 1)}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => adjustQuantity(item.id, (item.quantity || 1) + 1)}>+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-item-button">Remove</button>
            </div>
          ))}
          <div className="cart-summary">
            <div className="cart-total">
              <h3>Total: Rs. {calculateTotal()}</h3>
            </div>
            <button onClick={handleBuyNow} className="buy-now-button">Buy Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;