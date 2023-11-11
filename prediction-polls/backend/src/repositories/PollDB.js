const mysql = require('mysql2')

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


async function getDiscretePolls(){
    const sql = 'SELECT * FROM discrete_polls';

    try {
        const [rows, fields] = await pool.query(sql);
        return rows
    } catch (error) {
        console.error('getDiscretePolls(): Database Error');
        throw error;
    }
}

async function getContinuousPolls(){
    const sql = 'SELECT * FROM continuous_polls';

    try {
        const [rows, fields] = await pool.query(sql);
        return rows
    } catch (error) {
        console.error('getDiscretePolls(): Database Error');
        throw error;
    }
}

async function getDiscretePollWithId(pollId){
    const sql = 'SELECT * FROM discrete_polls WHERE id = ?';

    try {
        const [rows, fields] = await pool.query(sql, [pollId]);
        return rows;
    } catch (error) {
        console.error('getDiscretePollWithId(): Database Error');
        throw error;
    }

}

async function getContinuousPollWithId(pollId){
    const sql = 'SELECT * FROM continuous_polls WHERE id = ?';

    try {
        const [rows, fields] = await pool.query(sql, [pollId]);
        return rows;
    } catch (error) {
        console.error('getContinuousPollWithId(): Database Error');
        throw error;
    }
}

async function addDiscretePoll(question, choices){
    const sql_poll = 'INSERT INTO discrete_polls (question) VALUES (?)';
    const sql_choice = 'INSERT INTO discrete_poll_choices (choice_text, poll_id) VALUES (?, ?)';

    try {
        const [resultSetHeader] = await pool.query(sql_poll, [question]);
        poll_id = resultSetHeader.insertId;
        if (!poll_id) {
            return false;
        }
        await Promise.all(choices.map(choice => {
            return pool.query(sql_choice, [choice, poll_id]);
        }))
        return true;
    } catch (error) {
        console.error('addDiscretePoll(): Database Error');
        throw error;
    }
}

async function addContinuousPoll(question, min, max){
    const sql_poll = 'INSERT INTO continuous_polls (question, min_value, max_value) VALUES (?, ?, ?)';

    try {
        const [resultSetHeader] = await pool.query(sql_poll, [question, min, max]);
        poll_id = resultSetHeader.insertId;
        console.log(poll_id)
        if (!poll_id) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('addContinuousPoll(): Database Error');
        throw error;
    }
}

async function voteDiscretePoll(){
    
}

async function voteContinuousPoll(){
    
}



module.exports = {getDiscretePolls, getContinuousPolls, getDiscretePollWithId, getContinuousPollWithId, 
    addDiscretePoll,addContinuousPoll, voteDiscretePoll, voteContinuousPoll}
    