import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '.';

const ProtectedRoute = ({ element: Element }) => {
  const { auth } = useAuth();

  return auth.isAuthenticated ? <Element /> : <Navigate to="/" />;
};

export default ProtectedRoute;
