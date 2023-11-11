const db = require("../repositories/PollDB.js");

function getDiscretePolls(req,res){
    db.getDiscretePolls()
    .then((rows) => {
        res.json(rows);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    })
}

function getDiscretePollWithId(req,res){
    const pollId = req.params.pollId;

    db.getDiscretePollWithId(pollId)
    .then((rows) => {
        if (rows.length === 0) {
            res.status(404).end("Resource Not Found");
        } else {
            res.json(rows);
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    })
}

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
    db.getContinuousPolls()
    .then((rows) => {
        res.json(rows);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    })
}

function getContinuousPollWithId(req,res){
    const pollId = req.params.pollId;

    db.getContinuousPollWithId(pollId)
    .then((rows) => {
        if (rows.length === 0) {
            res.status(404).end("Resource Not Found");
        } else {
            res.json(rows);
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    })
}

function addContinuousPoll(req,res){
    if (!validateAddContinuousPoll(req.body)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }
    const question = req.body.question;
    const min = req.body.min;
    const max = req.body.max;

    if (max <= min) {
        return res.status(400).json({ error: 'minValue higher than maxValue' });
    }

    db.addContinuousPoll(question, min, max)
    .then((result) => {
        res.end(result.toString());
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
}

function validateAddContinuousPoll(body) {
    if (
        typeof body !== 'object' ||
        typeof body.question !== 'string' ||
        typeof body.min !== 'number' ||
        typeof body.max !== 'number'
    ) {
        return false;
    }
    
    return true;
}

function voteDiscretePoll(req,res){

}

function voteContinuousPoll(req,res){

}

module.exports = {getDiscretePolls,getDiscretePollWithId,addDiscretePoll,getContinuousPolls,
    getContinuousPollWithId,addContinuousPoll,voteDiscretePoll,voteContinuousPoll}