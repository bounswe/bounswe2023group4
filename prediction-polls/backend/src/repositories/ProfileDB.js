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


async function getProfileWithProfileId(profileId) {

    const sql = 'SELECT * FROM profiles WHERE id= ?';

    try {
        const [rows] = await pool.query(sql, [profileId]);
        if (rows.length == 0) {
            throw { error: errorCodes.PROFILE_NOT_FOUND }
        }
        return { profile: rows[0] };
    } catch (error) {
        return error;
    }
}

async function getProfileWithUserId(userId) {
    const sql = 'SELECT * FROM profiles WHERE userId= ?';

    try {
        const [rows] = await pool.query(sql, [userId]);
        if (rows.length == 0) {
            throw { error: errorCodes.PROFILE_NOT_FOUND }
        }
        return { profile: rows[0] };
    } catch (error) {
        return error;
    }
}

async function verifyFollow(follower_id, followed_id) {
    const sql = 'SELECT * FROM user_follow WHERE follower_id= ? AND followed_id = ?';
    try {
        const [rows] = await pool.query(sql, [follower_id, followed_id]);
        if (rows.length > 0) {
            if (rows[0].follow_status == false) {
                return { updateDecision: true };
            }
            else {
                return { error: errorCodes.FOLLOWERSHIP_ALREADY_EXISTS };
            }
        }
        else {
            return { updateDecision: false };
        }
    } catch (error) {
        return error;
    }
}

async function verifyUnFollow(follower_id, followed_id) {
    const sql = 'SELECT * FROM user_follow WHERE follower_id= ? AND followed_id = ? AND follow_status = ?';

    try {
        const [rows] = await pool.query(sql, [follower_id, followed_id, false]);
        if (rows.length != 0) {
            return { error: errorCodes.NO_FOLLOWERSHIP_FOUND };
        }
        else {
            return { formerRelationStatus: true };
        }
    } catch (error) {
        return error;
    }
}
async function addProfile(userId, username, email) {

    try {
        const { error } = await getProfileWithUserId(userId);
        if (error != errorCodes.PROFILE_NOT_FOUND) {
            throw { error: errorCodes.USER_ALREADY_HAS_PROFILE };
        }

        const sql = 'INSERT INTO profiles (userId, username, email, points, profile_picture, biography, birthday, isHidden) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        values = [userId, username, email, 10000, null, null, null, null]
        const [resultSetHeader] = await pool.query(sql, values);
        if (!resultSetHeader.insertId) {
            throw { error: errorCodes.PROFILE_COULD_NOT_BE_CREATED };
        }
        return { profileId: resultSetHeader.insertId };
    } catch (error) {
        return error;
    }

}

async function updateProfile({
    userId,
    profile_picture,
    biography,
    birthday,
    isHidden }) {

    try {
        const { error } = await getProfileWithUserId(userId);
        if (error) {
            throw { error: errorCodes.PROFILE_NOT_FOUND };
        }
        if (profile_picture) {
            const sql = 'UPDATE profiles SET profile_picture = ? WHERE userId = ?';
            values = [profile_picture, userId];

            const [resultSetHeader] = await pool.query(sql, values);
        }
        if (biography) {
            const sql = 'UPDATE profiles SET biography = ? WHERE userId = ?';
            values = [biography, userId];

            const [resultSetHeader] = await pool.query(sql, values);
        }
        if (birthday) {
            const sql = 'UPDATE profiles SET birthday = ? WHERE userId = ?';
            values = [birthday, userId];

            const [resultSetHeader] = await pool.query(sql, values);
        }
        if (isHidden) {
            const sql = 'UPDATE profiles SET isHidden = ? WHERE userId = ?';
            values = [isHidden, userId];

            const [resultSetHeader] = await pool.query(sql, values);
        }
        return { status: "success" };
    } catch (error) {
        return { error: errorCodes.PROFILE_COULD_NOT_BE_UPDATED };
    }
}


async function getProfileIsHidden(profileId) {
    result = await getProfileWithProfileId(profileId);
    return result.profile.isHidden;
}

async function getBadges(userId) {
    const sql = 'SELECT * FROM badges WHERE userId= ?';

    try {
        const [rows] = await pool.query(sql, [userId]);
        const badges = rows.map(badge => { return { id: badge.id, topic: badge.topic, rank: badge.userRank, isSelected: badge.isSelected } })

        return { badges: badges };
    } catch (error) {
        return { error: errorCodes.DATABASE_ERROR };
    }
}

async function updateBadge(badgeId, IsSelected) {
    const sql = 'UPDATE badges SET isSelected = ? WHERE id = ?';

    try {
        const [resultSetHeader] = await pool.query(sql, [IsSelected, badgeId]);

        return { status: "success" };

    } catch (error) {
        return { error: errorCodes.DATABASE_ERROR };
    }
}

