const qs = require("querystring");
const axios = require("axios");
const db = require("../repositories/AuthorizationDB.js");
const crypto = require('crypto');

const { generateAccessToken, generateRefreshToken } = require('./AuthorizationService.js');


async function googleLogIn(req,res){
    const googleId = req.body.googleId
    const code = req.body.code

    if(googleId){
      googleLogInWithGoogleId(googleId,res);
    }
    else if(code){
      googleLogInWithCode(code,res);
    }
    else{
      res.status(400).send("Invalid Body");
    }
}
  
async function googleLogInWithCode(code,res){
  
    try {
      // get the id and access token with the code
      const { error, id_token, access_token } = await getGoogleOAuthTokens({ code });
      if(error){return res.status(403).send("Invalid Code")}

      console.log({ id_token, access_token });
  
      // get user with tokens
      const googleUser = await getGoogleUser({ id_token, access_token });
      if(googleUser.error){return res.status(403).send(googleUser.error)}

      console.log(googleUser);
  
      if (!googleUser.verified_email) {
        return res.status(403).send("Google account is not verified");
      }

      generatedPassword = generateRandomPassword(12);
      addUser(googleUser.given_name,generatedPassword,googleUser.email,None);

      const user = {name : googleUser.name};
      const accesToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      db.addRefreshToken(refreshToken);
      res.json({accessToken: accesToken, refreshToken: refreshToken})
  
    } catch (error) {
      return res.status(500).send("Google Auth Failed");
    }
  }

  async function googleLogInWithGoogleId(googleId,res){
    try {
      const googleUser = await getGoogleIdTokenData(googleId)
      if(googleUser.error){return res.status(403).send("Invalid Google Id")}

      if (!googleUser.verified_email) {
        return res.status(403).send("Google account is not verified");
      }

      generatedPassword = generateRandomPassword(12);
      addUser(googleUser.given_name,generatedPassword,googleUser.email,None);

      const user = {name : googleUser.name};
      const accesToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      db.addRefreshToken(refreshToken);
      res.json({accessToken: accesToken, refreshToken: refreshToken})

    } catch (error) {
      return res.status(500).send("Google Auth Failed");
    }

  }
  
  async function getGoogleOAuthTokens({code}){
    const url = "https://oauth2.googleapis.com/token";
  
    const values = {
      code: code,
      client_id: process.env.googleClientId,
      client_secret: process.env.googleClientSecret,
      redirect_uri: process.env.googleOauthRedirectUrl,
      grant_type: "authorization_code",
    };
  
    //Making the request
    try {
      const res = await axios.post(
        url,
        qs.stringify(values),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return res.data;
    } catch (error) {
      return {"error":error.message};
    }
  }
  
  async function getGoogleUser({
    id_token,
    access_token,
  }) {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return {"error":error.message};
    }
  }

  async function getGoogleIdTokenData(google_id_token) {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${google_id_token}`
      );
      return res.data;
    } catch (error) {
      return {"error":error.message};
    }
  }

  function generateRandomPassword(length){
    const randomBytes = crypto.randomBytes(length);

    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(randomBytes[i] / 256 * charset.length);
      password += charset[randomIndex];
    }

  return password;
  }

module.exports = {googleLogIn,googleLogInWithGoogleId}