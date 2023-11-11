import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthServices} from '../../services';

import styles from './SignInPage.module.scss';

const SignInPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
          const token = await AuthServices.login(email, password);
          setLoggedIn(true);
          localStorage.setItem('token', token);
          navigate('../');
        } catch (error) {
          console.error('Error during login:', error);
          setError(error.message || 'Login failed');
        }
    };

    return (
        <div className={styles.loginPageContainer}>
          <div className={styles.loginForm}>
            <h1>Login</h1>
            <input className={styles.formInput} type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={styles.formInput} type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className={styles.submitButton} onClick={() => handleLogin()}>Next</button>
            {error && <p>{error}</p>}
          </div>
        </div>
    );
};

export default SignInPage;
