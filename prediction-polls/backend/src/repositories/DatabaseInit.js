const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    queueLimit: 0,
    connectionLimit: 30
}).promise()

module.exports = {pool};