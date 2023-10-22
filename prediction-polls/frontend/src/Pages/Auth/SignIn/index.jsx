import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
const bodyStyle = {
  position: "Absolute",
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
};

const columnStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  height: '100%',
  textAlign: 'center',
}

const imageStyle = {
  width: '50%',
  height: '100%',
}
const predictionPollStyle = {
  fontFamily: "Times New Roman",
  fontSize: 34,
  fontWeight: 1000,
  marginTop: '5%',
  marginBottom: '5%',
}

const signinWithGoogle = {
  display: 'flex',
  paddingLeft: '8%',
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: 'black',
  backgroundColor: 'blue',
  color: 'black',
  borderStyle: 'solid',
  borderWidth: '5%',
  width: '60%',
  height: '8%',
  marginBottom: '5%',
  marginLeft: '20%',
  fontWeight: 500,
  color: 'white',
}
const signinwithGoogleText = {
  marginLeft: '22%',
  fontSize: 18,
}
const separator = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}
const horizontalLine = {
  width: '30%',
  height: '0%',
  color: 'blue',

}
const orFormat = {
  color: 'blue',
  fontWeight: 700,
}

const formFomat = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingLeft: '20%',
  width: '60%',
  height: '45%',
}
const textArea = {
  width: '120%',
  height: '100%',
  fontSize: 22,
  fontFamily: 'Times New Roman',
  marginTop: '3%',
  marginBottom: '3%',
}
const labelFormat = {
  width: '120%',
  textAlign: 'left',
  fontWeight: 600,
  fontSize: 18,
}
const forgotPassword = {
  width: '120%',
  textAlign: 'right',
  fontWeight: 600,
  fontSize: 14
}

const logIn = {
  height: '10%',
  width: '72%',
  fontWeight: 500,
  textAlign: 'center',
  alignItems: 'center',
  backgroundColor: 'blue',
  color: 'white',
  marginLeft: '14%'
}
const cantLoginFormat = {
  fontWeight: 600,
  fontSize: 18
}
function SignIn() {
  return (
    <body>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"></link>
      <div style={bodyStyle}>
        <div style={columnStyle}>
          <p style={predictionPollStyle}>Prediction Poll</p>
          <Button style={signinWithGoogle}><i class="fab fa-google fa-1x"></i>
            <p style={signinwithGoogleText}> Sign in with Google </p></Button>
          <div style={separator}>
            <hr style={horizontalLine} />
            <p style={orFormat}>OR</p>
            <hr style={horizontalLine} /></div>
          <div style={formFomat}>
            <label style={labelFormat}>EMAIL ADDRESS</label>
            <Input style={textArea} type="email" placeholder="example@outlook.com" />
            < label style={labelFormat}>PASSWORD</label>
            <Input style={textArea} placeholder="*****************" />
            <p style={forgotPassword}>FORGOT PASSWORD?</p>
          </div>
          <Button style={logIn}>LOG IN</Button>
          <p style={cantLoginFormat}>CAN'T LOG IN?</p>
        </div>
        <div style={imageStyle}>
          <img
            src="https://cdn.discordapp.com/attachments/887354522324852759/1165272221317611551/image.png?ex=65463f53&is=6533ca53&hm=7d6045db42bbb9a68f7cf30241535ded3c6caefb8ddc9c26001781c75bf064a6&"
            alt="Sign-Up Image"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </body>
  );
}

export default SignIn;
