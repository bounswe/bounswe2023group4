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
      } else {
        console.error('Birthday is not a moment object');
      }
    } else {
      formattedValues.birthday = undefined; 
    }

      const res = await fetch("http://3.70.206.103:8000/signup", {
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
      console.error(err);
      //setMessage("An error occurred. Please try again later.");
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

  const splitContainerStyle = {
    display: "flex",
    width: "100%",
    margin: "0 auto",
    height: "100vh",
  };

  const animationStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
  };

  const displayCenterStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const formInputStyle = {
    padding: "5px 5px",
    width: "100%",
  };

  const formButtonStyle = {
    ...displayCenterStyle,
    padding: "22px 0px",
    width: "100%",
    opacity: "0.85",
  };

  const dividerStyle = {
    color: "rgba(22, 119, 255, 0.4)",
    borderColor: "rgba(22, 119, 255, 0.2)",
    margin: "8px 0px 8px 0px",
  };

  const formDatePickerStyle = {
    ...formInputStyle,
    width: "100%",
  };

  const imageContainerStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(#EAF3FB, #BEDAF4)",
  };

  const formContainerStyle = {
    flex: 1,
    paddingLeft: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
        <Form
          {...formItemLayout}
          form={form}
          onFinish={handleSubmit}
          validateTrigger="onSubmit"
        >
          <Form.Item>
            <div>
              <Button type="primary" style={formButtonStyle}>
                <i
                  className="fab fa-google fa-1x"
                  style={{ marginRight: "10px" }}
                ></i>{" "}
                Sign Up with Google
              </Button>
            </div>
            <Divider style={dividerStyle} orientation="center" plain>
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
              style={formInputStyle}
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
              style={formInputStyle}
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
              style={formInputStyle}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item label="BIRTHDAY" name="birthday">
            <DatePicker
              style={formDatePickerStyle}
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
                style={formButtonStyle}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <div style={displayCenterStyle}>
              I Have an Account
              <Link to="/auth/sign-in" style={{ marginLeft: "10px" }}>
                Login
              </Link>
            </div>
          </Form.Item>
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
