import React from "react";
import {
  Button,
  Input,
  Form,
  DatePicker,
  Checkbox,
  Typography,
  Divider,
  Modal,
} from "antd";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../../Assets/Logo.svg";
import { ReactComponent as SignPageAnimation } from "../../../Assets/SignPageAnimation.svg";
import "../../../index.css";
import { useState } from "react";

function SignUp() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [usernameStatus, setUsernameStatus] = useState("");
  const [usernameHelp, setUsernameHelp] = useState("");
  const [showModal, setShowModal] = useState(false)
  const [isCheck, setIsCheck] = useState(false)


  const handleSubmit = async (values) => {
    try {
      const formattedValues = { ...values };
      if (values.birthday) {
        if (typeof values.birthday.format === 'function') {
          formattedValues.birthday = formatDate(values.birthday.toDate());
        }
      } else {
        formattedValues.birthday = undefined;
      }

      const res = await fetch(process.env.REACT_APP_BACKEND_LINK + "/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedValues),
      });

      if (res.status === 201) {
        setMessage("Your account has been created successfully!");
        navigate("/auth/sign-in");
      } else {
        setMessage("Username should be unique!");
        setUsernameStatus("error");
        setUsernameHelp("Username should be unique");
      }
    } catch (err) {

    }
  };

  //Change format from "2023-10-28T16:08:59.525Z" to "2023-10-28"
  function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleUsernameChange = () => {
    if (usernameStatus === "error") {
      setUsernameStatus("");
      setUsernameHelp("");
    }
  };
  const handleOk = () => {
    setIsCheck(true);
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  const displayModal = () => {
    setShowModal(true);
  };
  const handleIsCheck = () => {
    setIsCheck(!isCheck);
  }
  return (
    <div className={styles.splitContainerStyle}>
      <Modal title="Prediction Polls Use Agreement" open={showModal}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            I agree!
          </Button>,
        ]}
      >
        <div className={styles.ruleStyle}>
          <p>Welcome to <strong>Insight Arena</strong>, a dynamic platform dedicated to fostering a community of informed decision-makers through interactive polls and predictions.</p>
          <p>By creating an account with Insight Arena, I hereby acknowledge and agree to the following terms:</p>
          <p><strong>1. Privacy and Data Protection:</strong> I agree to the Privacy Policy of Insight Arena and consent to the collection and use of my personal information in accordance with KVKK regulations.</p>
          <p><strong>2. Conduct and Community Engagement:</strong> I commit to engaging with the community in a respectful and responsible manner. I understand that any violation of community standards may lead to account suspension or termination. I will participate in polls and share my opinions while upholding the standards of Prediction Polls.</p>
          <p><strong>3. Content Moderation:</strong> If I choose to act as a moderator, I agree to remain impartial and maintain the confidentiality of the poll processes. I confirm that I have selected at least one tag relevant to the poll and have not participated in that specific poll.</p>
          <p><strong>4. Points and Rewards:</strong> I understand that I will earn Domain Specific Points and General Points based on the accuracy of my predictions and my level of activity on the platform.
            I acknowledge that the rules governing the points system may change, and I agree to abide by any such amendments.</p>
          <p><strong>5. Intellectual Property:</strong> I agree that any content I post on Prediction Polls remains my intellectual property. By posting content, I grant Insight Arena a non-exclusive license to use this content within the platform.</p>
          <p><strong>6. Changes to Terms:</strong> I acknowledge that Prediction Polls may revise these terms at any time, and such changes will be effective upon posting on the platform or notification via email.</p>
          <p>By clicking "<strong>I Agree!</strong>" you affirm your understanding and commitment to these terms and the responsibilities of being a jury member. Your thoughtful and fair participation is crucial to maintaining the integrity and quality of our community's decision-making process.</p>
        </div>
      </Modal>
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
          <Form.Item>
            <div>
              <Button type="primary" className={styles.formButtonStyle}>
                <i
                  className={{ marginRight: "10px", fontFamily: "fab fa-google fa-1x" }}
                ></i>{" "}
                Sign Up with Google
              </Button>
            </div>
            <Divider className={styles.dividerStyle} orientation="center" plain>
              or
            </Divider>
          </Form.Item>
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
          <Form.Item
            label="USERNAME"
            name="username"
            validateStatus={usernameStatus}
            help={usernameHelp}
            rules={[
              {
                required: true,
                message: "Please enter your username!",
              },
            ]}
          >
            <Input
              required
              type="text"
              className={styles.formInputStyle}
              onChange={handleUsernameChange}
              placeholder="exampleUsername"
            />
          </Form.Item>
          <Form.Item
            label="PASSWORD"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters!",
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/,
                message:
                  "Password must include uppercase, lowercase, special character, and a number!",
              },
            ]}
          >
            <Input.Password
              required
              className={styles.formInputStyle}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item label="BIRTHDAY" name="birthday" htmlFor="birthday">
            <DatePicker
              id="birthday"
              className={styles.formDatePickerStyle}
              placeholder="01.01.2000"
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                checked: true,
                message: "Please check the terms of use",
              },
            ]}
          >
            <Checkbox
              name="agreement"
              checked={isCheck}
              onClick={handleIsCheck}
              required>
            </Checkbox>
            <span className={styles.agreementStyle} >
              I agree to the{" "}
              <Typography.Link onClick={displayModal}>
                platform terms.
              </Typography.Link>
            </span>
          </Form.Item>
          <Form.Item>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.formButtonStyle}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <div className={styles.displayCenterStyle}>
              I Have an Account
              <Link to="/auth/sign-in" style={{ paddingLeft: "10px" }}>
                Login
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

export default SignUp;
