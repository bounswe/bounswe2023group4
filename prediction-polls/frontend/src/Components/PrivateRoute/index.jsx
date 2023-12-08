// components/PrivateRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  async function refreshAccessToken(refreshToken) {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_LINK + "/auth/access-token", { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await response.json();
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      return data.accessToken;
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
}

  useEffect(() => {
    async function checkAuth() {
      let accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken && refreshToken) {
        accessToken = await refreshAccessToken(refreshToken);
      }

      setIsAuthenticated(!!accessToken);
      setIsCheckingAuth(false);
    }

    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/auth/sign-in" replace />;
};

export default PrivateRoute;
