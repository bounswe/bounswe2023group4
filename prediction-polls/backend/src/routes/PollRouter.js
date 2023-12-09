const authenticator = require("../services/AuthorizationService.js");
const service = require("../services/PollService.js");
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   objects:
 *     pollObject:
 *       type: object
 *       required: ["id", "question", "tags", "creatorName", "creatorUsername", "creatorImage", "pollType", "closingDate", "rejectVotes", "isOpen", "comments", "options"]
 *       properties: 
 *         id:
 *           type: integer
 *         question:
 *           type: string
 *         tags:
 *           type: array
 *           items: 
 *             type: string
 *         creatorName:
 *           type: string
 *         creatorUsername:
 *           type: string
 *         creatorImage:
 *           type: string
 *         pollType:
 *           type: string
 *         closingDate:
 *           type: string
 *         rejectVotes:
 *           type: string
 *         isOpen:
 *           type: boolean
 *         cont_poll_type:
 *           type: string
 *         comments:
 *           type: array
 *           items: 
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               content:
 *                 type: string
 *         options:
 *           oneOf:
 *             - type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   choice_text:
 *                     type: string
 *                   poll_id:
 *                     type: integer
 *                   voter_count:
 *                     type: integer
 *             - type: array
 *               items:
 *                 oneOf:
 *                   - type: integer
 *                     example: 9
 *                   - type: string
 *                     example: 2023-11-26
 *   schemas:
 *     error:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           properties:
 *            message:
 *              type: string
 *            code:
 *              type: integer
 */

/**
 * @swagger
 * /polls:
 *   get:
 *     tags:
 *       - polls
 *     description: Get all polls sorted by their total points spent
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/objects/pollObject'
 *             examples:
 *               genericExample:
 *                 value:
 *                   - id: 1
 *                     question: "Who will become POTUS?"
 *                     tags: ["tag1", "tag2"]
 *                     creatorName: "user123"
 *                     creatorUsername: "GhostDragon"
 *                     creatorImage: null
 *                     pollType: "discrete"
 *                     rejectVotes: "5 min"
 *                     closingDate: "2023-11-20T21:00:00.000Z"
 *                     isOpen: 1 
 *                     comments: []
 *                     options:
 *                       - id: 1
 *                         choice_text: "Trumpo"
 *                         poll_id: 1
 *                         voter_count: 0
 *                       - id: 2
 *                         choice_text: "Biden"
 *                         poll_id: 1
 *                         voter_count: 1
 *                   - id: 2
 *                     question: "Test question?"
 *                     tags: ["tag1", "tag2"]
 *                     creatorName: "GhostDragon"
 *                     creatorUsername: "GhostDragon"
 *                     creatorImage: null
 *                     pollType: "continuous"
 *                     rejectVotes: "2 hr"
 *                     closingDate: null
 *                     isOpen: 1 
 *                     cont_poll_type: "numeric"
 *                     comments: []
 *                     options:
 *                       - 7
 *                       - 8
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *             examples:
 *               databaseError:
 *                 value:
 *                   error:
 *                     message: Error while accessing the database.
 *                     code: 3004
 */
router.get('/', service.getFamousPolls);

/**
 * @swagger
 * /polls/my-opened:
 *   get:
 *     tags:
 *       - polls
 *     description: Get all polls opened by user. Has to be authorized.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/objects/pollObject'
 *             examples:
 *               genericExample:
 *                 value:
 *                   - id: 1
 *                     question: "Who will become POTUS?"
 *                     tags: ["tag1", "tag2"]
 *                     creatorName: "user123"
 *                     creatorUsername: "GhostDragon"
 *                     creatorImage: null
 *                     pollType: "discrete"
 *                     rejectVotes: "5 min"
 *                     closingDate: "2023-11-20T21:00:00.000Z"
 *                     isOpen: 1 
 *                     comments: []
 *                     options:
 *                       - id: 1
 *                         choice_text: "Trumpo"
 *                         poll_id: 1
 *                         voter_count: 0
 *                       - id: 2
 *                         choice_text: "Biden"
 *                         poll_id: 1
 *                         voter_count: 1
 *                   - id: 2
 *                     question: "Test question?"
 *                     tags: ["tag1", "tag2"]
 *                     creatorName: "GhostDragon"
 *                     creatorUsername: "GhostDragon"
 *                     creatorImage: null
 *                     pollType: "continuous"
 *                     rejectVotes: "2 hr"
 *                     closingDate: null
 *                     isOpen: 1 
 *                     cont_poll_type: "numeric"
 *                     comments: []
 *                     options:
 *                       - 7
 *                       - 8
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *             examples:
 *               databaseError:
 *                 value:
 *                   error:
 *                     message: Error while accessing the database.
 *                     code: 3004
 */
router.get('/my-opened',authenticator.authorizeAccessToken,service.getOpenedPollsOfUser);

