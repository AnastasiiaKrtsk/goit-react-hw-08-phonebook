import React from 'react';
import { useDispatch } from 'react-redux';
import { LogOut } from 'redux/authThunks';
import { useSelector } from 'react-redux';
import { selectEmail } from 'redux/authSlice';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectEmail);

  const handleLogOut = e => {
    dispatch(LogOut());
  };

  return (
    <div>
      <p>{userEmail}</p>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default UserMenu;
