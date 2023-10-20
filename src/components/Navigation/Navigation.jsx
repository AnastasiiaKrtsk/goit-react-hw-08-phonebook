import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../useAuth';
import styles from './Navigation.module.css'; // Import the CSS Module
import UserMenu from 'components/UserMenu/UserMenu';
import AuthNav from 'components/AuthNav';

const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav className={styles.nav}>
      <NavLink to="/" end className={styles.navLink}>
        Home
      </NavLink>
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </nav>
  );
};

export default Navigation;
