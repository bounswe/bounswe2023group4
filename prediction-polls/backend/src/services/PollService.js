const db = require("../repositories/PollDB.js");
const errorCodes = require("../errorCodes.js")

function getPolls(req,res){
    db.getPolls()
    .then((rows) => {
        res.json(rows);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ code: errorCodes.DATABASE_ERROR.code, message: errorCodes.DATABASE_ERROR.message});
    })
}

function getPollWithId(req, res) {
    const pollId = req.params.pollId;
    db.getPollWithId(pollId)
    .then((rows) => {
        if (rows.length === 0) {
            res.status(404).json({ code: errorCodes.NO_SUCH_POLL_ERROR.code, message: errorCodes.NO_SUCH_POLL_ERROR.message });
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
            res.status(404).json({ code: errorCodes.NO_SUCH_POLL_ERROR.code, message: errorCodes.NO_SUCH_POLL_ERROR.message });
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
                    responseBody = { ...responseBody, "poll": rows[0], "choices": updatedChoices };
                    res.json(responseBody);
                })
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ code: errorCodes.DATABASE_ERROR.code, message: errorCodes.DATABASE_ERROR.message});
    })
}

function addDiscretePoll(req,res){
    if (!validateAddDiscretePoll(req.body)) {
        return res.status(400).json({ code: errorCodes.BAD_DISCRETE_POLL_REQUEST_ERROR.code, message: errorCodes.BAD_DISCRETE_POLL_REQUEST_ERROR.message });
    }
    const question = req.body.question;
    const choices = req.body.choices;

    db.addDiscretePoll(question, choices)
    .then((result) => {
        res.end(result.toString());
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ code: errorCodes.DATABASE_ERROR.code, message: errorCodes.DATABASE_ERROR.message});
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
        res.status(500).json({ code: errorCodes.DATABASE_ERROR.code, message: errorCodes.DATABASE_ERROR.message});
    })
}

function getContinuousPollWithId(req,res, responseBody){
    const pollId = req.params.pollId;

    db.getContinuousPollWithId(pollId)
    .then((rows) => {
        if (rows.length === 0) {
            res.status(404).json({ code: errorCodes.NO_SUCH_POLL_ERROR.code, message: errorCodes.NO_SUCH_POLL_ERROR.message });
        } else {
            db.getContinuousPollVotes(pollId)
            .then((choices) => {
                responseBody = {...responseBody, "poll": rows[0], "choices": choices}
                res.json(responseBody)
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ code: errorCodes.DATABASE_ERROR.code, message: errorCodes.DATABASE_ERROR.message});
    })
}

function addContinuousPoll(req,res){
    if (!validateAddContinuousPoll(req.body)) {
        return res.status(400).json({ code: errorCodes.BAD_CONT_POLL_REQUEST_ERROR.code, message: errorCodes.BAD_CONT_POLL_REQUEST_ERROR.message });
    }
    const question = req.body.question;
    const min = req.body.min;
    const max = req.body.max;

    if (max <= min) {
        return res.status(400).json({ code: errorCodes.MINMAX_BAD_CONT_POLL_REQUEST_ERROR.code, message: errorCodes.MINMAX_BAD_CONT_POLL_REQUEST_ERROR.message });
    }

    db.addContinuousPoll(question, min, max)
    .then((result) => {
        res.end(result.toString());
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ code: errorCodes.DATABASE_ERROR.code, message: errorCodes.DATABASE_ERROR.message});
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
    const pollId = req.params.pollId;
    const userId = req.user.id;
    const choiceId = req.body.choiceId;

    db.getDiscretePollChoices(pollId)
    .then((choices) => {
        const choiceExists = choices.some(choice => choice.id === choiceId);
        if (!choiceExists) {
            res.status(404).json({ code: errorCodes.CHOICE_DOES_NOT_EXIST_ERROR.code, message: errorCodes.CHOICE_DOES_NOT_EXIST_ERROR.message });
        } else {
            db.voteDiscretePoll(pollId, userId, choiceId)
            .then(() => {
                res.json({ message: "Vote Successful" });
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ code: errorCodes.DATABASE_ERROR.code, message: errorCodes.DATABASE_ERROR.message});
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
            res.status(400).json({ code: errorCodes.CHOICE_OUT_OF_BOUNDS_ERROR.code, message: errorCodes.CHOICE_OUT_OF_BOUNDS_ERROR.message });
        } else {
            db.voteContinuousPoll(pollId, userId, choice)
            .then(() => {
                res.json({ message: "Vote Successful" });
            })
        }
    })
}

module.exports = {getPolls, getPollWithId, addDiscretePoll, addContinuousPoll, voteDiscretePoll, voteContinuousPoll}