const { addRefreshToken, deleteRefreshToken } = require('./AuthorizationDB');
const errorCodes = require("../errorCodes.js");
const {pool} = require("./DatabaseInit.js")

require('dotenv').config();

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

async function createDiscreteRequest(userId,poll_id,reward){
    const request_sql = 'INSERT INTO mod_requests (userId, poll_id, request_type, reward) VALUES (?, ?, "discrete", ?)'
    const discrete_request_sql = 'INSERT INTO mod_request_discrete (request_id) VALUES (?)'

    try {
        const [request_insert_result] = await pool.query(request_sql,[userId,poll_id,reward]);
        const [discrete_insert_result] = await pool.query(discrete_request_sql,[request_insert_result.insertId]);
        return {status:"success"}
    } catch (error) {
        if(error.code === "ER_DUP_ENTRY"){
            return {status:"Already exists"}
        }
        console.error('createDiscreteRequest(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function createContinuousRequest(userId,poll_id,reward){
    const request_sql = 'INSERT INTO mod_requests (userId, poll_id, request_type,reward) VALUES (?, ?, "continuous", ?)'
    const continuous_request_sql = 'INSERT INTO mod_request_continuous (request_id) VALUES (?)'

    try {
        const [request_insert_result] = await pool.query(request_sql,[userId,poll_id,reward]);
        const [continuous_insert_result] = await pool.query(continuous_request_sql,[request_insert_result.insertId]);
        return {status:"success"}
    } catch (error) {
        if(error.code === "ER_DUP_ENTRY"){
            return {status:"Already exists"}
        }
        console.error('createContinuousRequest(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function createReportRequest(userId,poll_id,reward){
    const request_sql = 'INSERT INTO mod_requests (userId, poll_id, request_type,reward) VALUES (?, ?, "report", ?)'
    const report_request_sql = 'INSERT INTO mod_request_report (request_id) VALUES (?)'

    try {
        const [request_insert_result] = await pool.query(request_sql,[userId,poll_id,reward]);
        const [report_insert_result] = await pool.query(report_request_sql,[request_insert_result.insertId]);
        return {status:"success"}
    } catch (error) {
        if(error.code === "ER_DUP_ENTRY"){
            return {status:"Already exists"}
        }
        console.error('createReportRequest(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function getAnsweredDiscreteRequestsOfPoll(pollId){
    const answered_requests_sql = "SELECT mod_requests.*, mod_request_discrete.choice_id FROM mod_requests " + 
    "JOIN mod_request_discrete ON mod_requests.id = mod_request_discrete.request_id " +
    "WHERE mod_request_discrete.choice_id IS NOT NULL AND mod_requests.poll_id = ?"

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

async function updateJuryRewardforRequests(pollId,newReward){
    const update_reward_sql = "UPDATE mod_requests SET reward = ? WHERE poll_id = ? "

    try {
        const [rows] = await pool.query(update_reward_sql,[newReward,pollId]);
        return {status:"success"}
    } catch (error) {
        console.error('updateJuryRewardforRequests(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function deleteModRequestsforPollClose(pollId){
    const discrete_delete_sql = "DELETE FROM mod_request_discrete WHERE request_id IN (SELECT id FROM mod_requests WHERE poll_id = ?);"
    const cont_delete_sql = "DELETE FROM mod_request_continuous WHERE request_id IN (SELECT id FROM mod_requests WHERE poll_id = ?);"
    const main_delete_sql = "DELETE FROM mod_requests WHERE poll_id = ? AND mod_requests.request_type != 'report';"

    try {
        const [discrete_deleted] = await pool.query(discrete_delete_sql,[pollId]);
        const [cont_deleted] = await pool.query(cont_delete_sql,[pollId]);
        const [main_deleted] = await pool.query(main_delete_sql,[pollId]);
        return {status:"success"};
    } catch (error) {
        console.error('deleteModRequestsforPollClose(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function deleteModRequest(request_id){
    const discrete_delete_sql = "DELETE FROM mod_request_discrete WHERE request_id = ?;"
    const report_delete_sql = "DELETE FROM mod_request_report WHERE request_id = ?"
    const cont_delete_sql = "DELETE FROM mod_request_continuous WHERE request_id = ?"
    const main_delete_sql = "DELETE FROM mod_requests WHERE id = ?"

    try {
        const [discrete_deleted] = await pool.query(discrete_delete_sql,[request_id]);
        const [cont_deleted] = await pool.query(cont_delete_sql,[request_id]);
        const [report_deleted] = await pool.query(report_delete_sql,[request_id]);
        const [main_deleted] = await pool.query(main_delete_sql,[request_id]);
        return {status:"success"};
    } catch (error) {
        console.error('deleteModRequest(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function cleanNonRespondedRequests(userId){
    try {
        const user_requests = await getModRequests(userId)
        const responded_requests = await Promise.all(user_requests.map(async (user_request)=>{
            const request_id = user_request.id;
            const has_response = await checkModRequestForResponse(request_id)
            if(!has_response){
                await deleteModRequest(request_id);
            }
        }))
        return {status:"success"};
    } catch (error) {
        console.error('cleanNonRespondedRequests(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
     
}

async function checkModRequestForResponse(request_id){
    const response_check_sql = "SELECT CASE "+
        "WHEN EXISTS (SELECT 1 FROM mod_request_report WHERE request_id = ? AND (ban_poll IS NOT NULL)) "+
        "OR EXISTS (SELECT 1 FROM mod_request_discrete WHERE request_id = ? AND (choice_id IS NOT NULL)) "+
        "OR EXISTS (SELECT 1 FROM mod_request_continuous WHERE request_id = ? AND (float_value IS NOT NULL OR date_value IS NOT NULL)) "+
        "THEN true ELSE false END AS has_response";

    try {
        const [has_response] = await pool.query(response_check_sql,[request_id,request_id,request_id]);
        return has_response[0].has_response
    } catch (error) {
        console.error('checkModRequestForResponse(): Database Error');
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

async function getJurySeekingPolls(){
    const jury_seeking_poll_sql = "SELECT * FROM polls WHERE isOpen = 0 AND finalized = 0"

    try {
        const [rows] = await pool.query(jury_seeking_poll_sql);
        return rows
    } catch (error) {
        console.error('getAllMods(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

module.exports = { getPromotionRequests,addPromotionRequest, makeMod, getModTags, deleteModTag, addModTag, getModRequests, 
    checkRequestOfUser, createDiscreteRequest, createDiscreteRequest, createContinuousRequest, createReportRequest,
    getAnsweredDiscreteRequestsOfPoll, getAnsweredContinuousRequestsOfPoll, getAnsweredReportRequestsOfPoll, updateJuryRewardforRequests,
    deleteModRequestsforPollClose, checkModRequestForResponse, setDecisionOnReportRequest, setDecisionOnDiscreteRequest, 
    setDecisionOnContinuousRequest, getAllMods, getJurySeekingPolls, cleanNonRespondedRequests
}