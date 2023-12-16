const cron = require('node-cron');
const pollDB = require('../repositories/PollDB');
const authDB = require('../repositories/AuthorizationDB');
const modDB = require('../repositories/ModeratorDB');
const moment = require('moment');


const mod_poll_ratio = 15;

const last_login_quota = 3;
const participation_quota = 10;


async function appointMod(){
    const current_ratio = await getPollToModRatio();

    if(current_ratio < mod_poll_ratio){
        console.log("Mod Appoint Routine: Moderator number is sufficient")
        return
    }

    const mod_promotion_requests = await modDB.getPromotionRequests();
    const mod_candidates = mod_promotion_requests.map((request) => request.userId)

    const valid_candidates = await validateCandidates(mod_candidates)
    if(valid_candidates.length == 0){
        console.log("Mod Appoint Routine: No valid moderator is found")
        return 
    }

    const randomIndex = Math.floor(Math.random() * valid_candidates.length);
    const chosenUser = valid_candidates[randomIndex]
    await modDB.makeMod(chosenUser)
    console.log("Mod Appoint Routine: Appointed user with id "+ chosenUser +" to be the new moderator")
}

async function getPollToModRatio(){
    const mod_count = await modDB.getModCount();
    const poll_count = await pollDB.getPollCount();

    if(mod_count.error || poll_count.error){
        console.error('Mod Appoint Routine: Database Error');
        return
    }
    return poll_count.poll_count / mod_count.mod_count
}

async function validateCandidates(mod_candidates){
    const validated_candidates = await Promise.all(mod_candidates.map(async (user_id) => {
        const userData = await authDB.findUser({userId:user_id});
        if(userData.error ){
            return null
        }
        if(userData.isMod){
            return null
        }
        const LastLoginQuotaHolds = validateLastLogin(userData.last_login);
        if(!LastLoginQuotaHolds){
            return null
        }
        if(userData.participated_polls < participation_quota){
            return null
        }

        return user_id
    }))

    const filtered_candidates = validated_candidates.filter(user_id => user_id !== null);

    return filtered_candidates
}

function validateLastLogin(last_login){
    if(!last_login){
        return false
    }
    const lastLoginMoment = moment(last_login);
    const timeDifference = moment().diff(lastLoginMoment, 'seconds');
    const timeQuota = moment.duration(last_login_quota, 'days').asSeconds();

    // Compare the seconds difference with the fixed duration
    return timeDifference <= timeQuota;
}

cron.schedule('*/30 * * * * *', appointMod);

module.exports = appointMod;