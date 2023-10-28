require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const qs = require("querystring");
const axios = require("axios")

const db = require("../repositories/AuthorizationDB.js");
const { checkCredentials,addUser } = require('./AuthenticationService.js');



function homePage(req, res){
    res.json({"username":req.user.name,"key":"very secret"});
  }

function signup(req, res){
  // Authorize User  
  const { username, password, email, birthday } = req.body;
  addUser( username, password, email, birthday );
  
}

async function googleLogIn(req,res){
  const code = req.query.code;

  try {
    // get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });
    console.log({ id_token, access_token });

    // get user with tokens
    const googleUser = await getGoogleUser({ id_token, access_token });

    console.log({ googleUser });

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }

    const user = {name : googleUser.name};
    const accesToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    db.addRefreshToken(refreshToken);
    res.json({accessToken: accesToken, refreshToken: refreshToken})

  } catch (error) {
    console.log(error, "Failed to authorize Google user");
    return res.redirect("http://localhost:3000/login");
  }
}

async function getGoogleOAuthTokens(code){
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.googleClientId,
    client_secret: process.env.googleClientSecret,
    redirect_uri: process.env.googleOauthRedirectUrl,
    grant_type: "authorization_code",
  };

  //Making the request
  try {
    const res = await axios.post<GoogleTokensResult>(
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
    console.error(error.response.data.error);
    log.error(error, "Failed to fetch Google Oauth Tokens");
    throw new Error(error.message);
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
    log.error(error, "Error fetching Google user");
    throw new Error(error.message);
  }
}

function createAccessTokenFromRefreshToken(req, res){
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({name : user.name});
      res.json({accessToken:accessToken});
    }) 
  }

async function logIn(req,res){
    // Authorize User  
    const username = req.body.username;
    const password = req.body.password;
    const user = {name : username};
    
    let userAuthenticated = await checkCredentials(username,password);
    if (!userAuthenticated) return res.sendStatus(401);

    const accesToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    db.addRefreshToken(refreshToken);
    res.json({accessToken: accesToken, refreshToken: refreshToken})
}

function logOut(req, res) {
    if (db.checkRefreshToken(req.body.token)){
      db.deleteRefreshToken(req.body.token);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
}

function authorizeAccessToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return  res.sendStatus(403);
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

module.exports = {homePage, signup, createAccessTokenFromRefreshToken, logIn, logOut, authorizeAccessToken, googleLogIn}