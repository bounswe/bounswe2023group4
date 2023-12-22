const cron = require('node-cron');
const pollDB = require('../repositories/PollDB');
const pollService = require('../services/PollService');
const authDB = require('../repositories/AuthorizationDB');
const modDB = require('../repositories/ModeratorDB');
const modService = require('../services/ModeratorService');
const moment = require('moment');
require('dotenv').config();

const jury_size = 9;
const jury_reward_incerase_time_hours = 6;
const jury_reward_percantage = 0.02;
const jury_reward_increase_constant = 2;

async function closeFinishedPolls(){

    const closePolls = process.env.CLOSE_POLLS === 'true';

    if (!closePolls) {
        console.log('Close Poll Routine: CLOSE_POLLS is set to false. Close Poll Routine will do nothing.');
        return;
    }

    try{
        const all_polls = await pollDB.getPolls()

        await Promise.all(all_polls.map(async (pollObject) => {
            if(!pollObject.closingDate){
                handleNoDueDatePoll()
                return
            }
            
            const dueDateHasArrived = checkDueDate(pollObject)

            if (!dueDateHasArrived) {
                const rejectDateHasArrived = checkRejectDate(pollObject);
                
                if (rejectDateHasArrived && pollObject.isOpen) {
                    await pollDB.closePoll(pollObject.id);
                }
                // If poll arrived here, it will stay open
                return;
            }

            if (pollObject.isOpen) {
                await pollDB.closePoll(pollObject.id);
            }

            
            if (!pollObject.lastJuryGathering) {
                //If jury has not gathered before gather and finish
                console.log(pollObject)
                await gatherJuryForPoll(pollObject);
                return
            }
            
            const jury = await checkJuryStatus(pollObject);
            console.log(jury)
            
    
            if (jury.resolved) {
                await gradePoll(pollObject,jury.requests);
                return;
            } 

            const willIncreaseReward = await checkLastGatheringTime(pollObject);

            if (willIncreaseReward) {
                await updateJuryForPoll(pollObject);
            }
        }))
    } catch (error) {
        console.error('Close Poll Routine: Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }

    console.log("Thats all")

}

function checkRejectDate(pollObject){
    if(!pollObject.numericFieldValue || !pollObject.selectedTimeUnit){
        return false
    }
    const convertTimeUnit = {"min":"minutes","h":"hours","day":"days","mth":"months"}
    const pollSelectedTimeUnit = pollObject.selectedTimeUnit;

    const dueDateMoment = moment(pollObject.closingDate);
    const overTime  = moment().diff(dueDateMoment, convertTimeUnit[pollSelectedTimeUnit]);
    const remainingTime = -1 * overTime;


    // If remainingTime is less than reject time, this means poll should be closed
    return remainingTime < pollObject.numericFieldValue;
}

function checkDueDate(pollObject){
    if(!pollObject.closingDate){
        return false
    }
    const dueDateMoment = moment(pollObject.closingDate);
    const overTime  = moment().diff(dueDateMoment, 'seconds');

    // If overTime is positive, this means poll already filled its lifetime
    return overTime >= 0;
}

async function gatherJuryForPoll(pollObject){
    try{
        const all_mods = await modDB.getAllMods()
        const poll_tags = await pollDB.getTagsOfPoll(pollObject.id);
        const pollHasTags = poll_tags.length > 0

        const total_points = await getPollTotalSpentPoint(pollObject.id);
        const jury_reward = Math.round(total_points * jury_reward_percantage);

        await pollDB.updateJuryReward(pollObject.id,jury_reward)

        await Promise.all(all_mods.map(async (mod) => {

            const mod_tags = await modDB.getModTags(mod.id)
            
            if(!pollHasTags){
                await sendPollCloseModRequest(pollObject,mod.id,jury_reward)
                return
            }

            const modHasMatchingTag = mod_tags.some(tag => poll_tags.includes(tag.topic))

            if(modHasMatchingTag){
                await sendPollCloseModRequest(pollObject,mod.id,jury_reward)
            }
        }))

        await pollDB.updateLastJuryGathering(pollObject.id)
    } catch (error) {
        console.error('Close Poll Routine: Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function checkJuryStatus(pollObject){
    try{
        let mod_requests = null ;
        if(pollObject.poll_type === "discrete"){
            mod_requests = await modDB.getAnsweredDiscreteRequestsOfPoll(pollObject.id)
            // id: 2, userId: 1, poll_id: 4, request_type: 'discrete'
            if(mod_requests.length > jury_size){
                return {resolved:true,requests:mod_requests}
            }
        }
        else if(pollObject.poll_type === "continuous"){
            mod_requests = await modDB.getAnsweredContinuousRequestsOfPoll(pollObject.id)
            if(mod_requests.length > jury_size){
                return {resolved:true,requests:mod_requests}
            }
        }
        return {resolved:false,requests:mod_requests}
    }catch (error) {
        console.error('Close Poll Routine: Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function gradePoll(pollObject,mod_requests){
    try{
        if(pollObject.poll_type === "discrete"){

            const choiceFrequency = {};

            mod_requests.forEach(mod_request => {
            const choiceId = mod_request.choice_id;
            choiceFrequency[choiceId] = (choiceFrequency[choiceId] || 0) + 1;
            });

            // Find the most chosen choice_id
            let mostChosenChoiceId;
            let maxFrequency = 0;

            Object.keys(choiceFrequency).forEach(choiceId => {
            if (choiceFrequency[choiceId] > maxFrequency) {
                mostChosenChoiceId = choiceId;
                maxFrequency = choiceFrequency[choiceId];
            }
            });

            const correctChoiceId = mostChosenChoiceId

            

            await pollService.awardWinnersDiscretePoll(pollObject,correctChoiceId)

            await modService.awardJuryDiscretePoll(pollObject,correctChoiceId)
            
            await modDB.deleteModRequestsforPollClose(pollObject.id)
            await pollDB.finalizePoll(pollObject.id)
        }
        else if(pollObject.poll_type === "continuous"){

            // TODO 
            // decide correct answer
            // award winners

            // award Jury

            // await modDB.deleteModRequestsforPollClose(pollObject.id)
            // await pollDB.finalizePoll(pollObject.id)

        }
        return {resolved:false,requests:mod_requests}
    }catch (error) {
        console.error('Close Poll Routine: Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }
}

async function checkLastGatheringTime(pollObject){

    const lastGatheringTime = moment(pollObject.lastJuryGathering);
    const overTime  = moment().diff(lastGatheringTime, 'hours');

    // If overTime is bigger than reward hours, do another gathering
    return overTime >= jury_reward_incerase_time_hours;
}

async function updateJuryForPoll(pollObject){
    
    const new_jury_reward = pollObject.juryReward * jury_reward_increase_constant;

    await pollDB.updateJuryReward(pollObject.id,new_jury_reward)
    await modDB.updateJuryRewardforRequests(pollObject.id,new_jury_reward)

    //TODO
    //Find new mods if possible

}

async function sendPollCloseModRequest(pollObject,userId,reward){/*
    try{
        if(pollObject.poll_type === "discrete"){
            await modDB.createDiscreteRequest(userId,pollObject.id,reward)
        }
        else if(pollObject.poll_type === "continuous"){
            await modDB.createContinuousRequest(userId,pollObject.id,reward)
        }
    }catch (error) {
        console.error('Close Poll Routine: Database Error');
        throw {error: errorCodes.DATABASE_ERROR};
    }*/
    console.log("SENT POLL CLOSE REQUEST poll,user",pollObject.id,userId)

}
//TODO
function handleNoDueDatePoll(){
     // 
}

cron.schedule('*/60 * * * * *', closeFinishedPolls);

module.exports = closeFinishedPolls;