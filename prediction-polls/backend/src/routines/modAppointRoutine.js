const cron = require('node-cron');
const pollDB = require('../repositories/PollDB');
const authDB = require('../repositories/AuthorizationDB');
const modDB = require('../repositories/ModeratorDB');
const moment = require('moment');
require('dotenv').config();


const mod_poll_ratio = 15;

const last_login_quota = 3;
const participation_quota = 10;


async function appointMod(){
    try{
        const doModAppointing = process.env.DO_MOD_APPOINTING === 'true';
        if (!doModAppointing) {
            console.log('Mod Appoint Routine : DO_MOD_APPOINTING is set to false. Mod Appoint Routine will do nothing.');
            return;
        }

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
    } catch (error) {
        console.error('Mod Appoint Routine: Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function getPollToModRatio(){
    try{
        const mods = await modDB.getAllMods();
        const poll_count = await pollDB.getPollCount();

        if(mods.error || poll_count.error){
            console.error('Mod Appoint Routine: Database Error');
            return
        }
        return poll_count.poll_count / mods.length

    } catch (error) {
        console.error('Mod Appoint Routine: Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function validateCandidates(mod_candidates){
    try{
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
    } catch (error) {
        console.error('Mod Appoint Routine: Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
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