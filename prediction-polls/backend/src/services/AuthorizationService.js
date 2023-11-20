require('dotenv').config();
const jwt = require("jsonwebtoken");
const db = require("../repositories/AuthorizationDB.js");

const { checkCredentials, addUser, isUsernameOrEmailInUse, createTransporter } = require('./AuthenticationService.js');

const bcrypt = require('bcrypt')
const { saveEmailVerificationToken } = require('../repositories/AuthorizationDB.js');

function homePage(req, res){
    res.status(200).json({"username":req.user.name,"key":"very-secret"});
  }

  async function signup(req, res) {
    const { username, password, email, birthday } = req.body;

    // Email validation
    if (!isValidEmail(email)) {
        return res.status(400).send('Invalid email format');
    }

    // Birthday validation
    if (!isValidBirthday(birthday)) {
        return res.status(400).send('Invalid or unreasonable birthday');
    }

    // Check if username or email is in use
    const { usernameInUse, emailInUse, error } = await isUsernameOrEmailInUse(username, email);
    
    if (error) {
        return res.status(500).send('Internal server error');
    }

    if (usernameInUse) {
        return res.status(400).send('Username is already in use');
    }

    if (emailInUse) {
        return res.status(400).send('Email is already in use');
    }

    // Validate password
    if (!isValidPassword(password)) {
        return res.status(400).send('Password does not meet the required criteria');
    }
    const verificationToken = generateVerificationToken();
    await saveEmailVerificationToken(username, verificationToken);
    await sendVerificationEmail(email, verificationToken);
    // Attempt to add user
    const { success, error: addUserError } = await addUser(username, password, email, birthday);

    if (!success) {
        return res.status(400).send('Registration failed: ' + addUserError);
    } else {
        res.status(201).send("Registration successful");
    }
}
async function sendVerificationEmail(email, token) {
  const transporter = createTransporter();
  const verificationUrl = `http://ec2-3-78-169-139.eu-central-1.compute.amazonaws.com:3000/verify-email?token=${token}`;

  const mailOptions = {
      from: '"Prediction Polls" <predictionpolls@zohomail.eu>',
      to: email,
      subject: 'Email Verification',
      html: `<p>Please verify your email by clicking on the link: <a href="${verificationUrl}">${verificationUrl}</a></p>`
  };

  try {
      await transporter.sendMail(mailOptions);
  } catch (error) {
      console.error("Error sending email: ", error);
      // Handle email sending error
  }
}
const crypto = require('crypto');

function generateVerificationToken() {
    return crypto.randomBytes(20).toString('hex');
}
  
  function isValidPassword(password) {
    const lower = /[a-z]/;
    const upper = /[A-Z]/;
    const number = /[0-9]/;
    const special = /[!@#$%^&*]/;
  
    let count = 0;
    if (lower.test(password)) count++;
    if (upper.test(password)) count++;
    if (number.test(password)) count++;
    if (special.test(password)) count++;
  
    return password.length >= 8 && count >= 3;
  }

function isValidBirthday(birthday) {
    const date = new Date(birthday);
    const now = new Date();
    // Check if birthday is a valid date and if the date is in the past
    return date instanceof Date && !isNaN(date) && date < now;
  }

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }
    
function createAccessTokenFromRefreshToken(req, res){
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.status(400).send('A refresh token is needed');
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).send('The refresh token is invalid')
      const accessToken = generateAccessToken({name : user.name, id : user.id});
      res.status(201).json({accessToken:accessToken});
    }) 
  }

async function logIn(req,res){
    // Authorize User  
    const username = req.body.username;
    const password = req.body.password;
    let [userAuthenticated] = await checkCredentials(username,password);
    if (!userAuthenticated) {
      res.status(401).send("Could not find a matching (username, email) - password tuple");
      return;
    }

    const user = {name : username, id: userAuthenticated.id};
    const accesToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    db.addRefreshToken(refreshToken);
    res.status(201).json({accessToken: accesToken, refreshToken: refreshToken})
}

async function logOut(req, res) {
    const token = req.body.refreshToken;
    const tokenDeleted = await db.deleteRefreshToken(token);
    if (tokenDeleted){
      res.status(204).send("Token deleted successfully");
    } else {
      res.status(404).send("Refresh token not found");
    }
}

function authorizeAccessToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(400);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return  res.status(401).send('The access token is invalid');

      req.user = user;
      next();
    })
}

function generateAccessToken(user) {
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
}

function generateRefreshToken(user) {
  return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {homePage, signup, createAccessTokenFromRefreshToken, logIn, 
  logOut, authorizeAccessToken, generateAccessToken, generateRefreshToken}