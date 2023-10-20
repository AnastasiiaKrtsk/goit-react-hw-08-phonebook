import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Contacts from 'pages/Contacts';
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';
import { useEffect } from 'react';
import { requestAutoLoginThunk } from 'redux/authSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestAutoLoginThunk());
  }, [dispatch]);

  return (
    <div>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </header>
    </div>
  );
}

export default App;
