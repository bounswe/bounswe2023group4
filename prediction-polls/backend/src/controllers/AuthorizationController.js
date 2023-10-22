const express = require('express');
const service = require("../services/AuthorizationService");

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000;

app.get('/', service.authorizeAccessToken, service.homePage);

app.post('/token', service.createAccessTokenFromRefreshToken)

app.delete('/logout', service.logOut)

app.post("/login", service.logIn)

app.listen(PORT, service.startServer(PORT));

module.exports = app