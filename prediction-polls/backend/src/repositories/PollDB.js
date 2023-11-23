const mysql = require('mysql2')

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


async function getPolls(){
    const sql = 'SELECT * FROM polls';

    try {
        const [rows, fields] = await pool.query(sql);
        return rows
    } catch (error) {
        console.error('getDiscretePolls(): Database Error');
        throw error;
    }
}

async function getPollWithId(pollId){
    const sql = 'SELECT * FROM polls WHERE id = ?';

    try {
        const [rows, fields] = await pool.query(sql, [pollId]);
        return rows;
    } catch (error) {
        console.error('getPollWithID(): Database Error');
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

async function addDiscretePoll(question, username, choices, openVisibility, setDueDate, dueDatePoll, numericFieldValue, selectedTimeUnit){
    const connection = await pool.getConnection();

    const sql_poll = 'INSERT INTO polls (question, username, poll_type, openVisibility, setDueDate, closingDate, numericFieldValue, selectedTimeUnit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const sql_discrete_poll = 'INSERT INTO discrete_polls (id) VALUES (?)';
    const sql_choice = 'INSERT INTO discrete_poll_choices (choice_text, poll_id) VALUES (?, ?)';

    try {
        await connection.beginTransaction()
        const [resultSetHeader] = await connection.query(sql_poll, [question, username, 'discrete', openVisibility, setDueDate, dueDatePoll, numericFieldValue, selectedTimeUnit]);
        poll_id = resultSetHeader.insertId;

        if (!poll_id) {
            await connection.rollback();
            return false;
        }

        await connection.query(sql_discrete_poll, [poll_id]);

        await Promise.all(choices.map(choice => {
            return connection.query(sql_choice, [choice, poll_id]);
        }))

        await connection.commit();
        return true;
    } catch (error) {
        console.error('addDiscretePoll(): Database Error');
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function addContinuousPoll(question, username, cont_poll_type, openVisibility, setDueDate, dueDatePoll, numericFieldValue, selectedTimeUnit){
    const connection = await pool.getConnection();

    const sql_poll = 'INSERT INTO polls (question, username, poll_type, openVisibility, setDueDate, closingDate, numericFieldValue, selectedTimeUnit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const sql_continuous_poll = 'INSERT INTO continuous_polls (id, cont_poll_type) VALUES (?, ?)' 

    try {
        const [resultSetHeader] = await connection.query(sql_poll, [question, username, 'continuous', openVisibility, setDueDate, dueDatePoll, numericFieldValue, selectedTimeUnit]);
        poll_id = resultSetHeader.insertId;

        if (!poll_id) {
            await connection.rollback();
            return false;
        }

        await connection.query(sql_continuous_poll, [poll_id, cont_poll_type]);

        await connection.commit();
        return true;
    } catch (error) {
        console.error('addContinuousPoll(): Database Error');
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function getDiscretePollChoices(pollid) {
    const sql = "SELECT * FROM discrete_poll_choices WHERE poll_id = ?";

    try {
        [rows] = await pool.query(sql, [pollid]);
        return rows;
    } catch (error) {
        console.error('getPollChoices(): Database Error');
        throw error;
    }
}

async function getDiscreteVoteCount(choiceid) {
    const sql = "SELECT COUNT(*) AS 'count' FROM discrete_polls_selections WHERE choice_id = ?";

    try {
        [result] = await pool.query(sql, [choiceid]);
        return result[0].count;
    } catch (error) {
        console.error('getPollChoices(): Database Error');
        throw error;
    }
}

async function voteDiscretePoll(pollId, userId, choiceId){
    const deleteExistingSql = "DELETE FROM discrete_polls_selections WHERE poll_id = ? AND user_id = ?"
    const addVoteSql = "INSERT INTO discrete_polls_selections (poll_id, choice_id, user_id) VALUES (?, ?, ?)"

    try {
        // TODO: Consider making this a transaction, commit
        deleteResult = await pool.query(deleteExistingSql, [pollId, userId]);
        addResult = await pool.query(addVoteSql, [pollId, choiceId, userId]);
    } catch (error) { 
        console.error('voteDiscretePoll(): Database Error');
        throw error;
    }

}

async function voteContinuousPoll(pollId, userId, choice){
    const deleteExistingSql = "DELETE FROM continuous_poll_selections WHERE poll_id = ? AND user_id = ?"
    const addVoteSql = "INSERT INTO continuous_poll_selections (poll_id, user_id, selected_value) VALUES (?, ?, ?)"

    try {
        // TODO: Consider making this a transaction, commit
        deleteResult = await pool.query(deleteExistingSql, [pollId, userId]);
        addResult = await pool.query(addVoteSql, [pollId, userId, choice]);
    } catch (error) { 
        console.error('voteContinuousPoll(): Database Error');
        throw error;
    }
    
}

async function getContinuousPollVotes(pollId) {
    const sql = "SELECT selected_value FROM continuous_poll_selections";

    try {
        [rows, fields] = await pool.query(sql);
        return rows;
    } catch (error) { 
        console.error('getContinuousPollVotes(): Database Error');
        throw error;
    }
}



module.exports = {getPolls, getPollWithId, getDiscretePollWithId, getContinuousPollWithId, 
    addDiscretePoll,addContinuousPoll, getDiscretePollChoices, getDiscreteVoteCount, voteDiscretePoll, voteContinuousPoll,
    getContinuousPollVotes}
    