/**
 * @swagger
 * /polls/my-voted:
 *   get:
 *     tags:
 *       - polls
 *     description: Get all polls voted by user. Has to be authorized.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/objects/pollObject'
 *             examples:
 *               genericExample:
 *                 value:
 *                   - id: 1
 *                     question: "Who will become POTUS?"
 *                     tags: ["tag1", "tag2"]
 *                     creatorName: "user123"
 *                     creatorUsername: "GhostDragon"
 *                     creatorImage: null
 *                     pollType: "discrete"
 *                     rejectVotes: "5 min"
 *                     closingDate: "2023-11-20T21:00:00.000Z"
 *                     isOpen: 1 
 *                     comments: []
 *                     options:
 *                       - id: 1
 *                         choice_text: "Trumpo"
 *                         poll_id: 1
 *                         voter_count: 0
 *                       - id: 2
 *                         choice_text: "Biden"
 *                         poll_id: 1
 *                         voter_count: 1
 *                   - id: 2
 *                     question: "Test question?"
 *                     tags: ["tag1", "tag2"]
 *                     creatorName: "GhostDragon"
 *                     creatorUsername: "GhostDragon"
 *                     creatorImage: null
 *                     pollType: "continuous"
 *                     rejectVotes: "2 hr"
 *                     closingDate: null
 *                     isOpen: 1 
 *                     cont_poll_type: "numeric"
 *                     comments: []
 *                     options:
 *                       - 7
 *                       - 8
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *             examples:
 *               databaseError:
 *                 value:
 *                   error:
 *                     message: Error while accessing the database.
 *                     code: 3004
 */
router.get('/my-voted',authenticator.authorizeAccessToken,service.getVotedPollsOfUser);

/**
 * @swagger
 * /polls/{pollId}:
 *   get:
 *     tags:
 *       - polls
 *     description: Get discrete poll with id
 *     parameters:
 *       - in: path
 *         name: pollId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the poll.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/objects/pollObject'
 *             examples:
 *               discrete:
 *                 value:
 *                   id: 1
 *                   question: "Who will become POTUS?"
 *                   tags: ["tag1", "tag2"]
 *                   creatorName: "user123"
 *                   creatorUsername: "GhostDragon"
 *                   creatorImage: null
 *                   pollType: "discrete"
 *                   rejectVotes: "5 min"
 *                   closingDate: "2023-11-20T21:00:00.000Z"
 *                   isOpen: 1 
 *                   comments: [] 
 *                   options:
 *                     - id: 1
 *                       choice_text: "Trumpo"
 *                       poll_id: 1
 *                       voter_count: 0
 *                     - id: 2
 *                       choice_text: "Biden"
 *                       poll_id: 1
 *                       voter_count: 1
 *               continuousNumeric:
 *                 value:
 *                   id: 2
 *                   question: "Test question?"
 *                   tags: ["tag1", "tag2"]
 *                   creatorName: "GhostDragon"
 *                   creatorUsername: "GhostDragon"
 *                   creatorImage: null
 *                   pollType: "continuous"
 *                   rejectVotes: "2 hr"
 *                   closingDate: null
 *                   isOpen: 1 
 *                   cont_poll_type: "numeric"
 *                   comments: []
 *                   options:
 *                       - 7
 *                       - 8
 *               continuousDate:
 *                 value:
 *                   id: 2
 *                   question: "Test question?"
 *                   tags: ["tag1", "tag2"]
 *                   creatorName: "GhostDragon"
 *                   creatorUsername: "GhostDragon"
 *                   creatorImage: null
 *                   pollType: "continuous"
 *                   rejectVotes: "2 hr"
 *                   closingDate: null
 *                   isOpen: 1 
 *                   cont_poll_type: "date"
 *                   comments: []
 *                   options:
 *                       - "2023-12-22T21:00:00.000Z"
 *                       - "2023-12-24T21:00:00.000Z"
 *       404:
 *         description: Resource Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *             examples:
 *               NO_SUCH_POLL_ERROR:
 *                 value:
 *                   error:
 *                     message: No such poll found.
 *                     code: 3005
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *             examples:
 *               databaseError:
 *                 value:
 *                   error:
 *                     message: Error while accessing the database.
 *                     code: 3004
 */
router.get('/:pollId', service.getPollWithId);

/**
 * @swagger
 * /polls/discrete:
 *   post:
 *     tags:
 *       - polls
 *     description: Create a discrete poll with choices
 *     requestBody:
 *       description: Poll details and choices
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: ["question", "choices", "openVisibility", "setDueDate"]
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               choices:
 *                 type: array
 *                 items:
 *                   type: string
 *               openVisibility:
 *                 type: boolean
 *               setDueDate:
 *                 type: boolean
 *               dueDatePoll:
 *                 type: string
 *               numericFieldValue:
 *                 type: integer
 *               selectedTimeUnit:
 *                 type: string
 *           examples:
 *             setDueDateTrue:
 *               value:
 *                 question: Question 4
 *                 choices:
 *                   - choice 1
 *                   - choice 2
 *                 openVisibility: true
 *                 setDueDate: true
 *                 dueDatePoll: 2023-11-21T11:39:00+03:00
 *                 numericFieldValue: 2
 *                 selectedTimeUnit: min
 *             setDueDateFalse:
 *               value:
 *                 question: Question 4
 *                 choices:
 *                   - choice 1
 *                   - choice 2
 *                 openVisibility: true
 *                 setDueDate: false
 *     responses:
 *       201:
 *         description: true
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *             examples:
 *               badRequest:
 *                 value:
 *                   error:
 *                     message: Bad request body for creating a discrete poll.
 *                     code: 4000
 *               ACCESS_TOKEN_INVALID_ERROR:
 *                 value:
 *                   error:
 *                     message: The access token is invalid.
 *                     code: 1002
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *             examples:
 *               ACCESS_TOKEN_INVALID_ERROR:
 *                 value:
 *                   error:
 *                     message: The access token is invalid.
 *                     code: 1002
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *             examples:
 *               databaseError:
 *                 value:
 *                   error:
 *                     message: Error while accessing the database.
 *                     code: 3004
 */
