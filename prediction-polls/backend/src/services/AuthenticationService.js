const db = require("../repositories/AuthorizationDB.js");

require('dotenv').config();

const bcrypt = require('bcrypt');

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

        const [rows] = await db.pool.query(sql, values);
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
    
        const [result] = await db.pool.query(sql, values);
        return {"success":true,"error":undefined, "userid": result.insertId} ;
      } catch (error) {
        return {"success":false,"error":error} ;
      }
  }

  async function isUsernameOrEmailInUse(username, email) {
    try {
        const usernameSql = 'SELECT 1 FROM users WHERE username = ?';
        const [usernameRows] = await db.pool.query(usernameSql, [username]);

        const emailSql = 'SELECT 1 FROM users WHERE email = ?';
        const [emailRows] = await db.pool.query(emailSql, [email]);

        const isUsernameInUse = usernameRows.length > 0;
        const isEmailInUse = emailRows.length > 0;

        return { usernameInUse: isUsernameInUse, emailInUse: isEmailInUse };
    } catch (error) {
        console.error("Database error in isUsernameOrEmailInUse:", error);
        return { usernameInUse: false, emailInUse: false, error: 'Database error occurred' };
    }
}



module.exports = {checkCredentials,addUser,isUsernameOrEmailInUse}