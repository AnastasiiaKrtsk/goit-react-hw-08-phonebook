import { Navigate } from 'react-router-dom';

import { useAuth } from './useAuth';

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  // component - RegisterPage or LoginPage
  const { isLoggedIn } = useAuth(); // isLoggedIn - true or false
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component; // if isLoggedIn is true, then redirect to redirectTo, else render Component
};

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  // component - ContactsPage
  const { isLoggedIn, isRefreshing } = useAuth(); // isLoggedIn - true or false
  const shouldRedirect = !isLoggedIn && !isRefreshing; // if isLoggedIn is false and isRefreshing is false, then shouldRedirect is true
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component; // if shouldRedirect is true, then redirect to redirectTo, else render Component
};
