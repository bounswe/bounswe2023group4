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

async function getPromotionRequests(){
    const sql = 'SELECT * FROM mod_promotion_requests ';

    try {
        const [rows] = await pool.query(sql);
        return rows
    } catch (error) {
        console.error('getPromotionRequests(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function addPromotionRequest(userId){
    const sql = 'INSERT INTO mod_promotion_requests (userId) VALUES (?)';

    try {
        const [rows] = await pool.query(sql,[userId]);
        return rows
    } catch (error) {
        if(error.code === 'ER_DUP_ENTRY'){
            return {status:"already exists"} // This means that user already requested promotion
        }
        console.error('addPromotionRequest(): Database Error');
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
        console.error('checkRequestOfUser(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function createDiscreteRequest(userId,poll_id){
    const request_sql = 'INSERT INTO mod_requests (userId, poll_id, request_type) VALUES (?, ?, "discrete")'
    const discrete_request_sql = 'INSERT INTO mod_request_discrete (requeat_id) VALUES (?)'

    try {
        const [request_insert_result] = await pool.query(request_sql,[userId,poll_id]);
        const [discrete_insert_result] = await pool.query(discrete_request_sql,[request_insert_result.insertId]);
        return {status:"success"}
    } catch (error) {
        console.error('createDiscreteRequest(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function createContinuousRequest(userId,poll_id){
    const request_sql = 'INSERT INTO mod_requests (userId, poll_id, request_type) VALUES (?, ?, "continuous")'
    const continuous_request_sql = 'INSERT INTO mod_request_continuous (requeat_id) VALUES (?)'

    try {
        const [request_insert_result] = await pool.query(request_sql,[userId,poll_id]);
        const [continuous_insert_result] = await pool.query(continuous_request_sql,[request_insert_result.insertId]);
        return {status:"success"}
    } catch (error) {
        console.error('createContinuousRequest(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function createReportRequest(userId,poll_id){
    const request_sql = 'INSERT INTO mod_requests (userId, poll_id, request_type) VALUES (?, ?, "report")'
    const report_request_sql = 'INSERT INTO mod_request_report (requeat_id) VALUES (?)'

    try {
        const [request_insert_result] = await pool.query(request_sql,[userId,poll_id]);
        const [report_insert_result] = await pool.query(report_request_sql,[request_insert_result.insertId]);
        return {status:"success"}
    } catch (error) {
        console.error('createReportRequest(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function getAnsweredDiscreteRequestsOfPoll(pollId){
    const answered_requests_sql = "SELECT mod_requests.*, mod_request_discrete.choice_id FROM mod_requests " + 
    "JOIN mod_request_discrete ON mod_requests.id = mod_request_discrete.request_id " +
    "WHERE mod_request_discrete.choice_id IS NOT NULL AND mod_requests.poll_id = 4"

    try {
        const [rows] = await pool.query(answered_requests_sql,[pollId]);
        return rows
    } catch (error) {
        console.error(error)
        console.error('getAnsweredDiscreteRequestsOfPoll(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function getAnsweredContinuousRequestsOfPoll(pollId){
    const answered_requests_sql = "SELECT mod_requests.*, mod_request_continuous.float_value, mod_request_continuous.date_value FROM mod_requests " + 
    "JOIN mod_request_continuous ON mod_requests.id = mod_request_continuous.request_id " +
    "WHERE mod_requests.poll_id = ? AND (mod_request_continuous.float_value IS NOT NULL " +
    "OR mod_request_continuous.date_value IS NOT NULL);"

    try {
        const [rows] = await pool.query(answered_requests_sql,[pollId]);
        return rows
    } catch (error) {
        console.error('getAnsweredDiscreteRequestsOfPoll(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function getAnsweredReportRequestsOfPoll(pollId){
    const answered_requests_sql = "SELECT mod_requests.* FROM mod_requests WHERE mod_requests.poll_id = ? " + 
    "JOIN mod_request_report ON mod_requests.id = mod_request_report.request_id " +
    "WHERE mod_request_report.float_value IS NOT NULL OR mod_request_report.date_value IS NOT NULL;"

    try {
        const [rows] = await pool.query(answered_requests_sql,[pollId]);
        return rows
    } catch (error) {
        console.error('getAnsweredReportRequestsOfPoll(): Database Error');
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

async function getAllMods(){
    const mod_count_sql = "SELECT * FROM users WHERE isMod = 1"
    try {
        const [rows] = await pool.query(mod_count_sql);
        return rows
    } catch (error) {
        console.error('getAllMods(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }

}

module.exports = { getPromotionRequests,addPromotionRequest, makeMod, getModTags, deleteModTag, addModTag, getModRequests, 
    checkRequestOfUser, createDiscreteRequest, createDiscreteRequest, createContinuousRequest, createReportRequest,
    getAnsweredDiscreteRequestsOfPoll, getAnsweredContinuousRequestsOfPoll, getAnsweredReportRequestsOfPoll, setDecisionOnReportRequest, 
    setDecisionOnDiscreteRequest, setDecisionOnContinuousRequest, getAllMods
}