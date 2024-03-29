const qs = require("querystring");
const axios = require("axios");
const db = require("../repositories/AuthorizationDB.js");
const profileDb = require("../repositories/ProfileDB.js");
const crypto = require('crypto');
const errorCodes = require("../errorCodes.js");


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
      res.status(400).send({error:errorCodes.GOOGLE_LOGIN_BODY_EMPTY});
    }
}
  
async function googleLogInWithCode(code,res){
  
    try {
      // get the id and access token with the code
      const { token_error, id_token, access_token } = await getGoogleOAuthTokens({ code });
      if(token_error){return res.status(403).json({error:errorCodes.GOOGLE_LOGIN_INVALID_GOOGLE_CODE}) };
  
      // get user with tokens
      const googleUser = await getGoogleUser({ id_token, access_token });
      if(googleUser.error){return res.status(403).json({error:errorCodes.GOOGLE_LOGIN_INVALID_GOOGLE_CODE}) };
  
      if (!( googleUser.verified_email || googleUser.email_verified)) {
        return res.status(403).json({error:errorCodes.GOOGLE_LOGIN_NONVERIFIED_GOOGLE_ACCOUNT});
      }

      const email_exists = await db.findUser({email:googleUser.email})

      let user = {};

      if (email_exists.error){
        //This means that the given email is not in use so we will create a new user
        const generatedPassword = generateRandomPassword(12);
        const {error, userId} = await db.addUser(googleUser.given_name,generatedPassword,googleUser.email,null);
        if(error){
          return res.status(400).send({error:errorCodes.REGISTRATION_FAILED});
        }

        const result = await profileDb.addProfile(userId,googleUser.given_name,googleUser.email);
        if(!result.profileId){
          return res.status(400).send({error:errorCodes.REGISTRATION_FAILED});
        }

        user = {name : googleUser.given_name, id: userId};
      }
      else{
        // The given email was found so we will use that user
        user = {name : email_exists.username, id: email_exists.id};
      }

      const accesToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      db.addRefreshToken(refreshToken);
      res.json({accessToken: accesToken, refreshToken: refreshToken, username:user.name})
  
    } catch (error) {
      return res.status(500).json({error:errorCodes.GOOGLE_LOGIN_FAILED});
    }
  }

  async function googleLogInWithGoogleId(googleId,res){
    try {
      const googleUser = await getGoogleIdTokenData(googleId)
      if(googleUser.error){return res.status(403).json({error:errorCodes.GOOGLE_LOGIN_INVALID_GOOGLEID})}

      if (!( googleUser.verified_email || googleUser.email_verified)) {
        return res.status(403).json({error:errorCodes.GOOGLE_LOGIN_NONVERIFIED_GOOGLE_ACCOUNT});
      }


      const email_exists = await db.findUser({email:googleUser.email})

      let user = {};

      if (email_exists.error){
        //This means that the given email is not in use so we will create a new user
        const generatedPassword = generateRandomPassword(12);
        const {error, userId} = await db.addUser(googleUser.given_name,generatedPassword,googleUser.email,null);
        if(error){
          return res.status(400).send({error:errorCodes.REGISTRATION_FAILED});
        }
        // Implement rollback when fail
        const result = await profileDb.addProfile(userId,googleUser.given_name,googleUser.email);
        if(!result.profileId){
          return res.status(400).send({error:errorCodes.REGISTRATION_FAILED});
        }

        user = {name : googleUser.given_name, id: userId};
      }
      else{
        // The given email was found so we will use that user
        user = {name : email_exists.username, id: email_exists.id};
      }

      const accesToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      db.addRefreshToken(refreshToken);
      res.json({accessToken: accesToken, refreshToken: refreshToken, username:user.name})

    } catch (error) {
      return res.status(500).json({error:errorCodes.GOOGLE_LOGIN_FAILED});
    }

  }
  
  async function getGoogleOAuthTokens({code}){
    const url = "https://oauth2.googleapis.com/token";
  
    const values = {
      code: code,
      client_id: process.env.googleClientId,
      client_secret: process.env.googleClientSecret,
      redirect_uri: process.env.googleOAuthRedirectUrl,
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
      return {token_error:error};
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
      return {error:error};
    }
  }

  async function getGoogleIdTokenData(google_id_token) {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${google_id_token}`
      );
      return res.data;
    } catch (error) {
      return {error:error};
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