require('dotenv').config();
const jwt = require("jsonwebtoken");
const db = require("../repositories/AuthorizationDB.js");

const { checkCredentials, addUser } = require('./AuthenticationService.js');

const bcrypt = require('bcrypt')


function getGoogleOAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: process.env.PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
    client_id: process.env.PUBLIC_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  return rootUrl + "?" + qs.toString();
}

function homePage(req, res){
    const link = getGoogleOAuthURL()
    res.status(200).json({"username":req.user.name,"key":link});
  }

async function signup(req, res){
  console.log("Request Recieved");
  const { username, password, email, birthday } = req.body;
  const { success,error} = await addUser( username, password, email, birthday );
  
  if(!success)  res.status(400).send('Registration failed '+ error);
  else{res.status(201).send("Registration successful")};
    
  }

function createAccessTokenFromRefreshToken(req, res){
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.status(400).send('A refresh token is needed');
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).send('The refresh token is invalid')
      const accessToken = generateAccessToken({name : user.name});
      res.status(201).json({accessToken:accessToken});
    }) 
  }

async function logIn(req,res){
    // Authorize User  
    const username = req.body.username;
    const password = req.body.password;
    const user = {name : username};
    
    let userAuthenticated = await checkCredentials(username,password);
    console.log(userAuthenticated)
    if (!userAuthenticated) {
      res.status(401).send("Could not find a matching (username, email) - password tuple");
      return;
    }
    const accesToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    db.addRefreshToken(refreshToken);
    res.status(201).json({accessToken: accesToken, refreshToken: refreshToken})
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

module.exports = {homePage, signup, createAccessTokenFromRefreshToken, logIn, logOut, authorizeAccessToken}