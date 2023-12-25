require('dotenv').config();
const jwt = require("jsonwebtoken");
const db = require("../repositories/AuthorizationDB.js");
const profileDb = require("../repositories/ProfileDB.js");
const errorCodes = require("../errorCodes.js")
const moment = require('moment');

const bcrypt = require('bcrypt')

function homePage(req, res){
    res.status(200).json({"username":req.user.name,"key":"very-secret"});
  }

async function signup(req, res) {
  const { username, password, email, birthday } = req.body;

  // Email validation
  if (!isValidEmail(email)) {
      return res.status(400).json({error:errorCodes.INVALID_EMAIL});
  }

  // Birthday validation
  if (birthday && !isValidBirthday(birthday)) {
      return res.status(400).json({error:errorCodes.INVALID_DATE});

  }

  // Check if username or email is in use
  const { usernameInUse, emailInUse, error } = await db.isUsernameOrEmailInUse(username, email);
  
  if (error) {
      return res.status(500).json({error:errorCodes.DATABASE_ERROR});
  }

  if (usernameInUse) {
      return res.status(400).json({error:errorCodes.USERNAME_ALREADY_EXISTS});
  }

  if (emailInUse) {
      return res.status(400).json({error:errorCodes.USERNAME_ALREADY_EXISTS});
  }

  // Validate password
  if (!isValidPassword(password)) {
      return res.status(400).json({error:errorCodes.INVALID_PASSWORD});
  }
  // Attempt to add user
  const { userId, error: addUserError } = await db.addUser(username, password, email, birthday);
  if (error) {
    return res.status(400).json({error:errorCodes.REGISTRATION_FAILED});
  }

  const result = await profileDb.addProfile(userId,username,email);
  if(!result.profileId){
    return res.status(400).json({error:errorCodes.REGISTRATION_FAILED});
  }

  const verificationToken = generateVerificationToken();
  await db.saveEmailVerificationToken(userId, verificationToken);
  await sendVerificationEmail(email, verificationToken);

  res.status(201).json({status:"success"});
  
}

async function sendVerificationEmail(email, token) {
  const transporter = db.createTransporter();
  const verificationUrl = `http://ec2-3-78-169-139.eu-central-1.compute.amazonaws.com:3000/auth/verify-email?token=${token}`;

  const mailOptions = {
      from: '"Prediction Polls" <predictionpolls@zohomail.eu>',
      to: email,
      subject: 'Email Verification',
      html: `<p>Please verify your email by clicking on the link: <a href="${verificationUrl}">${verificationUrl}</a></p>`
  };

  try {
      await transporter.sendMail(mailOptions);
  } catch (error) {
      return {error:errorCodes.INTERNAL_SERVER_ERROR};
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
    if (refreshToken == null) return res.status(400).json({ error: errorCodes.REFRESH_TOKEN_NEEDED_ERROR});
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json({ error: errorCodes.REFRESH_TOKEN_INVALID_ERROR })
      const accessToken = generateAccessToken({name : user.name, id : user.id});
      res.status(201).json({accessToken:accessToken});
    }) 
  }

async function logIn(req,res){
    // Authorize User  
    const username = req.body.username;
    const password = req.body.password;
    try {
      let [userAuthenticated] = await db.checkCredentials(username,password);
      if (!userAuthenticated) {
        return res.status(401).json({ error: errorCodes.USER_NOT_FOUND });
      }

      const user = {name : username, id: userAuthenticated.id};
      const accesToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      await db.addRefreshToken(refreshToken);
      
      const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
      await db.updateUserLastLogin(userAuthenticated.id,currentDate);
      return res.status(201).json({accessToken: accesToken, refreshToken: refreshToken})

    } catch (error) {
        return res.status(401).json({ error: errorCodes.USER_NOT_FOUND });
    }

}

async function logOut(req, res) {
    const token = req.body.refreshToken;
    const tokenDeleted = await db.deleteRefreshToken(token);
    if (tokenDeleted){
      res.status(204).send("Token deleted successfully");
    } else {
      res.status(404).json({ error: errorCodes.REFRESH_TOKEN_INVALID_ERROR });
    }
}

function authorizeAccessToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(400).json({ error: errorCodes.ACCESS_TOKEN_NEEDED_ERROR});
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return  res.status(401).json({ error: errorCodes.ACCESS_TOKEN_INVALID_ERROR });

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

async function verifyEmail(req, res){
  const token = req.query.token;

  try {
      // Verify the token and update the user's email_verified status in the database
      const verificationSuccessful = await db.verifyEmailToken(token);

      if (verificationSuccessful) {
          res.send('Email successfully verified');
      } else {
          res.status(400).send('Invalid or expired verification token');
      }
  } catch (error) {
      console.error("Error during email verification:", error);
      res.status(500).send('Internal server error');
  }
}

function generatePasswordResetToken() {
  return new Promise((resolve, reject) => {
      crypto.randomBytes(20, (err, buffer) => {
          if (err) {
              reject(err);
          } else {
              resolve(buffer.toString('hex'));
          }
      });
  });
}
// Function to send password reset email
async function sendPasswordResetEmail(email, token) {
  const transporter = db.createTransporter();
  const resetUrl  = `http://ec2-3-78-169-139.eu-central-1.compute.amazonaws.com:3000/auth/reset-password?token=${token}`;

  try {
    await transporter.sendMail({
        from: '"Prediction Polls" <predictionpolls@zohomail.eu>', // Update this
        to: email,
        subject: 'Password Reset Request',
        html: `
            <p>You requested a password reset for your account.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>If you did not request a password reset, please ignore this email.</p>
        `
    });

    console.log('Password reset email sent successfully.');
} catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
}
}



async function resetPassword(token, newPassword) {
    try {
        // Validate the token and get user details
        const user = await db.getUserByResetToken(token);
        if (!user) {
            throw new Error('Invalid or expired password reset token.');
        }

        // Check if the token is expired
        if (new Date() > new Date(user.reset_token_expires)) {
            throw new Error('Password reset token has expired.');
        }
        // Update the user's password in the database
        await db.updateUserPassword(user.id, newPassword);

        // Clear the reset token from the database
        await db.clearResetToken(user.id);

        console.log('Password reset successfully.');
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
}
async function requestResetPassword (req, res){
  try {
      const { email } = req.body;
      const user = await db.findUser({email});

      if (user) {
          const token = await generatePasswordResetToken();
          const expiresIn = 360;
          await db.storePasswordResetToken(user.id, token, expiresIn);
          // Store the token in the database (functionality not shown here)
          await sendPasswordResetEmail(email, token);
      }

      // Respond with a generic message either way to avoid enumeration attacks
      res.send('If your email is in our system, you will receive a password reset link.');
  } catch (error) {
      console.error('Password reset request error:', error);
      res.status(500).send('Error processing password reset request.');
  }
};
module.exports = {homePage, signup, createAccessTokenFromRefreshToken, logIn, 
  logOut, authorizeAccessToken, generateAccessToken, generateRefreshToken, verifyEmail, sendPasswordResetEmail, resetPassword, requestResetPassword}