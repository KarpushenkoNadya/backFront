import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthServices} from '../../services';

import styles from './SignUpPage.module.scss';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
  
    const handleRegister = async () => {
      try {
        if (password !== confirmPassword) {
          setError('Passwords do not match!');
          return;
        }
    
        const success = await AuthServices.register(email, password);
        if (success) {
          navigate('../');
          setLoggedIn(true);
        } else {
          setError('Registration failed!');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setError(error.message || 'Registration failed');
      }
    };

    return (
        <div className={styles.loginPageContainer}>
          <div className={styles.loginForm}>
            <h1>Registration</h1>
            <input className={styles.formInput} type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={styles.formInput} type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className={styles.formInput} type="password" placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button className={styles.submitButton} onClick={() => handleRegister()}>Next</button>
            {error && <p>{error}</p>}
          </div>
        </div>
    );
};

export default SignUpPage;
