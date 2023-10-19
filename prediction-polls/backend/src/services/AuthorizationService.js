require('dotenv').config();
const jwt = require("jsonwebtoken");

function homePage(req, res){
    res.json({"username":req.user.name,"key":"very secret"});
  }

function createAccessTokenFromRefresh(req, res){
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({name : user.name});
      res.json({accessToken:accessToken});
    }) 
  }

function logIn(req,res){
    // Authenticate User  
    const username = req.body.username;
    const user = {name : username};
    
    const accesToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    res.json({accessToken: accesToken, refreshToken: refreshToken})
}

function logOut(req, res) {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
}

function authenticateToken(req, res, next) {
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

function startServer(port) {
    console.log(`Server is running on http://localhost:${port}`);
}

module.exports = {homePage,createAccessTokenFromRefresh,logIn,logOut,authenticateToken,startServer}