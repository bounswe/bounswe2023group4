require('dotenv').config();
const jwt = require("jsonwebtoken");
const db = require("../repositories/AuthorizationDB.js");
const errorCodes = require("../errorCodes.js")

const bcrypt = require('bcrypt')

function homePage(req, res){
    res.status(200).json({"username":req.user.name,"key":"very-secret"});
  }

async function signup(req, res){
  const { username, password, email, birthday } = req.body;
  const { success, error} = await db.addUser( username, password, email, birthday );
  
  if(!success)  res.status(400).json({ code: errorCodes.REGISTRATION_FAILED.code, message: errorCodes.REGISTRATION_FAILED.message });
  else{res.status(201).send("Registration successful")};

  }

function createAccessTokenFromRefreshToken(req, res){
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.status(400).json({ code: errorCodes.REFRESH_TOKEN_NEEDED_ERROR.code, message: errorCodes.REFRESH_TOKEN_NEEDED_ERROR.message });
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json({ code: errorCodes.REFRESH_TOKEN_INVALID_ERROR.code, message: errorCodes.REFRESH_TOKEN_INVALID_ERROR.message })
      const accessToken = generateAccessToken({name : user.name, id : user.id});
      res.status(201).json({accessToken:accessToken});
    }) 
  }

async function logIn(req,res){
    // Authorize User  
    const username = req.body.username;
    const password = req.body.password;
    let [userAuthenticated] = await db.checkCredentials(username,password);
    if (!userAuthenticated) {
      res.status(401).json({ code: errorCodes.USER_NOT_FOUND.code, message: errorCodes.USER_NOT_FOUND.message });
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
      res.status(404).json({ code: errorCodes.REFRESH_TOKEN_NEEDED_ERROR.code, message: errorCodes.REFRESH_TOKEN_NEEDED_ERROR.message });
    }
}

function authorizeAccessToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(400).json({ code: errorCodes.ACCESS_TOKEN_NULL.code, message: errorCodes.ACCESS_TOKEN_NULL.message });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return  res.status(401).json({ code: errorCodes.ACCESS_TOKEN_INVALID_ERROR.code, message: errorCodes.ACCESS_TOKEN_INVALID_ERROR.message });

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