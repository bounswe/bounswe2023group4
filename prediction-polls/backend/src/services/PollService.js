const db = require("../repositories/PollDB.js");
const {updatePoints} = require("../repositories/ProfileDB.js");
const { findUser,incrementUserParticipate,decrementUserParticipate } = require('../repositories/AuthorizationDB.js');
const errorCodes = require("../errorCodes.js")

const reward_return_rate = 0.9 //Users will only get 90% of total point back when poll rewards are distributed

async function getFamousPolls(req,res){
    try {
        const rows = await db.getFamousPolls();
        const pollObjects = await createPollsJson(rows);
        res.json(pollObjects);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

async function getOpenedPollsOfUser(req,res){
    const userId = req.user.id; 
    try {
        const rows = await db.getOpenedPollsOfUser(userId);
        const pollObjects = await createPollsJson(rows);
        res.json(pollObjects);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

async function getOpenedPollsOfGivenUser(req,res){
    const {userId, username, email} = req.query;
    console.log(userId, username, email);
    try {
        const result = await findUser({userId,username,email})
        if(result.error){
            throw result.error;
        }

        const rows = await db.getOpenedPollsOfUser(result.id);
        const pollObjects = await createPollsJson(rows);
        res.json(pollObjects);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

async function getVotedPollsOfUser(req,res){
    const userId = req.user.id; 
    try {
        const rows = await db.getVotedPollsOfUser(userId);
        const pollObjects = await createPollsJson(rows);
        res.json(pollObjects);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

async function createPollsJson(poll_rows){
    return await Promise.all(poll_rows.map(async (pollObject) => {
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
            "rejectVotes": (pollObject.numericFieldValue && pollObject.selectedTimeUnit) ? `${pollObject.numericFieldValue} ${pollObject.selectedTimeUnit}` : null,
            "isOpen": pollObject.isOpen ? true : false,
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
}

async function getPollWithId(req, res) {
    try {
        const pollId = req.params.pollId;
        const rows = await db.getPollWithId(pollId);
    
        if (rows.length === 0) {
            res.status(404).json({ error: errorCodes.NO_SUCH_POLL_ERROR });
            return;
        }
    
        const tag_rows = await db.getTagsOfPoll(pollId);
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
            "rejectVotes": (pollObject.numericFieldValue && pollObject.selectedTimeUnit) ? `${pollObject.numericFieldValue} ${pollObject.selectedTimeUnit}` : null,
            "isOpen": pollObject.isOpen ? true : false,
            "comments": []
        };
    
        if (pollType === 'discrete') {
            const choices = await db.getDiscretePollChoices(pollId);
    
            const choicesWithVoteCount = await Promise.all(choices.map(async (choice) => {
                const voterCount = await db.getDiscreteVoteCount(choice.id);
                return { ...choice, voter_count: pollObject.openVisibility ? voterCount : null };
            }));
    
            res.json({ ...properties, "options": choicesWithVoteCount });
        } else if (pollType === 'continuous') {
            const contPollRows = await db.getContinuousPollWithId(pollId);
    
            if (contPollRows.length === 0) {
                res.status(404).json({ error: errorCodes.NO_SUCH_POLL_ERROR });
                return;
            }
    
            const choices = await db.getContinuousPollVotes(pollId);
            const newChoices = choices.map(item => item.float_value ? item.float_value : item.date_value);
            res.json({ ...properties, "cont_poll_type": contPollRows[0].cont_poll_type/*, "options": newChoices */});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

async function addDiscretePoll(req, res) {
    try {
        if (!validateAddDiscretePoll(req.body)) {
            return res.status(400).json({ error: errorCodes.BAD_DISCRETE_POLL_REQUEST_ERROR });
        }

        const question = req.body.question;
        const choices = req.body.choices;
        const openVisibility = req.body.openVisibility;
        const setDueDate = req.body.setDueDate;
        const numericFieldValue = req.body.numericFieldValue;
        const dueDatePoll = setDueDate ? new Date(req.body.dueDatePoll).toISOString().split('T')[0] : null;
        const selectedTimeUnit = req.body.selectedTimeUnit;
        const findUserResult = await findUser({userId: req.user.id});
        const username = findUserResult.username;

        const result = await db.addDiscretePoll(
            question,
            username,
            choices,
            openVisibility,
            setDueDate,
            dueDatePoll,
            numericFieldValue,
            selectedTimeUnit
        );

        await incrementUserParticipate(req.user.id);

        res.json({
            success: true,
            newPollId: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
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

async function addContinuousPoll(req, res) {
    try {
        if (!validateAddContinuousPoll(req.body)) {
            return res.status(400).json({ error: errorCodes.BAD_CONT_POLL_REQUEST_ERROR });
        }

        const question = req.body.question;
        const cont_poll_type = req.body.cont_poll_type;
        const setDueDate = req.body.setDueDate;
        const numericFieldValue = req.body.numericFieldValue;
        const dueDatePoll = setDueDate ? new Date(req.body.dueDatePoll).toISOString().split('T')[0] : null;
        const selectedTimeUnit = req.body.selectedTimeUnit;
        const findUserResult = await findUser({userId: req.user.id});
        const username = findUserResult.username;

        const result = await db.addContinuousPoll(
            question,
            username,
            cont_poll_type,
            setDueDate,
            dueDatePoll,
            numericFieldValue,
            selectedTimeUnit
        );

        await incrementUserParticipate(req.user.id);

        res.json({
            success: true,
            newPollId: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
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

async function voteDiscretePoll(req,res){
    try {
        const pollId = req.params.pollId;
        const userId = req.user.id;
        const choiceId = req.body.choiceId;
        const points = req.body.points;
    
        if (points <= 0) {
            res.status(404).json({ error: errorCodes.USER_MUST_GIVE_POINTS_ERROR });
            return;
        }
    
        const choices = await db.getDiscretePollChoices(pollId);
        const choiceExists = choices.some(choice => choice.id === choiceId);
    
        if (!choiceExists) {
            res.status(404).json({ error: errorCodes.CHOICE_DOES_NOT_EXIST_ERROR });
        } else {
            await db.voteDiscretePoll(pollId, userId, choiceId, points ? points : 10);
            await incrementUserParticipate(userId);
            res.status(200).json({ message: "Vote Successful" });
        }
    } catch (error) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(500).json({ error: errorCodes.DATABASE_ERROR });
        }
    }
}

async function voteContinuousPoll(req, res) {
    try {
        const pollId = req.params.pollId;
        const userId = req.user.id;
        const choice = req.body.choice;
        const points = req.body.points;

        if (points <= 0) {
            res.status(404).json({ error: errorCodes.USER_MUST_GIVE_POINTS_ERROR });
            return;
        }

        const result = await db.getContinuousPollWithId(pollId);
        const contPollType = result[0].cont_poll_type;

        await db.voteContinuousPoll(pollId, userId, choice, contPollType, points ? points : 10);
        await incrementUserParticipate(userId);
        res.status(200).json({ message: "Vote Successful" });
    } catch (error) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(500).json({ error: errorCodes.DATABASE_ERROR });
        }
    }
}

async function closePoll(req, res) {
    try {
        const pollIdInput = req.params.pollId;
        const choiceIdInput = req.body.choiceId;

        if (!(/^\d+$/.test(pollIdInput))) {
            throw {error: {code: 5100, message: "pollId not a number."}};
        }

        if (!(typeof choiceIdInput === 'number')) {
            throw {error: {code: 5101, message: "choiceId not a number."}}
        }

        const pollId = parseInt(pollIdInput);
        const choiceId = parseInt(choiceIdInput);

        const rows = await db.getPollWithId(pollId);
        if (rows.length === 0) {
            throw errorCodes.NO_SUCH_POLL_ERROR;
        }

        const pollObject = rows[0];

        if (!pollObject.isOpen) {
            throw {error: {code: 5013, message: "Poll already closed"}};
        }

        if (pollObject.poll_type === 'discrete') {
            const result = await awardWinnersDiscretePoll(pollObject,choiceId);
            res.status(200).json({status: "success"});
        }

        if (pollObject.poll_type === 'continuous') {
            throw {error: {code: 5102, message: "Closing unsupported."}};
        }

    } catch (error) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(500).json({ error: errorCodes.DATABASE_ERROR });
        }
    }
}

async function awardWinnersDiscretePoll(pollObject,choiceId){
    try{
        const pollId = pollObject.id

        const selections = await db.getDiscreteSelectionsWithPollId(pollId);
        const totalPointsBet = selections.reduce((sum, selection) => sum + selection.given_points, 0);
        const correctSelections = selections.filter(selection => selection.choice_id === choiceId);
        const totalCorrectBet = correctSelections.reduce((sum, selection) => sum + selection.given_points, 0);

        const rewardPoints = correctSelections.map((selection) => {
            return {user_id: selection.user_id, reward: Math.floor(totalPointsBet * reward_return_rate * (selection.given_points / totalCorrectBet))}
        })

        await db.distributeRewards(rewardPoints)

        const tag_rows = await db.getTagsOfPoll(pollObject.id);
        await db.distributeDomainPoint(rewardPoints,tag_rows);

        return {status: "success"};
    } catch (error) {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(500).json({ error: errorCodes.DATABASE_ERROR });
        }
    }
}

async function awardWinnersContinuousPoll(pollObject,correctAnswer,cont_type){
    try{
        const total_point_spent = db.getPollTotalSpentPoint(pollObject.id);
        const return_points = reward_return_rate * total_point_spent;

        const selections = await db.getContinuousSelectionsWithPollId(pollId);
        if(cont_type == "float"){
            const answerDiffs = selections.map((selection) => {
                return {
                    "difference" : Math.abs(selection.float_value - correctAnswer ),
                    "user_id":selection.user_id
                }
            })

            // Sort answerDiffs array based on the "difference" property in ascending order
            answerDiffs.sort((a, b) => a.difference - b.difference);

            const section_length = Math.ceil(totalUsers / 8);

            const categorySizes = {
                best: section_length,
                second: section_length * 2,
                third: section_length * 3,
                fourth: section_length * 4,
                remaining: answerDiffs.length
            };

            // Categorize users based on their position in the sorted array
            const allRewardPoints = answerDiffs.map((userGuess, index) => {
                if (index < categorySizes.best) {
                    return {user_id: userGuess.user_id, 
                        reward: Math.floor((return_points * 0.45) / section_length)}
                } else if (index < categorySizes.second) {
                    return {user_id: userGuess.user_id, 
                        reward: Math.floor((return_points * 0.25) / section_length)}
                } else if (index < categorySizes.third) {
                    return {user_id: userGuess.user_id, 
                        reward: Math.floor((return_points * 0.15) / section_length)}
                } else if (index < categorySizes.fourth) {
                    return {user_id: userGuess.user_id, 
                        reward: Math.floor((return_points * 0.05) / section_length)}
                } else {
                    return null
                }
            });

            const rewardPoints = allRewardPoints.filter(rewarding => rewarding != null)

            await db.distributeRewards(rewardPoints)

            const tag_rows = await db.getTagsOfPoll(pollObject.id);
            await db.distributeDomainPoint(rewardPoints,tag_rows);

            return {status: "success"};
        }
        if(cont_type == "date"){

            const answerDiffsDate = selections.map((selection) => {
            const diffInSeconds = Math.abs(new Date(selection.date_value) - new Date(correctDate)) / 1000;
            return {
                "difference": diffInSeconds,
                "user_id": selection.user_id
                };
            });

            // Sort answerDiffsDate array based on the "difference" property in ascending order
            answerDiffsDate.sort((a, b) => a.difference - b.difference);

            const section_length_date = Math.ceil(totalUsers / 8);

            const categorySizesDate = {
                best: section_length_date,
                second: section_length_date * 2,
                third: section_length_date * 3,
                fourth: section_length_date * 4,
                remaining: answerDiffsDate.length
            };

            // Categorize users based on their position in the sorted array
            const allRewardPointsDate = answerDiffsDate.map((userGuess, index) => {
                if (index < categorySizesDate.best) {
                    return {
                        user_id: userGuess.user_id,
                        reward: Math.floor((return_points * 0.45) / section_length_date)
                    };
                } else if (index < categorySizesDate.second) {
                    return {
                        user_id: userGuess.user_id,
                        reward: Math.floor((return_points * 0.25) / section_length_date)
                    };
                } else if (index < categorySizesDate.third) {
                    return {
                        user_id: userGuess.user_id,
                        reward: Math.floor((return_points * 0.15) / section_length_date)
                    };
                } else if (index < categorySizesDate.fourth) {
                    return {
                        user_id: userGuess.user_id,
                        reward: Math.floor((return_points * 0.05) / section_length_date)
                    };
                } else {
                    return null;
                }
            });

            const rewardPoints = allRewardPointsDate.filter(rewarding => rewarding != null);

            await db.distributeRewards(rewardPoints);

            const tag_rows = await db.getTagsOfPoll(pollObject.id);
            await db.distributeDomainPoint(rewardPoints,tag_rows);

            return { status: "success" };
            }
            // If given cont_type is not recognized
            throw errorCodes.INSUFFICIENT_DATA;
    } catch(error){
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(500).json({ error: errorCodes.DATABASE_ERROR });
        }
    }
}

module.exports = { getFamousPolls, getOpenedPollsOfUser, getVotedPollsOfUser, getVotedPollsOfUser, createPollsJson, getPollWithId,
    addDiscretePoll, addContinuousPoll, voteDiscretePoll, voteContinuousPoll, closePoll, awardWinnersDiscretePoll, awardWinnersContinuousPoll}


