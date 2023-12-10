const db = require("../repositories/ModeratorDB.js");
const pollDb = require("../repositories/PollDB.js");
const { findUser } = require('../repositories/AuthorizationDB.js');
const errorCodes = require("../errorCodes.js")
const topics = require('../routines/topics.json');


async function controlModRole(req,res,next){
    const userId = req.user.id;
    try{
        const result = await findUser({userId});
        if(result.error){
            throw errorCodes.USER_NOT_FOUND
        }

        if(result.isMod == undefined || result.isMod == false){
            throw errorCodes.USER_IS_NOT_MODERATOR
        }
        next();
    }
    catch(error){
        return res.status(500).json({error:error});
    }
}

async function makeMod(req,res){
    const userId = req.body.userId;
    try{
        const appointing = await db.makeMod(userId);
        if(appointing.error){
            throw errorCodes.USER_NOT_FOUND
        }
        return res.status(200).json({status:"success"});
    }
    catch(error){
        return res.status(400).json({error:error});
    }
}

async function getModTags(req,res){
    const userId = req.user.id;
    try{
        const mod_tags = await db.getModTags(userId);
        const all_tags_json = topics.topics.map((main_topic) => {
            // Check whether the tag is stored in db
            const isSelected = mod_tags.some(mod_tag => mod_tag.topic === main_topic.name)
            if(isSelected) {
                return {topic:main_topic.name,isSelected:1};
            }
            else{
                return {topic:main_topic.name,isSelected:0};
            }
        })
        return res.status(200).json(all_tags_json);
    }
    catch(error){
        return res.status(400).json({error:error});
    }
}

async function updateTags(req,res){
    const userId = req.user.id;
    const mod_tag_topic = req.body.topic;
    const isSelected = req.body.isSelected;

    if(isSelected == undefined || mod_tag_topic == undefined){
        return res.status(400).json({error:errorCodes.INSUFFICIENT_DATA});
    }
    try{
        if(!isSelected){
            const delete_result = await db.deleteModTag(userId,mod_tag_topic);
        }
        else{
            const add_result = await db.addModTag(userId,mod_tag_topic);
        }
        return res.status(200).json({status:"success"});
    }
    catch(error){
        return res.status(400).json({error:error});
    }
} 

async function getModRequests(req,res){
    const userId = req.user.id;

    try{
        const mod_requests = await db.getModRequests(userId);
        if(mod_requests.error){
            throw mod_requests.error
        }
        return res.status(200).json(mod_requests);
    }
    catch(error){
        return res.status(400).json({error:error});
    }
} 

async function answerRequest(req,res){
    const userId = req.user.id;
    const requestId = req.body.requestId;

    try{
        const [user_has_request] = await db.checkRequestOfUser(requestId,userId);
        if(user_has_request.error){
            throw errorCodes.USER_DOES_NOT_HAVE_REQUEST_ID;
        }

        if(user_has_request.request_type == "report"){
            const ban_poll = req.body.banPoll;
            if(ban_poll == undefined){
                throw errorCodes.REPORT_REQUEST_INVALID_BODY
            }
            const decision_set = await db.setDecisionOnReportRequest(requestId,ban_poll)
            if(decision_set.error){
                throw decision_set.error
            }
            return res.status(200).json({status:"success"});
        }
        if(user_has_request.request_type == "discrete"){
            const discrete_choice = req.body.choice;
            if(discrete_choice == undefined){
                throw errorCodes.DISCRETE_POLL_REQUEST_INVALID_BODY
            }
            const decision_result = await db.setDecisionOnDiscreteRequest(requestId,discrete_choice)
            if(decision_result.error){
                throw decision_result.error
            }
            return res.status(200).json({status:"success"});
        }
        if(user_has_request.request_type == "continuous"){
            const continuous_choice = req.body.choice;
            if(continuous_choice == undefined){
                throw errorCodes.CONTINUOUS_POLL_REQUEST_INVALID_BODY;
            }

            const [request_poll] = await pollDb.getContinuousPollWithId(user_has_request.poll_id)
            if(request_poll.error){
                throw errorCodes.MOD_REQUEST_SHOWS_INVALID_POLL
            }
            const contPollType = request_poll.cont_poll_type

            const decision_result = await db.setDecisionOnContinuousRequest(requestId,continuous_choice,contPollType);
            if(decision_result.error){
                throw decision_result.error
            }
            return res.status(200).json({status:"success"});
        }
        return res.status(500).json({error:errorCodes.REQUEST_HAS_INVALID_TYPE})
    
    }
    catch(error){
        return res.status(400).json({error:error});
    }

}


module.exports = {controlModRole, makeMod, getModTags, updateTags, getModRequests, answerRequest}