import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const register = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:7000/api/user', { email, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    return true;
  } catch (error) {
    console.error('Error during registration request:', error);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:7000/api/user/login', { email, password });
    const token = response.data.token;
    return token; // Modified: Now login function directly returns the token
  } catch (error) {
    console.error('Error during login request:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (previousPage) => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match!');
        return;
      }

      const success = await register(email, password);
      if (success) {
        navigate(previousPage || '../');
        setLoggedIn(true);
      } else {
        setError('Registration failed!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.message || 'Registration failed');
    }
  };

  const handleLogin = async (previousPage) => {
    try {
      const token = await login(email, password);
      setLoggedIn(true);
      localStorage.setItem('token', token);
      navigate(previousPage || '/');
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message || 'Login failed');
    }
  };

  return (
      props.formType === 'register' ? (
        <div className='login-page-container'>
          <div className='login-form'>
            <h1>Registration</h1>
            <input className='form-input' type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='form-input' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className='form-input' type="password" placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button className='btn-1' onClick={() => handleRegister(props.previousPage)}>Next</button>
            {error && <p>{error}</p>}
          </div>
        </div>
      ) : (
        <div className='login-page-container'>
          <div className='login-form'>
            <h1>Login</h1>
            <input className='form-input' type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='form-input' type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='btn-2' onClick={() => handleLogin(props.previousPage)}>Next</button>
            {error && <p>{error}</p>}
          </div>
        </div>
      )
    )
};

export default LoginPage;