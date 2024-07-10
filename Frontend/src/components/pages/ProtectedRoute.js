import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getToken } from '../../utils/auth'; // Make sure this path is correct

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    element={getToken() ? <Component {...rest} /> : <Navigate to="/login" />}
  />
);

export default ProtectedRoute;
