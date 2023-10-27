const db = require("../repositories/PollDB.js");

async function getDiscretePolls(req,res){
    try{
    const result_polls = await db.getDiscretePolls();
    console.log("result_polls")
    console.log(result_polls);
    res.json(result_polls)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

function getDiscretePollWithId(req,res){

}

function addDiscretePoll(req,res){

}

function getContinuousPolls(req,res){

}

function getContinuousPollWithId(req,res){

}

function addContinuousPoll(req,res){

}

function voteDiscretePoll(req,res){

}

function voteContinuousPoll(req,res){

}

module.exports = {getDiscretePolls,getDiscretePollWithId,addDiscretePoll,getContinuousPolls,
    getContinuousPollWithId,addContinuousPoll,voteDiscretePoll,voteContinuousPoll}