async function updatePoints(userId, additional_points) {

    const find_points_sql = 'SELECT * FROM profiles WHERE userId= ?';
    const sql = 'UPDATE profiles SET points = ? WHERE userId = ?';

    try {
        const [rows] = await pool.query(find_points_sql, [userId]);
        const current_points = rows[0].points

        if (current_points + additional_points < 0) {
            return { error: errorCodes.INSUFFICIENT_POINTS_ERROR };
        }

        const [resultSetHeader] = await pool.query(sql, [current_points + additional_points, userId]);

        return { status: "success" };

    } catch (error) {
        return { error: errorCodes.DATABASE_ERROR };
    }
}

async function followProfile(follower_id, followed_id) {
    try {
        const { error: error_follower } = await getProfileWithUserId(follower_id);
        const { error: error_followed } = await getProfileWithUserId(followed_id);
        const { updateDecision, error: validityError } = await verifyFollow(follower_id, followed_id);
        if (error_follower || error_followed) {
            throw { error: errorCodes.PROFILE_NOT_FOUND };
        }
        if (validityError) {
            throw { error: errorCodes.FOLLOWERSHIP_ALREADY_EXISTS };
        }
        if (updateDecision == true) {
            const query_follow = "UPDATE user_follow SET follow_status = ? WHERE follower_id = ? AND followed_id = ?)";
            const values = [true, follower_id, followed_id];
            const [resultSetHeader] = await pool.query(query_follow, values);
            return { status: "success" };
        }
        else {
            const query_follow = "INSERT INTO user_follow (follower_id,followed_id,follow_status) VALUES (?,?,?)";
            const values = [follower_id, followed_id, true];
            const [resultSetHeader] = await pool.query(query_follow, values);
            if (!resultSetHeader.insertId) {
                throw { error: errorCodes.FOLLOWERSHIP_NOT_ADDED };
            }
            return { status: "success" };
        }
    }
    catch (error) {
        return { error: errorCodes.DATABASE_ERROR };
    }

}
async function unfollowProfile(follower_id, followed_id) {
    const query_follow = "UPDATE user_follow SET follow_status = ? WHERE follower_id = ? AND followed_id = ?";
    try {
        
        const { error: error_follower } = await getProfileWithUserId(follower_id);
        const { error: error_followed } = await getProfileWithUserId(followed_id);
        const { error: error_follow } = await verifyUnFollow(follower_id, followed_id);
        if (error_follower || error_followed) {
            throw { error: errorCodes.PROFILE_NOT_FOUND };
        }
        if (error_follow) {
            throw { error: errorCodes.NO_FOLLOWERSHIP_FOUND };
        }
        const values = [false, follower_id, followed_id]
        const [resultSetHeader] = await pool.query(query_follow, values);
        return { status: "success" };

    }
    catch (error) {
        return { error: errorCodes.DATABASE_ERROR };
    }
}
async function followedProfiles(userId) {
    const { error } = await getProfileWithUserId(follower_id);
    if (error) {
        throw { error: errorCodes.PROFILE_NOT_FOUND };
    }
    try {
        const follow_query = "SELECT followed_id FROM user_follow WHERE follower_id = ? AND follow_status = ? "
        const values = [userId, true];
        const [rows] = await pool.query(follow_query, values);
        const followed = rows.map(
            (followership) => { return followership.followed_id }
        );
        return { followed_list: followed };
    } catch (error) {
        return { error: errorCodes.DATABASE_ERROR };
    }
}

async function followerProfiles(userId) {
    const { error } = await getProfileWithUserId(follower_id);
    if (error) {
        throw { error: errorCodes.PROFILE_NOT_FOUND };
    }
    try {
        const follow_query = "SELECT follower_id FROM user_follow WHERE followed_id = ? AND follow_status = ? "
        const values = [userId, true];
        const [rows] = await pool.query(follow_query, values);
        const follower = rows.map(
            (followership) => { return followership.follower_id }
        );
        return { follower_list: follower };
    }
    catch (error) {
        return { error: errorCodes.DATABASE_ERROR };
    }
}
async function getRankPerTag(topic){
    try {
        const query = 'SELECT users.id , users.username, has_domain_point.amount from users, has_domain_point where users.id = has_domain_point.userId AND has_domain_point.topic = ? Order By has_domain_point.amount Desc LIMIT 100';
        const [result] = await pool.query(query, [topic]);
        return {result: result};
    } catch (error) {
        return { error: errorCodes.DATABASE_ERROR };
    }
}

async function updateBadges(userId){
    try {
        const query = 'SELECT userId, topic, RANK() OVER (PARTITION BY topic ORDER BY amount DESC) as userRank FROM has_domain_point where userRank > 4';
        const [result] = await pool.query(query, [userId]);
        const deleteQuery = 'DELETE FROM badges';
        const [_] = await pool.query(deleteQuery, []);
        const insertQuery = 'INSERT INTO badges (userRank, topic, userId) VALUES (?, ?, ?)'
        result.map(async (row)=>{
            const [result] = await pool.query(insertQuery, [row.userRank,row.topic,row.userId]);
        })
        return {result: "Success"};
    } catch (error) {
        return { error: errorCodes.DATABASE_ERROR };
    }
}

module.exports = { getProfileWithProfileId, getProfileWithUserId, addProfile, updateProfile, getBadges, updateBadge, updatePoints, followProfile, unfollowProfile, followerProfiles, followedProfiles,getRankPerTag,updateBadges }
