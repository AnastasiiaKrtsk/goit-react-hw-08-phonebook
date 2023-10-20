import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Contacts from 'pages/Contacts';
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';
import { Layout } from './Layout';
import { useEffect } from 'react';
import { Loader } from './Loader';
import { PrivateRoute } from './/Routes';
import { RestrictedRoute } from './Routes';
import { requestAutoLoginThunk } from 'redux/authSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from './useAuth';

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  useEffect(() => {
    dispatch(requestAutoLoginThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<Register />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<Login />} />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<Contacts />} />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
//  <div>
//       <header>
//         <nav>
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/contacts">Contacts</NavLink>
//           <NavLink to="/login">Login</NavLink>
//           <NavLink to="/register">Register</NavLink>
//         </nav>
//         <main>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/contacts" element={<Contacts />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </main>
//       </header>
//     </div>
