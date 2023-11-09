import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import googleLogin from '../../../api/requests/googleLogin';

function GoogleLogin() {
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    console.log(code);
    if (code) {
      // Call the googleLogin function with the code
      googleLogin(code).then(success => {
        if (success) {
          // Redirect to home page or dashboard if login was successful
          console.log('Logged in successfully');
          // Replace with your path to redirect
          // this could be using history.push('/path') if you're using react-router
        } else {
          // Handle the error scenario, maybe set an error message state and display it
          console.error('Failed to log in with Google');
        }
      });
    }
  }, [location]);

  return (
    <div>
      <h1>Google Login Page</h1>
      {/* Render additional UI elements or messages here if needed */}
    </div>
  );
}

export default GoogleLogin;
