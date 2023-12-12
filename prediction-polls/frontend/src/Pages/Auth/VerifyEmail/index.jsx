import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';

function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    async function verifyEmail() {
      try {
        const url = `${process.env.REACT_APP_BACKEND_LINK}/auth/verify-email?token=${token}`;
        const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        });
       
        if (response.status === 200) {
          // Display success message
          message.config({
            maxCount: 1,
          });
          message.success('Email verified successfully!', 2);

          // Redirect after a delay
          setTimeout(() => navigate('/auth/sign-in'), 0);
        } else {
          // Display error message
          message.config({
            maxCount: 1,
          });
          message.error('Verification failed. Please try again.', 2);

          // Redirect to sign-in after a delay
          setTimeout(() => navigate('/auth/sign-in'), 0); // Adjust the delay as needed
        }
      } catch (error) {
      }
    }

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div>
      <h2>Redirecting...</h2>
    </div>
  );
}

export default VerifyEmailPage;
