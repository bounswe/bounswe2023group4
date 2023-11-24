const db = require("../repositories/PollDB.js");
const { findUser } = require('../repositories/AuthorizationDB.js');
const errorCodes = require("../errorCodes.js")

function getPolls(req,res){
    db.getPolls()
    .then((rows) => {
        const pollObjects = rows.map((pollObject) => {
            const properties =  {
                "id": pollObject.id,
                "question": pollObject.question,
                "tags": [],
                "creatorName": pollObject.username,
                "creatorUsername": pollObject.username,
                "creatorImage": null,
                "pollType": pollObject.poll_type,
                "closingDate": pollObject.closingDate,
                "rejectVotes": `${pollObject.numericFieldValue} ${pollObject.selectedTimeUnit}`,
                "isOpen": true,
                "comments": []
            }
            if (properties.pollType === 'discrete') {
                return db.getDiscretePollChoices(properties.id)
                .then((choices) => {
                
                    const choicesWithVoteCount = choices.map((choice) => {
                        return db.getDiscreteVoteCount(choice.id)
                        .then((voterCount) => {
                            return { ...choice, voter_count: voterCount };
                        })
                    });

                    return Promise.all(choicesWithVoteCount)
                    .then((options) => {
                        return {...properties, "options": options};
                    })
                })
            } else if (properties.pollType === 'continuous') {
                return db.getContinuousPollWithId(properties.id)
                .then((rows) => {
                    return db.getContinuousPollVotes(properties.id)
                    .then((choices) => {
                        return {...properties, "cont_poll_type": rows[0].cont_poll_type, "options": choices};
                    })
                })
            }

        });
        Promise.all(pollObjects)
        .then((result) => {
            res.json(result);
        })
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
            const pollObject = rows[0];
            const pollType = pollObject.poll_type;
            const properties = {
                "id": pollObject.id,
                "question": pollObject.question,
                "tags": [],
                "creatorName": pollObject.username,
                "creatorUsername": pollObject.username,
                "creatorImage": null,
                "pollType": pollObject.poll_type,
                "closingDate": pollObject.closingDate,
                "rejectVotes": `${pollObject.numericFieldValue} ${pollObject.selectedTimeUnit}`,
                "isOpen": true,
                "comments": []
            }

            if (pollType === 'discrete') {
                db.getDiscretePollChoices(pollId)
                .then((choices) => {
                
                    const choicesWithVoteCount = choices.map((choice) => {
                        return db.getDiscreteVoteCount(choice.id)
                        .then((voterCount) => {
                            return { ...choice, voter_count: voterCount };
                        })
                    });

                    Promise.all(choicesWithVoteCount)
                    .then((options) => {
                        res.json({...properties, "options": options});
                    })
                })
            } else if (pollType === 'continuous') {
                db.getContinuousPollWithId(pollId)
                .then((rows) => {
                    if (rows.length === 0) {
                        res.status(404).json({error: errorCodes.NO_SUCH_POLL_ERROR});
                    } else {
                        db.getContinuousPollVotes(pollId)
                        .then((choices) => {
                            res.json({...properties, "cont_poll_type": rows[0].cont_poll_type, "options": choices});
                        })
                    }
                })
            }
        }
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
        const contPollType = result[0].cont_poll_type;
        db.voteContinuousPoll(pollId, userId, choice, contPollType)
        .then(() => {
            res.json({ success: true });
        })
    })
}

module.exports = {getPolls, getPollWithId, addDiscretePoll, addContinuousPoll, voteDiscretePoll, voteContinuousPoll}