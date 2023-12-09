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

async function makeMod(userId){
    const sql = 'SELECT * FROM polls';

    try {
        const [rows, fields] = await pool.query(sql);
        return rows
    } catch (error) {
        console.error('getDiscretePolls(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function getModTags(userId){

}

async function deleteModTag(userId,mod_tag_topic){

}

async function addModTag(userId,mod_tag_topic){

}

async function getModRequests(userId){

}

async function checkRequestOfUser(requestId,userId){

}

async function setDecisionOnReportRequest(requestId,ban_poll){

}

async function setDecisionOnDiscreteRequest(requestId,discrete_choice){

}

async function setDecisionOnContinuousRequest(requestId,continuous_choice,contPollType){

}

module.exports = { makeMod, getModTags, deleteModTag, addModTag, getModRequests, checkRequestOfUser,
     setDecisionOnReportRequest, setDecisionOnDiscreteRequest, setDecisionOnContinuousRequest
}