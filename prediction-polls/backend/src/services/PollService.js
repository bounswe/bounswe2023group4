const db = require("../repositories/PollDB.js");
const {updatePoints} = require("../repositories/ProfileDB.js");
const { findUser } = require('../repositories/AuthorizationDB.js');
const errorCodes = require("../errorCodes.js")

async function getPolls(req,res){
    try {
        const rows = await db.getPolls();
        const pollObjects = await Promise.all(rows.map(async (pollObject) => {
            const tag_rows = await db.getTagsOfPoll(pollObject.id);

            const properties = {
                "id": pollObject.id,
                "question": pollObject.question,
                "tags": tag_rows,
                "creatorName": pollObject.username,
                "creatorUsername": pollObject.username,
                "creatorImage": null,
                "pollType": pollObject.poll_type,
                "closingDate": pollObject.closingDate,
                "rejectVotes": `${pollObject.numericFieldValue} ${pollObject.selectedTimeUnit}`,
                "isOpen": true,
                "comments": []
            };

            if (properties.pollType === 'discrete') {
                const choices = await db.getDiscretePollChoices(properties.id);

                const choicesWithVoteCount = await Promise.all(choices.map(async (choice) => {
                    const voterCount = await db.getDiscreteVoteCount(choice.id);
                    return { ...choice, voter_count: voterCount };
                }));

                return { ...properties, "options": choicesWithVoteCount };
            } else if (properties.pollType === 'continuous') {
                const contPollRows = await db.getContinuousPollWithId(properties.id);
                const choices = await db.getContinuousPollVotes(properties.id);

                const newChoices = choices.map(item => item.float_value ? item.float_value : item.date_value);

                return { ...properties, "cont_poll_type": contPollRows[0].cont_poll_type, "options": newChoices };
            }
        }))
        res.json(pollObjects);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

function getPollWithId(req, res) {
    const pollId = req.params.pollId;
    db.getPollWithId(pollId)
    .then((rows) => {
        if (rows.length === 0) {
            res.status(404).json({error: errorCodes.NO_SUCH_POLL_ERROR});
        } else {
            db.getTagsOfPoll(pollId).then((tag_rows) => {
                const pollObject = rows[0];
                const pollType = pollObject.poll_type;
                const properties = {
                    "id": pollObject.id,
                    "question": pollObject.question,
                    "tags": tag_rows,
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
                                const newChoices = choices.map(item => item.float_value ? item.float_value : item.date_value);
                                res.json({...properties, "cont_poll_type": rows[0].cont_poll_type, "options": newChoices});
                            })
                        }
                    })
                }
            }).catch(() => {
                
            })
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
    const points = req.body.points;

    if(points <= 0){
        res.status(404).json({error: errorCodes.USER_MUST_GIVE_POINTS_ERROR});
    }

    db.getDiscretePollChoices(pollId)
    .then((choices) => {
        const choiceExists = choices.some(choice => choice.id === choiceId);
        if (!choiceExists) {
            res.status(404).json({error: errorCodes.CHOICE_DOES_NOT_EXIST_ERROR});
        } else {
            db.voteDiscretePoll(pollId, userId, choiceId, points ? points : 10)
            .then(() => {
                res.status(200).json({ message: "Vote Successful" });
            })
            .catch((error) => {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.status(500).json({error: errorCodes.DATABASE_ERROR});
                }
            })
        }
    })
    .catch((error) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(500).json({error: errorCodes.DATABASE_ERROR});
        }
    })
}

function voteContinuousPoll(req,res){
    const pollId = req.params.pollId;
    const userId = req.user.id;
    const choice = req.body.choice;
    const points = req.body.points;

    if(points <= 0){
        res.status(404).json({error: errorCodes.USER_MUST_GIVE_POINTS_ERROR});
    }

    db.getContinuousPollWithId(pollId)
    .then((result) => {
        const contPollType = result[0].cont_poll_type;
        db.voteContinuousPoll(pollId, userId, choice, contPollType, points ? points : 10)
        .then(() => {
            res.status(200).json({ message: "Vote Successful" });
        })
        .catch((error) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(500).json({error: errorCodes.DATABASE_ERROR});
            }
        })
    })
}

module.exports = {getPolls, getPollWithId, addDiscretePoll, addContinuousPoll, voteDiscretePoll, voteContinuousPoll}