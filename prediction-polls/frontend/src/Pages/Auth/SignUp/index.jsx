import React from 'react';
import { Button, Input, Form, DatePicker, Checkbox, Typography, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from "../../../Assets/Logo.svg";
import { ReactComponent as SignPageAnimation } from "../../../Assets/SignPageAnimation.svg";
import '../../../index.css';
import { useState } from "react";


function SignUp() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://3.70.206.103:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": username,
          "email": email,
          "password": password,
          "birthday": birthday,
        }),
      });
      //let resJson = await res.json();
      console.log()
      if (res.status === 201) {
        setUserName("");
        setEmail("");
        setPassword("");
        setBirthday(new Date());
        setMessage("Your account has been created successfully!");
        navigate("/auth/sign-in")
      } else {
        setMessage("Username should be unique!");
      }
    } catch (err) {
      setMessage("Username should be unique!");
    }
  };

  //Change format from "2023-10-28T16:08:59.525Z" to "2023-10-28"
  function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const splitContainerStyle = {
    display: 'flex',
    width: '100%',
    margin: '0 auto',
    height: '100vh',
  };

  const animationStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
  };

  const displayCenterStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const formInputStyle = {
    padding: '10px 5px',
    width: '100%',
  }

  const formButtonStyle = {
    ...displayCenterStyle,
    padding: '22px 0px',
    width: '100%',
    opacity: '0.85'
  }

  const dividerStyle = {
    color: 'rgba(22, 119, 255, 0.4)',
    borderColor: 'rgba(22, 119, 255, 0.2)'
  };

  const formDatePickerStyle = {
    ...formInputStyle,
    width: '100%'
  }

  const imageContainerStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(#EAF3FB, #BEDAF4)",
  };

  const formContainerStyle = {
    flex: 1,
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const logoStyle = {
    ...displayCenterStyle,
    marginBottom: "20px",
    maxWidth: "80%",
    maxHeight: "80%",
  };

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };


  return (
    <div style={splitContainerStyle}>
      <div style={formContainerStyle}>
        <Link to="/home" style={logoStyle}>
          <Logo />
        </Link>
        <Form {...formItemLayout} >
          <Form.Item>
            <div>
              <Button type="primary" style={formButtonStyle}>
                <i className="fab fa-google fa-1x" style={{ marginRight: '10px' }}></i>  Sign Up with Google
              </Button>
            </div>
            <Divider style={dividerStyle} orientation="center" plain>
              or
            </Divider>
          </Form.Item>
          <Form.Item label="EMAIL ADDRESS" htmlFor="email">
            <Input
              id="email"
              required
              type="text"
              value={email}
              style={formInputStyle}
              placeholder="example@outlook.com"
              onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="USERNAME" htmlFor="username">
            <Input
              id="username"
              required
              type="text"
              value={username}
              style={formInputStyle}
              placeholder="exampleUsername"
              onChange={(e) => setUserName(e.target.value)} />
          </Form.Item>
          <Form.Item label="PASSWORD" htmlFor="password">
            <Input.Password
              id="password" 
              required
              style={formInputStyle}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item label="BIRTHDAY" htmlFor="birthday">
            <DatePicker
              id="birthday" 
              style={formDatePickerStyle}
              selected={birthday}
              placeholder="01.01.2000"
              onChange={(e) => setBirthday(formatDate(e))} />
          </Form.Item>
          <Form.Item>
            <Checkbox required>
              I agree to the{' '}
              <Typography.Link href="HERE GOES THE LINK">platform terms.</Typography.Link>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <div>
              <Button type="primary" htmlType="submit" style={formButtonStyle} onClick={handleSubmit}>
                Sign Up
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <div style={displayCenterStyle}>
              I Have an Account
              <Link
                to="/auth/sign-in"
                style={{ marginLeft: '10px' }}>
                Login
              </Link>
            </div>
          </Form.Item>
          <div style={displayCenterStyle} className="message">{message ? <p>{message}</p> : null}</div>
        </Form>
      </div>
      <div style={imageContainerStyle}>
        {/* Our sign up image from mock-up */}
        <SignPageAnimation style={animationStyle} />
      </div>
    </div>
  );
}

export default SignUp;

