import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Check if the user is authenticated by looking for the token in localStorage
    const token = localStorage.getItem('token');
    return token ? { isAuthenticated: true } : { isAuthenticated: false };
  });

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ isAuthenticated: false });
  };

  const value = {
    auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
