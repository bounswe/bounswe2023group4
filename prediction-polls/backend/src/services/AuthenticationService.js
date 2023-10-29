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
        // const hashedPassword = await hashPassword(password);

        const sql = 'SELECT * FROM users WHERE (username = ? || email = ?) && password = ?';
        const values = [username, username, password];

        const [rows] = await db.pool.query(sql, values);
        console.log(rows)
        return rows.length > 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function addUser(username, password,email,birthday){
    
    try {
        const hashedPassword = await hashPassword(password);
    
        // Store the user in the database
        const sql = 'INSERT INTO users (username, email, password, birthday) VALUES (?, ?, ?, ?)';
        const values = [username, email, hashedPassword, birthday];
    
        const result = await db.pool.query(sql, values);
        return {"success":true,"error":undefined} ;
      } catch (error) {
        return {"success":false,"error":error} ;
      }
  }


module.exports = {checkCredentials,addUser}