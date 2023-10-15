import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  };
function SignIn() {
  return (
    <div style={containerStyle}>
      <h1>Sign In</h1>
      <Link to="/home">
        <Button type='default'>Go to Home Page</Button>
      </Link>
    </div>
  );
}

export default SignIn;