router.post('/discrete', authenticator.authorizeAccessToken, service.addDiscretePoll);

/**
 * @swagger
 * /polls/continuous:
 *   post:
 *     tags:
 *       - polls
 *     description: Create a continuous poll
 *     requestBody:
 *       description: Poll details for a continuous poll
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: ["question", "openVisibility", "setDueDate", "cont_poll_type"]
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               openVisibility:
 *                 type: boolean
 *               setDueDate:
 *                 type: boolean
 *               dueDatePoll:
 *                 type: string
 *               numericFieldValue:
 *                 type: integer
 *               selectedTimeUnit:
 *                 type: string
 *               cont_poll_type:
 *                 type: string
 *           examples:
 *             setDueDateTrueNumeric:
 *               value:
 *                 question: Question 5
 *                 openVisibility: true
 *                 setDueDate: true
 *                 dueDatePoll: 2023-11-21T11:39:00+03:00
 *                 numericFieldValue: 2
 *                 selectedTimeUnit: min
 *                 cont_poll_type: numeric
 *             setDueDateFalseNumeric:
 *               value:
 *                 question: Question 4
 *                 openVisibility: true
 *                 setDueDate: false
 *                 cont_poll_type: numeric
 *             setDueDateTrueDate:
 *               value:
 *                 question: Question 5
 *                 openVisibility: true
 *                 setDueDate: true
 *                 dueDatePoll: 2023-11-21T11:39:00+03:00
 *                 numericFieldValue: 2
 *                 selectedTimeUnit: min
 *                 cont_poll_type: date
 *             setDueDateFalseDate:
 *               value:
 *                 question: Question 4
 *                 openVisibility: true
 *                 setDueDate: false
 *                 cont_poll_type: date
 *     responses:
 *       201:
 *         description: true
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *             examples:
 *               badRequest:
 *                 value:
 *                   error:
 *                     message: Bad request body for creating a continuous poll.
 *                     code: 4001
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *             examples:
 *               ACCESS_TOKEN_INVALID_ERROR:
 *                 value:
 *                   error:
 *                     message: The access token is invalid.
 *                     code: 1002
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *             examples:
 *               databaseError:
 *                 value:
 *                   error:
 *                     message: Error while accessing the database.
 *                     code: 3004
 */
router.post('/continuous', authenticator.authorizeAccessToken, service.addContinuousPoll);

/**
 * @swagger
 * /polls/discrete/{pollId}/vote:
 *   post:
 *     tags:
 *       - polls
 *     description: Submit a vote for a discrete poll
 *     parameters:
 *       - in: path
 *         name: pollId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the discrete poll to vote on.
 *     requestBody:
 *       description: Vote details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               choiceId:
 *                 type: integer
 *                 example: 2
 *               points:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       201:
 *         description: Vote submitted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Poll not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/discrete/:pollId/vote',authenticator.authorizeAccessToken, service.voteDiscretePoll);

/**
 * @swagger
 * /polls/continuous/{pollId}/vote:
 *   post:
 *     tags:
 *       - polls
 *     description: Submit a vote for a continuous poll
 *     parameters:
 *       - in: path
 *         name: pollId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the continuous poll to vote on.
 *     requestBody:
 *       description: Vote details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               choice:
 *                 oneOf:
 *                   - type: integer
 *                     example: 9
 *                   - type: string
 *                     example: 2023-11-26
 *                 points:
 *                   type: integer
 *                   example: 25
 *     responses:
 *       201:
 *         description: Vote submitted successfully
 *       400:
 *         description: Bad request - Choice is out of bounds
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Choice is out of bounds"
 *       404:
 *         description: Poll not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/continuous/:pollId/vote',authenticator.authorizeAccessToken, service.voteContinuousPoll);

/**
 * @swagger
 * /polls/close/{pollId}:
 *   post:
 *     tags:
 *       - polls
 *     description: Close a discrete poll and redistribute its points
 *     parameters:
 *       - in: path
 *         name: pollId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the continuous poll to vote on.
 *     requestBody:
 *       description: Vote details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               choiceId:
 *                 type: integer
 *                 example: 1 
 *     responses:
 *       200:
 *         description: Poll closed successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Poll not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/close/:pollId', authenticator.authorizeAccessToken, service.closePoll);

module.exports = router;

