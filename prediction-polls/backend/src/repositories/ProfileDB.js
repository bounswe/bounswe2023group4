const authDb = require("../repositories/AuthorizationDB.js");
const mysql = require('mysql2')
const errorCodes = require("../errorCodes.js")

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
        const [rows] = await pool.query(sql, [profileId]);
        if(rows.length == 0){
            throw {error:errorCodes.PROFILE_NOT_FOUND}
        }
        return {profile:rows[0]};
    } catch (error) {
        return error;
    }
}

async function getProfileWithUserId(userId){
    const sql = 'SELECT * FROM profiles WHERE user_id= ?';

    try {
        const [rows] = await pool.query(sql, [userId]);
        if(rows.length == 0){
            throw {error:errorCodes.PROFILE_NOT_FOUND}
        }
        return {profile:rows[0]};
    } catch (error) {
        return error;
    }
}

async function getProfileWithUserInfo({username,email}){
    const {userId,error} = await authDb.findUserId({username,email});
    if(error){
        return error;
    }
    const profile = await getProfileWithUserId(userId);
    return profile;
}

async function addProfile({
    userId,
    username ,
    profile_picture,
    biography,
    birthday ,
    isHidden}){

    try {
        const sql = 'INSERT INTO profiles (user_id, username, profile_picture_data, biography, birthday, is_hidden) VALUES (?, ?, ?, ?, ?, ?)';
        values = [userId,username,profile_picture,biography,birthday,isHidden]
            
        const [resultSetHeader] = await pool.query(sql, values);
        profile_id = resultSetHeader.insertId;
        if (!profile_id) {
            return {error:{code:1111,message:"Could not insert"}};
        }
        return {profile_id:profile_id};
    }catch(error){
        // Error management will be handled later
        /*
        console.log(error);
        if(error.sqlMessage == "Error: Column 'user_id' cannot be null"){
            return {error:{code:1111,message:"Gimme user id"}}
        }
        if(error.sqlMessage == "Error: Cannot add or update a child row: a foreign key constraint "+
        "fails (`predict_app`.`profiles`, CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`))"){
            return {error:{code:1110,message:"No user exists with the given user id"}}
        }
        */
        return {error:{code:1000,message:"An error occured:" + error}};
    }

}

async function updateProfile({
    userId,
    profile_picture,
    biography,
    birthday ,
    isHidden}){

    try {
        if(profile_picture){
            const sql = 'UPDATE profiles SET profile_picture_data = ? WHERE user_id = ?';
            values = [profile_picture,userId];

            const [resultSetHeader] = await pool.query(sql, values);
        }
        if(biography){
            const sql = 'UPDATE profiles SET biography = ? WHERE user_id = ?';
            values = [biography,userId];

            const [resultSetHeader] = await pool.query(sql, values);
        }
        if(birthday){
            const sql = 'UPDATE profiles SET birthday = ? WHERE user_id = ?';
            values = [birthday,userId];

            const [resultSetHeader] = await pool.query(sql, values);
        }
        if(isHidden){
            const sql = 'UPDATE profiles SET is_hidden = ? WHERE user_id = ?';
            values = [isHidden,userId];

            const [resultSetHeader] = await pool.query(sql, values);
        }
        return {status:"success"};
    }catch(error) {
        return {error:{code:1000,message:"An error occured:" + error}};
    } 
}


async function getProfileIsHidden(profileId){
    profile = await getProfileWithProfileId(profileId);
    return profile.is_hidden;

}


module.exports = {getProfileWithProfileId,getProfileWithUserId,getProfileWithUserInfo,addProfile,updateProfile}
    