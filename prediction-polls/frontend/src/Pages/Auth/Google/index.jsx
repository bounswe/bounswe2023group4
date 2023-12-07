import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import googleLogin from '../../../api/requests/googleLogin';

function GoogleLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  const code = new URLSearchParams(location.search).get('code');

  const handleLogin = async () => {
    if (code) {
      try {
        const result = await googleLogin(code);
        if (result.success) {
          navigate(`/profile/${result.username}`);
        } else {
          navigate('/auth/sign-in');
        }
      } catch (error) {
        navigate('/auth/sign-in');
      }
    }
  };

  handleLogin();
}, [location.search, navigate]);


  return (
    <div>
      <h1>Redirecting..</h1>
    </div>
  );
}

export default GoogleLogin;