import React from "react";
import { Button, Input, Form, Divider, Typography } from "antd";
import { ReactComponent as Logo } from "../../../Assets/Logo.svg";
import { ReactComponent as SignPageAnimation } from "../../../Assets/SignPageAnimation.svg";
import { ReactComponent as GoogleLogo } from "../../../Assets/icons/GoogleIcon.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import getGoogleOAuthURL from "../../../Config/googleOAuth"
const { Text } = Typography;

const splitContainerStyle = {
  display: "flex",
  width: "100%",
  height: "100vh",
  margin: "0 auto",
};

const formContainerStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};
const animationStyle = {
  maxWidth: "100%",
  maxHeight: "100%",
};

const dividerStyle = {
  color: "#9EC8EE",
  borderColor: "#9EC8EE",
};

const imageStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(#EAF3FB, #BEDAF4)",
};

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const displayCenterStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const formButtonStyle = {
  ...displayCenterStyle,
  padding: "22px 0px",
  width: "100%",
  background: "#2D87DA",
  color: "#FFFFFF",
};
const logoStyle = {
  ...displayCenterStyle,
  marginBottom: "20px",
  maxWidth: "80%",
  maxHeight: "80%",
};
const googleLogoStyle = {
  marginRight: "20px",
};
const forgotPasswordStyle = {
  color: "#363A3D",
};
const signUpStyle = {
  color: "#2D87DA",
};
const passwordDivStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
};
const labelStyle = {
  fontSize: "12px",
};
function SignIn() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div style={splitContainerStyle}>
      <div style={formContainerStyle}>
        <Link to="/home" style={logoStyle}>
          <Logo/>
        </Link>
        <Form {...formItemLayout}>
          <Form.Item>
            <div>
              <Button style={formButtonStyle} onClick={() => window.location.href = getGoogleOAuthURL()}>
                <GoogleLogo style={googleLogoStyle} />

                <span>Sign In with Google</span>
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <Divider style={dividerStyle} orientation="center" plain>
              or
            </Divider>
          </Form.Item>
          <Form.Item name="email">
            <Text style={labelStyle}>EMAIL ADRESS</Text>
            <Input
              size="large"
              type="email"
              placeholder="example@outlook.com"
            />
          </Form.Item>
          <Form.Item name="password">
            <Text style={labelStyle}>PASSWORD</Text>
            <div style={passwordDivStyle}>
              <Input.Password
                size="large"
                placeholder="password"
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
              />
              <Button type="link" style={forgotPasswordStyle}>
                Forgot Password?
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <Button style={formButtonStyle}>LOG IN</Button>
          </Form.Item>
          <Form.Item>
            <div style={displayCenterStyle}>
              <span>Don't have an account?</span>
              <Button type="link" style={signUpStyle} onClick={() => navigate("/auth/sign-up")}>
                Sign Up
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <div style={imageStyle}>
        <SignPageAnimation style={animationStyle} />
      </div>
    </div>
  );
}

export default SignIn;
