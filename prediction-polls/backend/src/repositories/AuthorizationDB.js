const mysql = require('mysql2')

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

//Add the given refresh token to db
async function addRefreshToken(token){
    const sql = 'INSERT INTO refresh_tokens (token) VALUES (?)';
    const values = [token];

    return pool.query(sql, values).then(() => {
        return true
    }, () => {
        return false
    })
}

//Check the given refresh token's existence in db
async function checkRefreshToken(token){
    const sql = 'SELECT * FROM refresh_tokens WHERE token = "?"';
    const values = [token];

    return pool.query(sql, values).then(([rows]) => {
        return rows.length > 0;
    }, () => {
        return false
    })
}

//Delete the given refresh token from db
async function deleteRefreshToken(token){
    const sql = 'DELETE FROM refresh_tokens WHERE token = ?';

    const values = [token];

    const [result] = await pool.query(sql, values);
    return result.affectedRows > 0;
}

async function saveEmailVerificationToken(userId, token) {
    const sql = 'UPDATE users SET email_verification_token = ? WHERE id = ?';
    const values = [token, userId];

    return pool.query(sql, values);
}

async function verifyEmail(token) {
    const sql = 'UPDATE users SET email_verified = TRUE WHERE email_verification_token = ?';
    const values = [token];

    return pool.query(sql, values);
}

module.exports = {pool, addRefreshToken,checkRefreshToken,deleteRefreshToken,saveEmailVerificationToken,verifyEmail}