const mysql = require('mysql2')
const errorCodes = require("../errorCodes.js")

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) reject(err);
            resolve(hashedPassword);
        });
    });
}

async function checkCredentials(username, password) {
    try {
        /* We want to store our passwords hashed in the db But currently 
         * our hashing function does not return the same hashed password
         * for the same password value. This creates an issue with verification.
         */

        // const hashedPassword = await hashPassword(password);

        const sql = 'SELECT * FROM users WHERE (username = ? || email = ?) && password = ?';
        const values = [username, username, password];

        const [rows] = await pool.query(sql, values);
        return rows;
    } catch (error) {
        throw {error:errorCodes.WRONG_PASSWORD};
    }
}

async function addUser(username, password,email,birthday){
    try {
        /* We want to store our passwords hashed in the db But currently 
         * our hashing function does not return the same hashed password
         * for the same password value. This creates an issue with verification.
         */
        // const hashedPassword = await hashPassword(password);
    
        // Store the user in the database
        const sql = 'INSERT INTO users (username, email, password, birthday) VALUES (?, ?, ?, ?)';
        const values = [username, email, password, birthday];
    
        const [result] = await pool.query(sql, values);

        return {userId: result.insertId} ;
      } catch (error) {
        return {error:error} ;
      }
  }


async function findUser({userId,username,email}){
    try{
        if(userId){
            const sql = 'SELECT * FROM users WHERE id = ?';
        
            const [result] = await pool.query(sql, [userId]);
            if(result.length == 0){
                throw {error:errorCodes.USER_NOT_FOUND_WITH_USERID}
            }
            return result[0];
        }

        if(username){
            const sql = 'SELECT * FROM users WHERE username = ?';
        
            const [result] = await pool.query(sql, [username]);
            if(result.length == 0){
                throw {error:errorCodes.USER_NOT_FOUND_WITH_USERNAME}
            }
            return result[0];
        }
        if(email){
            const sql = 'SELECT * FROM users WHERE email = ?';
        
            const [result] = await pool.query(sql, [email]);
            if(result.length == 0){
                throw {error:errorCodes.USER_NOT_FOUND_WITH_EMAIL}
            }
            return result[0];
        }
        throw {error:errorCodes.USER_NOT_FOUND}
    } catch(error){
        return error
    }
}

async function isUsernameOrEmailInUse(username, email) {
    try {
        const usernameSql = 'SELECT 1 FROM users WHERE username = ?';
        const [usernameRows] = await pool.query(usernameSql, [username]);

        const emailSql = 'SELECT 1 FROM users WHERE email = ?';
        const [emailRows] = await pool.query(emailSql, [email]);

        const isUsernameInUse = usernameRows.length > 0;
        const isEmailInUse = emailRows.length > 0;

        return { usernameInUse: isUsernameInUse, emailInUse: isEmailInUse };
    } catch (error) {
        console.error("Database error in isUsernameOrEmailInUse:", error);
        return { usernameInUse: false, emailInUse: false, error: 'Database error occurred' };
    }
}


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

    return await pool.query(sql, values);
}

async function verifyEmail(token) {
    const sql = 'UPDATE users SET email_verified = TRUE WHERE email_verification_token = ?';
    const values = [token];

    return await pool.query(sql, values);
}
const nodemailer = require('nodemailer');

function createTransporter() {
    return nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
        auth: {
            user: 'predictionpolls@zohomail.eu',
            pass: 'nzDnTajTmFpz' // this is not safe change to env later
        }
    });
}

module.exports = {pool, addRefreshToken,checkRefreshToken,deleteRefreshToken,isUsernameOrEmailInUse,checkCredentials,addUser,findUser,saveEmailVerificationToken,verifyEmail,createTransporter}
