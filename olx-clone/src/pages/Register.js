import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // In a real app, you'd send registration data to a backend here
    alert('Registration successful!'); // Simulate registration
    const newUserId = `user_${Date.now()}`;
    login(newUserId); // Simulate login after registration with a unique ID
    navigate('/'); // Redirect to home after registration
  };

  return (
    <div className="auth-form">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;