import React from "react";
import {
  Button,
  Input,
  Form,
  message
} from "antd";
import styles from "./ForgotPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../../Assets/Logo.svg";
import { ReactComponent as SignPageAnimation } from "../../../Assets/SignPageAnimation.svg";
import "../../../index.css";

function ForgotPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [email, setEmail  ] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState("");
  const [isFormValid, setIsFormValid] = React.useState(false);

  const onFormChange = (_, allFields) => {
    // Define a regular expression for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Find the email field from allFields
    const emailField = allFields.find(field => field.name[0] === 'email');
    
    // Check if the email is valid and if there are no errors in other fields
    const isEmailValid = emailField && emailRegex.test(emailField.value);
    const isOtherFieldsValid = allFields.every(field => field.name[0] !== 'email' ? field.errors.length === 0 : true);

    // Set form validity
    setIsFormValid(isEmailValid && isOtherFieldsValid);
  };


  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
        })
      };
      const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'/auth/request-password-reset', requestOptions);
      if (response.status === 200) {
        message.config({
            duration: 3,
            maxCount: 1,
          });
          message.success('Check your email! We have sent instructions to reset your password.', 2);
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
          onFinish={handleForgotPassword}
          validateTrigger="onSubmit"
          onFieldsChange={onFormChange}
        >
            <div className={styles.headerContainerStyle}>
                <h2> Reset your password </h2> 
                <h5> Enter your email address and we will send you instructions to reset your password. </h5>
            </div>
          <Form.Item
            label="EMAIL ADDRESS"
            name="email"
            rules={[
              {
                required: true,
                statusMessage: "Please enter your email address!",
              },
              {
                type: "email",
                statusMessage: "The input is not a valid email address!",
              },
            ]}
          >
            <Input
              required
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className={styles.formInputStyle}
              placeholder="example@outlook.com"
            />
          </Form.Item>
          <Form.Item>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.formButtonStyle}
                onClick={handleForgotPassword}
                disabled={!isFormValid}
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

export default ForgotPassword;
