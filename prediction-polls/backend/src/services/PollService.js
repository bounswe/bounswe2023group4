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
    const pollId = req.params.pollId;
    // if (!isValidPollId(pollId)) {
        // return res.status(400).json({ error: 'Invalid number parameter' });
    // }
    console.log(pollId);
    db.getDiscretePollWithId(pollId).then((rows) => {
        if (rows.length === 0) {
            res.status(404).end("Resource Not Found");
        } else {
            res.json(rows);
        }
    })
}

// function isValidPollId(value) {
    // return /^[0-9]+$/.test(value);
// }

function addDiscretePoll(req,res){
    if (!validateAddDiscretePoll(req.body)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }
    const question = req.body.question;
    const choices = req.body.choices;

    db.addDiscretePoll(question, choices)
    .then((result) => {
        res.end(result.toString());
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
}

function validateAddDiscretePoll(body) {
    if (
        typeof body !== 'object' ||
        typeof body.question !== 'string'
    ) {
        return false;
    }
    
    if (!Array.isArray(body.choices) || body.choices.length === 0) {
        return false;
    }
    
    if (body.choices.some(choice => typeof choice !== 'string' || choice.trim() === '')) {
        return false;
    }
    
    return true;
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