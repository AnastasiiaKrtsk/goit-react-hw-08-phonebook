import React from 'react';
import { useDispatch } from 'react-redux';
import { LogIn } from 'redux/authThunks';
import styles from './Login.module.css';
const Login = () => {
  const dispatch = useDispatch();

  const handleSignin = async e => {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;

    try {
      await dispatch(LogIn({ email, password })).unwrap();
      e.currentTarget.reset();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign-in</h1>
      <form className={styles.form} onSubmit={handleSignin}>
        <label>Email</label>
        <input type="text" name="email" required />
        <label>Password</label>
        <input type="password" name="password" required minLength={7} />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
