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
        return rows.length > 0;
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
    
        const result = await db.pool.query(sql, values);
        return {"success":true,"error":undefined} ;
      } catch (error) {
        return {"success":false,"error":error} ;
      }
  }


module.exports = {checkCredentials,addUser}