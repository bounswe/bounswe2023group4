import React, { useState } from "react";
import {
  Button,
  Input,
  Form,
  message
} from "antd";
import styles from "./ResetPassword.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../../../Assets/Logo.svg";
import { ReactComponent as SignPageAnimation } from "../../../Assets/SignPageAnimation.svg";
import "../../../index.css";

function ResetPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const location = useLocation();

  const handleNewPasswordChange = (e) => {
    const newPass = e.target.value;
    setNewPassword(newPass);
    setPasswordsMatch(newPass === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPass = e.target.value;
    setConfirmPassword(confirmPass);
    setPasswordsMatch(newPassword === confirmPass); // Use the state variable newPassword
  };

  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const token = new URLSearchParams(location.search).get('token');
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token,
          newPassword: newPassword
        })
      };
      const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'/auth/reset-password', requestOptions);
      if (response.status === 200) {
        message.config({
          duration: 3,
          maxCount: 1,
        });
        message.success('Your password has been successfully reset', 2);
        setTimeout(() => navigate('/auth/sign-in'), 1500);
        }
    }
    catch (error) {
      setStatusMessage("An unexpected error has occurred. Please try again!")
    }
  };

  return (
    <div className={styles.splitContainerStyle}>
      <div className={styles.formContainerStyle}>
        <Link to="/home" className={styles.logoStyle}>
          <Logo />
        </Link>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          onFinish={handleResetPassword}
          validateTrigger="onSubmit"
        >
            <div className={styles.headerContainerStyle}>
                <h2> Reset your password </h2> 
                <h5> Enter your new password below and confirm it to reset your password. </h5>
            </div>
          <Form.Item
            label="NEW PASSWORD"
            name="password"
            rules={[
              {
                required: true,
                statusMessage: "Please enter your new password!",
              },
              {
                min: 8,
                statusMessage: "Password must be at least 8 characters!",
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 
                statusMessage:
                  "Password must include uppercase, lowercase, and a number!",
              },
            
            ]}
          >
            <Input
              required
              onChange={handleNewPasswordChange}
              type="text"
              className={styles.formInputStyle}
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item
            label="CONFIRM PASSWORD"
            name="confirm-password"
            rules={[
              {
                required: true,
                message: "Please enter your new password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters!",
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 
                message:
                  "Password must include uppercase, lowercase, and a number!",
              },
            
            ]}
          >
            <Input
              required
              onChange={handleConfirmPasswordChange}
              type="text"
              className={styles.formInputStyle}
              placeholder="Confirm Password"
            />
          </Form.Item>
          {!passwordsMatch && (
          <p style={{ color: "red" }}>Passwords do not match!</p>
        )}
          <Form.Item>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.formButtonStyle}
                disabled={!passwordsMatch}
                onClick={handleResetPassword}
              >
                Continue
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <div className={styles.displayCenterStyle}> 
              <Link to="/home" style={{ paddingLeft: "10px" }}>
                Back To Home
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.imageContainerStyle}>
        {/* Our sign up image from mock-up */}
        <SignPageAnimation className={styles.animationStyle} />
      </div>
    </div >
  );
}

export default ResetPassword;
