import React, { useState } from 'react';
import apiService from '../../services/apiService';
import '../styles/Login.css'; // Import the CSS file
import RegistrationForm from './RegistrationForm';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false); // State to manage showing registration form

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.login(username, password);
      onLogin(response.data.token);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm); // Toggle registration form visibility
  };

  return (
    <div className="login-container">
      {!showRegisterForm && (
        <>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <p>
            Don't have an account?{' '}
            <button className="register-link" onClick={toggleRegisterForm}>
              Register
            </button>
          </p>
        </>
      )}

      {/* Conditional rendering for registration form */}
      {showRegisterForm && (
        <div className="register-form-container">
          <RegistrationForm />
          <p>
            Already have an account?{' '}
            <button className="register-link" onClick={toggleRegisterForm}>
              Back to Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
