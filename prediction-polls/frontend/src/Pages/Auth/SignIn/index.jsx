import React from "react";
import styles from "./SignIn.module.css";
import { Button, Input, Form, Divider, Typography } from "antd";
import { ReactComponent as Logo } from "../../../Assets/Logo.svg";
import { ReactComponent as SignPageAnimation } from "../../../Assets/SignPageAnimation.svg";
import { ReactComponent as GoogleLogo } from "../../../Assets/icons/GoogleIcon.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import getGoogleOAuthURL from "../../../Config/googleOAuth"
const { Text } = Typography;

function SignIn() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    window.location.href = getGoogleOAuthURL();
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password
        })
      };
      const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'/auth/login', requestOptions);
      const data = await response.json();
    
    if (response.status === 201 && data.accessToken && data.refreshToken) {
      localStorage.setItem('accessToken', data.accessToken); 
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate("/feed");
    } 

    }
    catch (error) {
      setMessage("An unexpected error has occurred. Please try again!")
    }
  };

  return (
    <div className={styles.splitContainerStyle}>
      <div className={styles.formContainerStyle}>
        <Link to="/home" className={styles.logoStyle}>
          <Logo />
        </Link>
        <Form className = {{...styles.formItemLayout,labelCol: { span: 24 }, wrapperCol: { span: 24 }}}>
          <Form.Item>
            <div>
              <Button style={formButtonStyle} onClick={handleLogin}>
                <GoogleLogo style={googleLogoStyle} />
                <span>Sign In with Google</span>
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <Divider className={styles.dividerStyle} orientation="center" plain>
              or
            </Divider>
          </Form.Item>
          <Form.Item name="username">
            <Text className={styles.labelStyle}>USERNAME</Text>
            <Input
              size="large"
              placeholder="exampleUsername"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="password">
            <Text className={styles.labelStyle}>PASSWORD</Text>
            <div className={styles.passwordDivStyle}>
              <Input.Password
                size="large"
                placeholder="password"
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="link" className={styles.forgotPasswordStyle}>
                Forgot Password?
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <Button className={styles.formButtonStyle} onClick={handleSignIn}>LOG IN</Button>
          </Form.Item>
          <Form.Item>
            <div className={styles.displayCenterStyle}>
              <span>Don't have an account?</span>
              <Button type="link" className={styles.signUpStyle} onClick={() => navigate("/auth/sign-up")}>
                Sign Up
              </Button>
            </div>
          </Form.Item>
        </Form>
        <div className={styles.messageStyle}>{message ? <p>{message}</p> : null}</div>
      </div>
      <div className={styles.imageStyle}>
        <SignPageAnimation className={styles.animationStyle} />
      </div>
    </div >

  );
}

export default SignIn;
