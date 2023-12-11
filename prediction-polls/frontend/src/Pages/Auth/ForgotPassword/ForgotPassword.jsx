import React from "react";
import {
  Button,
  Input,
  Form,
} from "antd";
import styles from "./ForgotPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../../Assets/Logo.svg";
import { ReactComponent as SignPageAnimation } from "../../../Assets/SignPageAnimation.svg";
import "../../../index.css";

function ForgotPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    navigate("/auth/sign-in");
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
          onFinish={handleSubmit}
          validateTrigger="onSubmit"
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
                message: "Please enter your email address!",
              },
              {
                type: "email",
                message: "The input is not a valid email address!",
              },
            ]}
          >
            <Input
              required
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
                onClick={handleSubmit}
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
