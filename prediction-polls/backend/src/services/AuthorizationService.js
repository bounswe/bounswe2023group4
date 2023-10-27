require('dotenv').config();
const jwt = require("jsonwebtoken");
const db = require("../repositories/AuthorizationDB.js");

const { checkCredentials } = require('./AuthenticationService.js');

const bcrypt = require('bcrypt')


function homePage(req, res){
    res.json({"username":req.user.name,"key":"very secret"});
  }

function signup(req, res){
  // Authorize User  
  const { username, password, email, birthday } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    // Store the user in the database
    const sql = 'INSERT INTO users (username, email, password, birthday) VALUES (?, ?, ?, ?)';
    const values = [username, email, password, birthday];

    //hashedPassword changes depending on time so it is not a great way to store passwords
    //const values = [username, email, hashedPassword, birthday];
  
    // Execute the SQL query to insert the user using mysql2
    const result = db.pool.query(sql, values).then(() => {
      res.send('Registration successful');
    }, (err) => {
        res.send('Registration failed: '+ err);
      }
    );
  });
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

module.exports = {homePage, signup, createAccessTokenFromRefreshToken, logIn, logOut, authorizeAccessToken}