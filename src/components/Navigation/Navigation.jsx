import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../useAuth';
import styles from './Navigation.module.css'; // Import the CSS Module

const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav className={styles.nav}>
      <NavLink to="/" end className={styles.navLink}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={styles.navLink}>
          Phonebook
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
