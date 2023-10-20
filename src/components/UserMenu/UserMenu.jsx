import React from 'react';
import { useDispatch } from 'react-redux';
import { LogOut } from 'redux/authThunks';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/authSlice';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectEmail);

  const handleLogOut = e => {
    dispatch(LogOut());
  };

  return (
    <div className={styles.userMenuContainer}>
      <p className={styles.userEmail}>{userEmail}</p>
      <button className={styles.logoutButton} onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
