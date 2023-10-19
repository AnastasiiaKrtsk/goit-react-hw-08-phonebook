import React from 'react';
import styles from './Login.module.css'; // Import the CSS module
import { useDispatch } from 'react-redux';
import { requestLoginThunk } from 'redux/authSlice';

const Login = () => {
  const dispatch = useDispatch();

  const handleSignin = e => {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;
    dispatch(requestLoginThunk({ email, password }));
  };
  return (
    <div className={styles.container}>
      <h1>Sign-in</h1>
      <form className={styles.form} onSubmit={handleSignin}>
        <label>Email</label>
        <input type="text" name="email" required />
        <label>Password</label>
        <input type="text" name="password" required minLength={7} />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
