const errorCodes = require("../errorCodes.js")
const {pool} = require("./DatabaseInit.js")

require('dotenv').config();

async function getSemanticTagsOfPoll(poll_id) {
    try {
        const query = 'SELECT semantic_id FROM poll_has_semantic_tag WHERE poll_id = ?';
        const [rows] = await pool.execute(query, [poll_id]);
        const semantic_tag_list = rows.map((row) => row.semantic_id)
        return semantic_tag_list;
    } catch (error) {
        console.error('getSemanticTagsOfPoll(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
  }
  
async function addSemanticTagForPoll(semantic_tag, poll_id) {
    try {
        const query = 'INSERT INTO poll_has_semantic_tag (poll_id, semantic_id) VALUES (?, ?)';
        const [result] = await pool.execute(query, [poll_id, semantic_tag]);
        return result.insertId;
    } catch (error) {
        console.error('addSemanticTagForPoll(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}
  
async function findPollsForSemanticTag(semantic_tag) {
    try {
        const query = 'SELECT poll_id FROM poll_has_semantic_tag WHERE semantic_id = ?';
        const [rows] = await pool.execute(query, [semantic_tag]);
        const poll_list = rows.map((row) => row.poll_id);
        return poll_list;
    } catch (error) {
        console.error('findPollsForSemanticTag(): Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

module.exports = { getSemanticTagsOfPoll, addSemanticTagForPoll, findPollsForSemanticTag
}