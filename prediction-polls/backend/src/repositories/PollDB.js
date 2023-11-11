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

async function getContinuousPollWithId(){

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

async function addContinuousPoll(){

}

async function voteDiscretePoll(){
    
}

async function voteContinuousPoll(){
    
}



module.exports = {getDiscretePolls, getContinuousPolls, getDiscretePollWithId, getContinuousPollWithId, 
    addDiscretePoll,addContinuousPoll, voteDiscretePoll, voteContinuousPoll}
    