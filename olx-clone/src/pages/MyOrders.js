import React, { useState, useEffect } from 'react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem('olx_clone_orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (error) {
      console.error("Failed to load orders from localStorage:", error);
    }
  }, []);

  const handleCancel = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('olx_clone_orders', JSON.stringify(updatedOrders));
    }
  };

  return (
    <div className="my-orders-page">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h2>Order ID: {order.id}</h2>
              <p>Date: {order.orderDate}</p>
              <p>Total: Rs. {order.total}</p>
              <h3>Items:</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '1rem', borderRadius: '0.25rem' }} loading="lazy" />
                    {item.title} (Rs. {item.price} x {item.quantity || 1})
                  </li>
                ))}
              </ul>
              <div className="shipping-info-box">
                <h3>Shipping Information:</h3>
                <p>Name: {order.customerInfo.name}</p>
                <p>Phone: {order.customerInfo.phone}</p>
                <div className="address-container">
                  <p>Address: {order.customerInfo.address}, {order.customerInfo.pincode}</p>
                  <p>City: {order.customerInfo.city}</p>
                  <p>State: {order.customerInfo.state}</p>
                  <p>Country: {order.customerInfo.country}</p>
                </div>
                <p>Payment Method: {order.customerInfo.paymentMethod}</p>
              </div>
              <button onClick={() => handleCancel(order.id)}>Cancel Order</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
