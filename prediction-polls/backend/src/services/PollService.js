const db = require("../repositories/PollDB.js");
const { findUser } = require('../repositories/AuthorizationDB.js');
const errorCodes = require("../errorCodes.js")

function getPolls(req,res){
    db.getPolls()
    .then((rows) => {
        res.json(rows);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({error: errorCodes.DATABASE_ERROR});
    })
}

function getPollWithId(req, res) {
    const pollId = req.params.pollId;
    db.getPollWithId(pollId)
    .then((rows) => {
        if (rows.length === 0) {
            res.status(404).json({error: errorCodes.NO_SUCH_POLL_ERROR});
        } else {
            const pollType = rows[0].poll_type;
            const responseBody = rows[0];
            if (pollType === 'discrete') {
                getDiscretePollWithId(req, res, responseBody);
            } else if (pollType === 'continuous') {
                getContinuousPollWithId(req, res, responseBody);
            }
        }
    })
}

function getDiscretePollWithId(req,res, responseBody){
    const pollId = req.params.pollId;

    db.getDiscretePollWithId(pollId)
    .then((rows) => {
        if (rows.length === 0) {
            res.status(404).json({error: errorCodes.NO_SUCH_POLL_ERROR});
        } else {
            db.getDiscretePollChoices(pollId)
            .then((choices) => {
                
                const choicesWithVoteCount = choices.map((choice) => {
                    return db.getDiscreteVoteCount(choice.id)
                    .then((voterCount) => {
                        return { ...choice, voter_count: voterCount };
                    })
                });

                Promise.all(choicesWithVoteCount)
                .then((updatedChoices) => {
                    responseBody = { ...responseBody, "poll": rows[0], "options": updatedChoices };
                    res.json(responseBody);
                })
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({error: errorCodes.DATABASE_ERROR});
    })
}

function addDiscretePoll(req,res){
    if (!validateAddDiscretePoll(req.body)) {
        return res.status(400).json({error: errorCodes.BAD_DISCRETE_POLL_REQUEST_ERROR});
    }
    const question = req.body.question;
    const choices = req.body.choices;
    const openVisibility = req.body.openVisibility;
    const setDueDate = req.body.setDueDate;
    const numericFieldValue = req.body.numericFieldValue;
    const dueDatePoll = setDueDate ? new Date(req.body.dueDatePoll).toISOString().split('T')[0] : null;
    const selectedTimeUnit = req.body.selectedTimeUnit;
    const username = req.user.name;

    db.addDiscretePoll(question, username, choices, openVisibility, setDueDate, dueDatePoll, numericFieldValue, selectedTimeUnit)
    .then((result) => {
        res.end(result.toString());
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({error: errorCodes.DATABASE_ERROR});
    });
}

function validateAddDiscretePoll(body) {
    if (
        typeof body !== 'object' ||
        typeof body.question !== 'string' ||
        typeof body.openVisibility !== 'boolean' ||
        typeof body.setDueDate !== 'boolean'
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

function getContinuousPollWithId(req,res, responseBody){
    const pollId = req.params.pollId;

    db.getContinuousPollWithId(pollId)
    .then((rows) => {
        if (rows.length === 0) {
            res.status(404).json({error: errorCodes.NO_SUCH_POLL_ERROR});
        } else {
            db.getContinuousPollVotes(pollId)
            .then((choices) => {
                responseBody = {...responseBody, "poll": rows[0], "options": choices}
                res.json(responseBody)
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({error: errorCodes.DATABASE_ERROR});
    })
}

function addContinuousPoll(req,res){
    if (!validateAddContinuousPoll(req.body)) {
        return res.status(400).json({error: errorCodes.BAD_CONT_POLL_REQUEST_ERROR});
    }

    const question = req.body.question;
    const cont_poll_type = req.body.cont_poll_type;
    const openVisibility = req.body.openVisibility;
    const setDueDate = req.body.setDueDate;
    const numericFieldValue = req.body.numericFieldValue;
    const dueDatePoll = setDueDate ? new Date(req.body.dueDatePoll).toISOString().split('T')[0] : null;
    const selectedTimeUnit = req.body.selectedTimeUnit;
    const username = req.user.name;

    db.addContinuousPoll(question, username, cont_poll_type, openVisibility, setDueDate, dueDatePoll, numericFieldValue, selectedTimeUnit)
    .then((result) => {
        res.end(result.toString());
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({error: errorCodes.DATABASE_ERROR});
    });
}

function validateAddContinuousPoll(body) {
    if (
        typeof body !== 'object' ||
        typeof body.question !== 'string'
    ) {
        return false;
    }
    
    return true;
}

function voteDiscretePoll(req,res){
    const pollId = req.params.pollId;
    const userId = req.user.id;
    const choiceId = req.body.choiceId;

    db.getDiscretePollChoices(pollId)
    .then((choices) => {
        const choiceExists = choices.some(choice => choice.id === choiceId);
        if (!choiceExists) {
            res.status(404).json({error: errorCodes.CHOICE_DOES_NOT_EXIST_ERROR});
        } else {
            db.voteDiscretePoll(pollId, userId, choiceId)
            .then(() => {
                res.json({ message: "Vote Successful" });
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({error: errorCodes.DATABASE_ERROR});
    })
}

function voteContinuousPoll(req,res){
    const pollId = req.params.pollId;
    const userId = req.user.id;
    const choice = req.body.choice;

    db.getContinuousPollWithId(pollId)
    .then((result) => {
        const minValue = result[0].min_value;
        const maxValue = result[0].max_value;
        const choiceValid = minValue <= choice && choice <= maxValue;
        if (!choiceValid) {
            res.status(400).json({error: errorCodes.CHOICE_OUT_OF_BOUNDS_ERROR});
        } else {
            db.voteContinuousPoll(pollId, userId, choice)
            .then(() => {
                res.json({ message: "Vote Successful" });
            })
        }
    })
}

module.exports = {getPolls, getPollWithId, addDiscretePoll, addContinuousPoll, voteDiscretePoll, voteContinuousPoll}