const mysql = require('mysql2')

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


async function getProfileWithProfileId(profileId){
    const sql = 'SELECT * FROM profiles WHERE id= ?';

    try {
        const [rows, fields] = await pool.query(sql, [profileId]);
        return rows;
    } catch (error) {
        console.error('getProfileWithProfileId(): Database Error');
        throw error;
    }
}

async function getProfileWithUserId(userId){
    const sql = 'SELECT * FROM profiles WHERE user_id= ?';

    try {
        const [rows, fields] = await pool.query(sql, [userId]);
        return rows;
    } catch (error) {
        console.error('getProfileWithUserId(): Database Error');
        throw error;
    }
}

async function getProfileWithUserInfo({username,email}){
    const userId=0;
    if(username){
        const sql = 'SELECT * FROM users WHERE username = ?';
        //TODO retrieve user id using username
        userId = 1;
    }
    else{
        const sql = 'SELECT * FROM users WHERE email = ?';
        //TODO retrieve user id using email
        userId = 1;
    }
    const user = await getProfileWithUserId(userId);
    return user;
}

async function addProfile({
    user_id,
    username ,
    profile_picture,
    biography,
    birthday ,
    is_hidden}){

    const sql = 'INSERT INTO profiles (user_id, username, profile_picture_data, biography, birthday, is_hidden) VALUES (?, ?, ?, ?, ?, ?)';
    values = [user_id,username,profile_picture,biography,birthday,is_hidden]
        
    const [resultSetHeader] = await pool.query(sql_poll, values);
        profile_id = resultSetHeader.insertId;
        if (!profile_id) {
            return false;
        }
        return profile_id;
}

async function updateProfile({
    user_id,
    username ,
    profile_picture,
    biography,
    birthday ,
    is_hidden}){

    if(profile_picture){

    }
    if(biography){

    }
    if(birthday){

    }
    if(is_hidden){
        
    }
}
    