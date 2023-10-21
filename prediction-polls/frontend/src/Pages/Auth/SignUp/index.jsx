import React from 'react';
import { Button, Input, Form, DatePicker, Checkbox, Typography} from 'antd';
import { Link } from 'react-router-dom';

function SignUp() {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', 
  };

  const splitContainerStyle = {
    display: 'flex',
    width: '80%', 
    margin: '0 auto',
  };

  const imageContainerStyle = {
    flex: 1,
    paddingRight: '20px', 
  };

  const formContainerStyle = {
    flex: 1,
    paddingLeft: '20px', 
  };

  const formItemLayout = { // to put text above input areas
    labelCol: {
      span: 24, 
    },
    wrapperCol: {
      span: 24,
    },
  };

  return (
    <div style={containerStyle}>
      <div style={splitContainerStyle}>
        <div style={imageContainerStyle}>
          {/* Our sign up image from mock-up */}
          <img
            src="https://cdn.discordapp.com/attachments/887354522324852759/1165272221317611551/image.png?ex=65463f53&is=6533ca53&hm=7d6045db42bbb9a68f7cf30241535ded3c6caefb8ddc9c26001781c75bf064a6&"
            alt="Sign-Up Image"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div style={formContainerStyle}>
          <h1>Prediction Polls</h1>
          <Form {...formItemLayout}>
          <Form.Item>
              <div>
              <Button type="default" style={{ width: '100%', marginBottom: '10px' }}>
                Sign Up with Google
              </Button>
              </div>
            </Form.Item>
            <Form.Item label="EMAIL ADDRESS">
              <Input type="email" placeholder="example@outlook.com" />
            </Form.Item>
            <Form.Item label="USERNAME">
              <Input placeholder="exampleUsername" />
            </Form.Item>
            <Form.Item label="PASSWORD">
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item label="BIRTHDAY">
              <DatePicker style={{ width: '100%' }} placeholder="01.01.2000" />
            </Form.Item>
            <Form.Item>
              <Checkbox>
                I agree to the{' '} 
                <Typography.Link href="HERE GOES THE LINK">platform terms.</Typography.Link> 
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%', marginBottom: '10px' }}>
                Sign Up
              </Button>
            </Form.Item>
            <Form.Item>
              <div>
                <Link to="/home">
                  <Button type="default">Go to Home Page</Button>
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

