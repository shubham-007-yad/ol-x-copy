import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price) * (item.quantity || 1), 0).toFixed(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty. Cannot place an order.');
      navigate('/cart');
      return;
    }

    const orderDetails = {
      id: Date.now(), // Unique ID for the order
      items: cart,
      total: calculateTotal(),
      customerInfo: { name, phone, address, pincode, city, state, country, paymentMethod },
      orderDate: new Date().toLocaleString(),
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('olx_clone_orders') || '[]');
    localStorage.setItem('olx_clone_orders', JSON.stringify([...existingOrders, orderDetails]));

    console.log('Order Details:', orderDetails);
    alert(
      `Order Placed Successfully!
Name: ${name}
Phone: ${phone}
Address: ${address}, ${pincode}
City: ${city}
State: ${state}
Country: ${country}
Payment Method: ${paymentMethod}
Total: Rs. ${calculateTotal()}`
    );
    setCart([]); // Clear cart after successful order
    navigate('/'); // Redirect to home page
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart is Empty</h1>
        <p>Please add items to your cart before proceeding to checkout.</p>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="order-item">
            <div className="item-details">
              <h3>{item.title}</h3>
              <p>Rs. {parseFloat(item.price).toFixed(2)} x {item.quantity || 1}</p>
            </div>
          </div>
        ))}
        <div className="order-total">
          <h3>Total: Rs. {calculateTotal()}</h3>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="checkout-form">
        <h2>Shipping Information</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
          pattern="[0-9]{10}"
          maxLength="10"
          required
        />
        <textarea
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />

        <h2>Payment Method</h2>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>

        <button type="submit" className="place-order-button">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
