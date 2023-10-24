import React from 'react';
import { Button, Input, Form, DatePicker, Checkbox, Typography, Divider} from 'antd';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from "../../../Assets/Logo.svg";
import { ReactComponent as SignPageAnimation } from "../../../Assets/SignPageAnimation.svg";
import '../../../index.css';

function SignUp() {

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
    display: 'flex' ,
    alignItems: 'center' ,
    justifyContent: 'center'
  }

  const formInputStyle = {
    padding: '10px 5px',
    width: '100%' ,
  }

  const formButtonStyle = {
    ...displayCenterStyle,
    padding: '22px 0px',
    width: '100%' ,
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
          <Logo/>
          </Link>
          <Form {...formItemLayout}>
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
            <Form.Item label="EMAIL ADDRESS">
              <Input type="email" style={formInputStyle}  placeholder="example@outlook.com" />
            </Form.Item>
            <Form.Item label="USERNAME">
              <Input style={formInputStyle} placeholder="exampleUsername" />
            </Form.Item>
            <Form.Item label="PASSWORD">
              <Input.Password style={formInputStyle} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item label="BIRTHDAY">
              <DatePicker  style={formDatePickerStyle} placeholder="01.01.2000" />
            </Form.Item>
            <Form.Item>
              <Checkbox>
                I agree to the{' '} 
                <Typography.Link href="HERE GOES THE LINK">platform terms.</Typography.Link> 
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <div>
                <Button type="primary"  htmlType="submit" style={formButtonStyle}>
                Sign Up
              </Button>
              </div>
            </Form.Item>
            <Form.Item>
              <div style={displayCenterStyle}>
                I Have an Account
                <Link 
                  to="/auth/sign-in" 
                  style={{ marginLeft: '10px'}}>
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

