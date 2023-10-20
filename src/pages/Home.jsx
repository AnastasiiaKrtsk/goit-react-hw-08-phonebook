import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homepage}>
      <h1>Welcome to the Phonebook App</h1>
      <p>Manage your contacts with ease.</p>
    </div>
  );
};

export default Home;
