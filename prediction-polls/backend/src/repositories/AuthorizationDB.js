const mysql = require('mysql2')

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
        console.error(error);
        return false;
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
        return {"success":true,"error":undefined, "userid": result.insertId} ;
      } catch (error) {
        return {"success":false,"error":error} ;
      }
  }


async function findUserId({username,email}){
    if(username){
        const sql = 'SELECT id FROM users WHERE username = ?';
    
        const [result] = await pool.query(sql, [username]);
        return result[0].id;
    }
    if(email){
        const sql = 'SELECT id FROM users WHERE email = ?';
    
        const [result] = await pool.query(sql, [email]);
        return result[0].id;
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

module.exports = {pool, addRefreshToken,checkRefreshToken,deleteRefreshToken,isUsernameOrEmailInUse,checkCredentials,addUser,findUserId}