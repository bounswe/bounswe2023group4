const mysql = require('mysql2');
const { addRefreshToken, deleteRefreshToken, findUser } = require('./AuthorizationDB');
const { updatePoints } = require('./ProfileDB');
const errorCodes = require("../errorCodes.js");

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
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function getFamousPolls(){

    const sql = "SELECT polls.*, COALESCE(famous_polls.total_points_spent, 0) AS total_points_spent " +
    "FROM polls " +
    "LEFT JOIN ( " +
        "SELECT poll_id, SUM(given_points) AS total_points_spent " +
        "FROM discrete_polls_selections " +
        "GROUP BY poll_id " +
        "UNION " +
        "SELECT poll_id, SUM(given_points) AS total_points_spent " +
        "FROM continuous_poll_selections " +
        "GROUP BY poll_id " +
    ") AS famous_polls ON polls.id = famous_polls.poll_id " +
    "ORDER BY COALESCE(famous_polls.total_points_spent, 0) DESC;"

    try {
        const [rows] = await pool.query(sql);
        console.log(rows)
        return rows;
    } catch (error) {
        throw {error: error};
    }
}

async function getOpenedPollsOfUser(userId){
    const sql = 'SELECT * FROM polls WHERE username = ?';

    try {
        const user_result = await findUser({userId});
        if(user_result.error){
            throw user_result.error
        }
        const [rows, fields] = await pool.query(sql,[user_result.username]);
        return rows
    } catch (error) {
        throw {error: error};
    }
}

async function getVotedPollsOfUser(userId){

    const sql = "SELECT polls.* FROM polls,( " + 
    "SELECT poll_id FROM discrete_polls_selections WHERE user_id = ? UNION " +
    "SELECT poll_id FROM continuous_poll_selections WHERE user_id = ? ) AS voted_polls " +
    "WHERE polls.id = voted_polls.poll_id";

    const discrete_votes_sql = 'SELECT * FROM discrete_polls_selections WHERE user_id = ?';
    const continuous_votes_sql = 'SELECT * FROM continuous_poll_selections WHERE user_id = ?';

    try {
        const user_result = await findUser({userId});
        if(user_result.error){
            throw user_result.error
        }
        const [rows] = await pool.query(sql,[userId,userId]);
        
        console.log(rows)
        return rows;
    } catch (error) {
        throw {error: error};
    }
}

async function getPollWithId(pollId){
    const sql = 'SELECT * FROM polls WHERE id = ?';

    try {
        const [rows, fields] = await pool.query(sql, [pollId]);
        return rows;
    } catch (error) {
        console.error('getPollWithID(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
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
            throw {error: errorCodes.DATABASE_ERROR};
        }

        await connection.query(sql_discrete_poll, [poll_id]);

        await Promise.all(choices.map(choice => {
            return connection.query(sql_choice, [choice, poll_id]);
        }))

        await connection.commit();
        return poll_id;
    } catch (error) {
        console.error('addDiscretePoll(): Database Error');
        await connection.rollback();
        throw {error: errorCodes.DATABASE_ERROR};
    } finally {
        connection.release();
    }
}

