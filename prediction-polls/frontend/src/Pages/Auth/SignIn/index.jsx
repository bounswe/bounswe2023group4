import React from 'react';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
const main_body = {
  position: 'absolute',
  backgroundColor: 'blue',
  display: 'flex',
  flexDirection: 'row',
  borderColor: 'blue',
  borderWidth: '2px',
  borderStyle: 'solid',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
};
const info_txt = {
  fontWeight: 1000,
  fontSize: 22,
  fontFamily: 'Times New Roman',
  marginTop: '5%',
  marginBottom: '5%',
};
const add_txt = {
  fontWeight: 1000,
  fontSize: 16,
  fontFamily: 'Times New Roman',
  marginTop: '5%',
  marginBottom: '5%',
  color: 'white',
  fontWeight: 600,
};
const text_area = {
  width: '100%',
  height: '8%',
  fontSize: 22,
  fontFamily: 'Times New Roman',
  backgroundColor: 'white'
};
const sub_column_1 = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  width: '30%',
  height: '80%',
  marginLeft: '10%',
  marginTop: '5%',
  marginBottom: '5%',
};
const sub_column_2 = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '15%',
  height: '80%',
  marginLeft: '5%',
  marginTop: '3%',
  marginBottom: '5%',
};
const sub_column_3 = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  paddingTop: '11%',
  width: '30%',
  height: '100%',
  marginLeft: '2%',
};
const submit_button = {
  borderColor: 'black',
  backgroundColor: 'white',
  color: 'black',
  borderStyle: 'solid',
  borderWidth: '5%',
  width: '100%',
  height: '10%',
  marginTop: '10%',
  fontWeight: 700
};

const google_button = {
  display: 'flex',
  paddingLeft: '5%',
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: 'black',
  backgroundColor: 'white',
  color: 'black',
  borderStyle: 'solid',
  borderWidth: '5%',
  width: '100%',
  height: '10%',
  marginTop: '10%',
  fontWeight: 700,
};

const vertical_Line = {
  width: '0%',
  height: '30%',
  borderColor: 'white',
  borderStyle: 'solid',
  borderWidth: '1%',
  marginBottom: '10%',
  marginTop: '10%'
};
const sign_in_with_google = {
  marginLeft: '25%'
};
function SignIn() {
  return (
    <html>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"></link>
      <body style={main_body}>
        <div style={sub_column_1}>
          <p style={info_txt}>Email Address</p>
          <Input style={text_area}></Input>
          <p style={info_txt}>Password</p>
          <Input style={text_area}></Input>
          <Button style={submit_button}>LOG IN</Button>
        </div>
        <div style={sub_column_2}>
          <div style={vertical_Line}></div>
          <p style={add_txt}>OR</p>
          <div style={vertical_Line}></div>
          <p style={add_txt}>CAN'T LOG IN?</p>
        </div>
        <div style={sub_column_3}>
          <Button style={google_button}><i class="fab fa-google fa-1x"></i>
            <p style={sign_in_with_google}> Sign in with Google </p>
          </Button>
        </div>

      </body>

    </html >
  );
}

export default SignIn;
