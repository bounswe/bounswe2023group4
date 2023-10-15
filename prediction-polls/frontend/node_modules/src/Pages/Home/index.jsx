import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
function Home() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  };
  const buttonContainerStyle = {
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1>Home Page</h1>
      <Link to="/auth/sign-up">
        <Button type='primary'>Go to Sign Up Page</Button>
      </Link>
      <Link to="/auth/sign-in">
        <Button style={buttonContainerStyle} type='dashed'>Go to Sign In Page</Button>
      </Link>
    </div>
  );
}

export default Home;