async function addContinuousPoll(question, username, cont_poll_type, setDueDate, dueDatePoll, numericFieldValue, selectedTimeUnit){
    const connection = await pool.getConnection();

    const sql_poll = 'INSERT INTO polls (question, username, poll_type, openVisibility, setDueDate, closingDate, numericFieldValue, selectedTimeUnit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const sql_continuous_poll = 'INSERT INTO continuous_polls (id, cont_poll_type) VALUES (?, ?)' 

    try {
        await connection.beginTransaction();
        const [resultSetHeader] = await connection.query(sql_poll, [question, username, 'continuous', false, setDueDate, dueDatePoll, numericFieldValue, selectedTimeUnit]);
        poll_id = resultSetHeader.insertId;

        if (!poll_id) {
            await connection.rollback();
            throw {error: errorCodes.DATABASE_ERROR};
        }

        await connection.query(sql_continuous_poll, [poll_id, cont_poll_type]);

        await connection.commit();
        return poll_id;
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

async function voteDiscretePoll(pollId, userId, choiceId, pointsSpent){
    const connection = await pool.getConnection();

    const oldSelectionPointsSql = "SELECT * FROM discrete_polls_selections WHERE poll_id = ? AND user_id = ?";
    const deleteExistingSql = "DELETE FROM discrete_polls_selections WHERE poll_id = ? AND user_id = ?";
    const addVoteSql = "INSERT INTO discrete_polls_selections (poll_id, choice_id, user_id, given_points) VALUES (?, ?, ?, ?)";
    const findPointsSql = 'SELECT * FROM profiles WHERE userId= ?';
    const updatePointSql = 'UPDATE profiles SET points = ? WHERE userId = ?';

    try {
        await connection.beginTransaction()

        const pollObject = await getPollWithId(pollId);

        if (pollObject[0].isOpen == 0) {
            throw { error: errorCodes.DATABASE_ERROR };
        }

        const [rows] = await connection.query(findPointsSql, [userId]);
        const current_points = rows[0].points;

        const [oldSelection] = await connection.query(oldSelectionPointsSql, [pollId, userId]);

        const deleteResult = await connection.query(deleteExistingSql, [pollId, userId]);
        const addResult = await connection.query(addVoteSql, [pollId, choiceId, userId, pointsSpent]);

        const oldPoint = (oldSelection.length != 0 ? oldSelection[0].given_points : 0);

        const newPoints = current_points - pointsSpent + oldPoint;
        if(newPoints < 0){
            connection.rollback()
            throw {error: errorCodes.INSUFFICIENT_POINTS_ERROR};
        }

        const [resultSetHeader] = await connection.query(updatePointSql, [newPoints, userId]);
        
        connection.commit();
        return {status:"success"};

    } catch (error) { 
        await connection.rollback();
        console.error('voteDiscretePoll(): Database Error: ', error);
        throw error;
    } finally {
        connection.release();
    }

}

async function voteContinuousPoll(pollId, userId, choice, contPollType, pointsSpent){
    const connection = await pool.getConnection();

    const oldSelectionPointsSql = "SELECT * FROM continuous_poll_selections WHERE poll_id = ? AND user_id = ?";
    const deleteExistingSql = "DELETE FROM continuous_poll_selections WHERE poll_id = ? AND user_id = ?";
    const addVoteSql = "INSERT INTO continuous_poll_selections (poll_id, user_id, float_value, date_value, given_points) VALUES (?, ?, ?, ?, ?)";
    const findPointsSql = 'SELECT points FROM profiles WHERE userId= ?';
    const updatePointSql = 'UPDATE profiles SET points = ? WHERE userId = ?';

    try {
        await connection.beginTransaction()

        const pollObject = await getPollWithId(pollId);

        if (pollObject[0].isOpen == 0) {
            throw { error: errorCodes.DATABASE_ERROR };
        }

        const [rows] = await connection.query(findPointsSql, [userId]);
        const current_points = rows[0].points;

        const [oldSelection] = await connection.query(oldSelectionPointsSql, [pollId, userId]);

        deleteResult = await connection.query(deleteExistingSql, [pollId, userId]);
        if (contPollType === "numeric") {
            addResult = await connection.query(addVoteSql, [pollId, userId, choice, null, pointsSpent]);
        } else if (contPollType === "date") {
            addResult = await connection.query(addVoteSql, [pollId, userId, null, choice, pointsSpent]);
        } else {
            throw {error: errorCodes.NO_SUCH_POLL_ERROR};
        }

        const oldPoint = (oldSelection.length != 0 ? oldSelection[0].given_points : 0);
        const newPoints = current_points - pointsSpent + oldPoint;

        if(newPoints < 0){
            connection.rollback()
            throw {error: errorCodes.INSUFFICIENT_POINTS_ERROR};
        }

        const [resultSetHeader] = await connection.query(updatePointSql, [newPoints, userId]);
        connection.commit();
    } catch (error) { 
        await connection.rollback();
        console.error('voteContinuousPoll(): Database Error');
        throw error;
    } finally {
        connection.release();
    }
    
}

async function getContinuousPollVotes(pollId) {
    const sql = "SELECT float_value, date_value FROM continuous_poll_selections WHERE poll_id = ?";

    try {
        [rows, fields] = await pool.query(sql, [pollId]);
        return rows;
    } catch (error) { 
        console.error('getContinuousPollVotes(): Database Error');
        throw error;
    }
}

async function getTagsOfPoll(pollId) {
    const sql = "SELECT tags.topic FROM tags WHERE poll_id = ?";

    try {
        [rows] = await pool.query(sql, [pollId]);
        return rows.map(item => item.topic.trim());
    } catch (error) { 
        console.error('getTagsOfPoll(): Database Error');
        throw error;
    }
}

async function getUntaggedPolls() {
    const sql = 'SELECT polls.id, polls.question, polls.tagsScanned FROM polls'

    try {
        [rows] = await pool.query(sql, []);
        return rows;
    } catch (error) { 
        console.error('getUntaggedPolls(): Database Error');
        throw error;
    }
}

async function updateTagsScanned(pollId, tagsScanned) {
    const sql = 'UPDATE polls SET tagsScanned = ? WHERE id = ?'

    try {
        [rows] = await pool.query(sql, [tagsScanned, pollId]);
        return rows;
    } catch (error) { 
        console.error('updateTagsScanned(): Database Error');
        throw error;
    }
}

async function addTopic(pollId, topic) {
    const sql = 'INSERT into tags (topic, poll_id) VALUES (?, ?)'

    try {
        [rows] = await pool.query(sql, [topic, pollId]);
        return rows;
    } catch (error) { 
        console.error('updateTopic(): Database Error');
        throw error;
    }
}

async function getDiscreteSelectionsWithPollId(pollId) {
    const sql = "SELECT * FROM discrete_polls_selections WHERE poll_id = ?";

    try {
        [result] = await pool.query(sql, [pollId]);
        return result;
    } catch (error) {
        console.error('getDiscreteSelectionWithPollId(): Database Error');
        throw error;
    }
}

async function closePoll(pollId, rewards) {
    const pointUpdateSql = 'UPDATE profiles SET points = points + ? WHERE userId = ?';
    const closePollSql = 'UPDATE polls SET isOpen = false WHERE id = ?';

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        rewards.map(reward => {
            connection.query(pointUpdateSql, [reward.reward, reward.user_id]);
        });

        connection.query(closePollSql, [pollId]);

        await connection.commit();
        return true;
    } catch (error) {
        console.error('closePoll(): Database Error');
        await connection.rollback();
        throw {error: errorCodes.DATABASE_ERROR};
    } finally {
        connection.release();
    }
}

async function getPollCount(){
    const poll_count_sql = "SELECT COUNT(*) AS poll_count FROM polls";

    try {
        const [result] = await pool.query(poll_count_sql);
        return result[0];
    } catch (error) {
        console.error('getPollCount(): Database Error');
        throw error;
    }
}

async function addReport(userId, pollId) {
    const sql = 'INSERT INTO reports (user_id, poll_id) VALUES (?, ?)';
    try {
        const [result] = await pool.query(sql, [userId, pollId]);
        return result;
    } catch (error) {
        console.error('addReport(): Database Error', error);
        throw error;
    }
}
async function getReports() {
    const sql = 'SELECT * FROM reports';
    try {
        const [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        console.error('getReports(): Database Error', error);
        throw error;
    }
}

async function addComment(userId, pollId, commentText) {
    const sql = 'INSERT INTO comments (user_id, poll_id, comment_text) VALUES (?, ?, ?)';
    try {
        await pool.query(sql, [userId, pollId, commentText]);
    } catch (error) {
        console.error('addComment(): Database Error', error);
        throw error;
    }
}

async function getComments(pollId) {
    const sql = 'SELECT * FROM comments WHERE poll_id = ?';
    try {
        const [comments] = await pool.query(sql, [pollId]);
        return comments;
    } catch (error) {
        console.error('getComments(): Database Error', error);
        throw error;
    }
}



module.exports = {getPolls,getFamousPolls,getOpenedPollsOfUser,getVotedPollsOfUser, getPollWithId, getDiscretePollWithId, getContinuousPollWithId, 
    addDiscretePoll,addContinuousPoll, getDiscretePollChoices, getDiscreteVoteCount, voteDiscretePoll, voteContinuousPoll,
    getContinuousPollVotes,getTagsOfPoll, getUntaggedPolls, updateTagsScanned, addTopic, getDiscreteSelectionsWithPollId, closePoll, getPollCount, addReport, getReports, addComment, getComments}
    