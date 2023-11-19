import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import googleLogin from '../../../api/requests/googleLogin';

function GoogleLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
      if (code) {
        googleLogin(code).then(success => {
          if (success) {
            // Redirect to profile if login was successful
            navigate('/profile');
          } else {
            // Redirect to a login error page or back to login
            navigate('/auth/sign-in');
          }
        });
    }
  }, [location.search, navigate]);

  return (
    <div>
      <h1>Redirecting..</h1>
    </div>
  );
}

export default GoogleLogin;
