const mysql = require('mysql2');
const { addRefreshToken, deleteRefreshToken } = require('./AuthorizationDB');
const errorCodes = require("../errorCodes.js");

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function addPromotionRequest(userId){
    const sql = 'INSERT INTO mod_promotion_requests (userId) VALUES (?)';

    try {
        const [rows] = await pool.query(sql,[userId]);
        return rows
    } catch (error) {
        if(error.code === 'ER_DUP_ENTRY'){
            return {status:"already exists"} // This means that user already requested promotion
        }
        console.error('makeMod(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function makeMod(userId){
    const sql = 'UPDATE users SET isMod = 1 WHERE id = ?';

    try {
        const [rows] = await pool.query(sql,[userId]);
        return rows
    } catch (error) {
        console.error('makeMod(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function getModTags(userId){
    const sql = 'SELECT * FROM mod_tags WHERE userId = ?';

    try {
        const [rows] = await pool.query(sql,[userId]);
        return rows
    } catch (error) {
        console.error('getModTags(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function deleteModTag(userId,mod_tag_topic){
    const sql = 'DELETE FROM mod_tags WHERE userId = ? AND topic = ?';

    try {
        const [rows] = await pool.query(sql,[userId,mod_tag_topic]);
        return rows
    } catch (error) {
        console.error('deleteModTag(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function addModTag(userId,mod_tag_topic){
    const sql = 'INSERT INTO mod_tags (topic,userId) VALUES (?,?)'

    try {
        const [rows] = await pool.query(sql,[mod_tag_topic,userId]);
        return {status:"success"}
    } catch (error) {
        if(error.code === 'ER_DUP_ENTRY'){
            return {status:"already exists"} // This means that tag is already added
        }
        console.error('addModTag(): Database Error ',error);
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function getModRequests(userId){
    const sql = 'SELECT * FROM mod_requests WHERE userId = ?'

    try {
        const [rows] = await pool.query(sql,[userId]);
        return rows
    } catch (error) {
        console.error('getModRequests(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function checkRequestOfUser(requestId,userId){
    const sql = 'SELECT * FROM mod_requests WHERE id = ? AND userId = ?'

    try {
        const [rows] = await pool.query(sql,[requestId,userId]);
        return rows
    } catch (error) {
        console.error('getModRequests(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function setDecisionOnReportRequest(requestId,ban_poll){
    const sql = 'UPDATE mod_request_report SET ban_poll = ? WHERE request_id = ?'

    try {
        const [rows] = await pool.query(sql,[ban_poll,requestId]);
        return rows
    } catch (error) {
        console.error('setDecisionOnReportRequest(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function setDecisionOnDiscreteRequest(requestId,discrete_choice){
    const sql = 'UPDATE mod_request_discrete SET choice_id = ? WHERE request_id = ?'

    try {
        const [rows] = await pool.query(sql,[discrete_choice,requestId]);
        return rows
    } catch (error) {
        console.error('setDecisionOnDiscreteRequest(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function setDecisionOnContinuousRequest(requestId,continuous_choice,contPollType){
    const numeric_sql = 'UPDATE mod_request_continuous SET float_value = ? WHERE request_id = ?'
    const date_sql = 'UPDATE mod_request_continuous SET date_value = ? WHERE request_id = ?'

    try {
        let rows;
        if(contPollType == "numeric"){
            [rows] = await pool.query(numeric_sql,[continuous_choice,requestId]);
        }
        else if(contPollType == "date"){
            [rows] = await pool.query(date_sql,[continuous_choice,requestId]);
        }
        else{
            throw errorCodes.DATABASE_ERROR
        }
        return rows
    } catch (error) {
        console.error('setDecisionOnContinuousRequest(): Database Error',error);
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

module.exports = { addPromotionRequest, makeMod, getModTags, deleteModTag, addModTag, getModRequests, checkRequestOfUser,
     setDecisionOnReportRequest, setDecisionOnDiscreteRequest, setDecisionOnContinuousRequest
}