import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { isLoggedIn } = useContext(AuthContext); // To check if user is logged in
  const [username, setUsername] = useState('testuser'); // Simulated user data
  const [email, setEmail] = useState('test@example.com'); // Simulated user data
  const [message, setMessage] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, this would send updated profile data to a backend
    setMessage('Profile updated successfully! (Simulated)');
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  if (!isLoggedIn) {
    return (
      <div className="auth-form">
        <h1>Access Denied</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="auth-form"> {/* Reusing auth-form styling */}
      <h1>User Profile</h1>
      <form onSubmit={handleSave}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Save Changes</button>
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default Profile;
