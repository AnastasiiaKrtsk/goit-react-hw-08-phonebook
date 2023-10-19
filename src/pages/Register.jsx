import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Register.module.css';
import { requestRegisterThunk } from 'redux/authSlice';

const Register = () => {
  const dispatch = useDispatch();

  const handleSignup = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.name.value;
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;
    dispatch(requestRegisterThunk({ name, email, password }));
  };
  return (
    <div className={styles.container}>
      <h1>Sign-up</h1>
      <form className={styles.form} onSubmit={handleSignup}>
        <label>Name</label>
        <input type="text" name="name" required />
        <label>Email</label>
        <input type="text" name="email" required />
        <label>Password</label>
        <input type="text" name="password" required minLength={7} />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Register;
