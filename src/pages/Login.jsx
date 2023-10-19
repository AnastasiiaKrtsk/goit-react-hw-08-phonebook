import React from 'react';
import styles from './Login.module.css'; // Import the CSS module

const Login = () => {
  return (
    <div className={styles.container}>
      <h1>Login Page</h1>
      <form className={styles.form}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
