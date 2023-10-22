const mysql = require('mysql2')

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

//Add the given refresh token to db
function addRefreshToken(refreshToken){

}

//Check the given refresh token's existence in db
function checkRefreshToken(refreshToken){

}

//Delete the given refresh token from db
function deleteRefreshToken(refreshToken){

}

module.exports = {pool, addRefreshToken,checkRefreshToken,deleteRefreshToken}