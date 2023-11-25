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
    const sql = 'SELECT * FROM profiles WHERE userId= ?';

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

async function addProfile(userId, username, email){

    try {
        const {error} = await getProfileWithUserId(userId);
        if(error != errorCodes.PROFILE_NOT_FOUND){
            throw {error:errorCodes.USER_ALREADY_HAS_PROFILE};
        }

        const sql = 'INSERT INTO profiles (userId, username, email, points, profile_picture, biography, birthday, isHidden) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        values = [userId,username,email,10000,null,null,null,null]
        const [resultSetHeader] = await pool.query(sql, values);
        if(!resultSetHeader.insertId){
            throw {error:errorCodes.PROFILE_COULD_NOT_BE_CREATED};
        }
        return {profileId:resultSetHeader.insertId};
    }catch(error){
        return error;
    }

}

async function updateProfile({
    userId,
    profile_picture,
    biography,
    birthday ,
    isHidden}){

    try {
        const {error} = await getProfileWithUserId(userId);
        if(error){
            throw {error:errorCodes.PROFILE_NOT_FOUND};
        }
        if(profile_picture){
            const sql = 'UPDATE profiles SET profile_picture = ? WHERE userId = ?';
            values = [profile_picture,userId];

            const [resultSetHeader] = await pool.query(sql, values);
        }
        if(biography){
            const sql = 'UPDATE profiles SET biography = ? WHERE userId = ?';
            values = [biography,userId];

            const [resultSetHeader] = await pool.query(sql, values);
        }
        if(birthday){
            const sql = 'UPDATE profiles SET birthday = ? WHERE userId = ?';
            values = [birthday,userId];

            const [resultSetHeader] = await pool.query(sql, values);
        }
        if(isHidden){
            const sql = 'UPDATE profiles SET isHidden = ? WHERE userId = ?';
            values = [isHidden,userId];

            const [resultSetHeader] = await pool.query(sql, values);
        }
        return {status:"success"};
    }catch(error) {
        return {error:errorCodes.PROFILE_COULD_NOT_BE_UPDATED};
    } 
}


async function getProfileIsHidden(profileId){
    result = await getProfileWithProfileId(profileId);
    return result.profile.isHidden;
}

async function getBadges(userId){
    const sql = 'SELECT * FROM badges WHERE userId= ?';

    try {
        const [rows] = await pool.query(sql, [userId]);
        const badges = rows.map(badge => {return {topic:badge.topic,rank:badge.userRank}})
        
        return {badges:badges};
    } catch (error) {
        return {error:errorCodes.DATABASE_ERROR};
    }
}

async function updatePoints(userId,additional_points){

    const find_points_sql = 'SELECT * FROM profiles WHERE userId= ?';
    const sql = 'UPDATE profiles SET points = ? WHERE userId = ?';

    try {
        const [rows] = await pool.query(find_points_sql, [userId]);
        const current_points = rows[0].points

        if(current_points + additional_points < 0){
            return {error:errorCodes.INSUFFICIENT_POINTS_ERROR};
        }

        const [resultSetHeader] = await pool.query(sql, [current_points + additional_points, userId]);
        
        return {status:"success"};
        
    } catch (error) {
        return {error:errorCodes.DATABASE_ERROR};
    }
}


module.exports = {getProfileWithProfileId,getProfileWithUserId,addProfile,updateProfile,getBadges,updatePoints}
    