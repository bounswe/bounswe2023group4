import React from "react";
import {
  Button,
  Input,
  Form,
  DatePicker,
  Checkbox,
  Typography,
  Divider,
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

      const res = await fetch(process.env.REACT_APP_BACKEND_LINK + "/signup", {
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

  return (
    <div className={styles.splitContainerStyle}>
      <div className={styles.formContainerStyle}>
        <Link to="/home" className={styles.logoStyle}>
          <Logo />
        </Link>
        <Form
          style=
          {[{ labelCol: { span: 24 }}, {wrapperCol: { span: 24 } }]}
          form={form}
          onFinish={handleSubmit}
          validateTrigger="onSubmit"
        >
          <Form.Item>
            <div>
              <Button type="primary" className={styles.formButtonStyle}>
                <i
                  //className="fab fa-google fa-1x"
                  style={{ marginRight: "10px" }}
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
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Password must include uppercase, lowercase, and a number!",
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
              style={styles.formDatePickerStyle}
              placeholder="01.01.2000"
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
          >
            <Checkbox required>
              I agree to the{" "}
              <Typography.Link href="HERE GOES THE LINK">
                platform terms.
              </Typography.Link>
            </Checkbox>
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
              <Link to="/auth/sign-in" style={{ marginLeft: "10px" }}>
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
