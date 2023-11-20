const authenticator = require("../services/AuthorizationService.js");
const service = require("../services/PollService.js");
const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /polls:
 *   get:
 *     tags:
 *       - polls
 *     description: Get all polls
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required: ["id", "question", "poll_type"]
 *                 properties: 
 *                   id:
 *                     type: integer
 *                   question:
 *                     type: string
 *                   poll_type:
 *                     type: string
 *             examples:
 *               genericExample:
 *                 value:
 *                   - id: 1
 *                     question: "Who will become POTUS?"
 *                     poll_type: "discrete"
 *                   - id: 2
 *                     question: "Test3?"
 *                     poll_type: "continuous"
 *                   - id: 3
 *                     question: "Who will become POTUS?"
 *                     poll_type: "discrete"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *             examples:
 *               databaseError:
 *                 value:
 *                   message: Error while accessing the database.
 *                   code: 3000
 */
router.get('/', service.getPolls);

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
 *               type: object
 *               required: ["id", "question", "poll_type", "poll", "choices"]
 *               properties:
 *                 id:
 *                   type: integer
 *                 question:
 *                   type: string
 *                 poll_type:
 *                   type: string
 *                 poll:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                 choices:
 *                   oneOf:
 *                     - type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           choice_text:
 *                             type: string
 *                           poll_id:
 *                             type: integer
 *                           voter_count:
 *                             type: integer
 *                     - type: array
 *                       items:
 *                         type: integer
 * 
 *             examples:
 *               discrete:
 *                 value:
 *                   id: 1
 *                   question: "Who will become POTUS?"
 *                   poll_type: "discrete"
 *                   poll:
 *                     id: 1
 *                   choices:
 *                     - id: 1
 *                       choice_text: "Trumpo"
 *                       poll_id: 1
 *                       voter_count: 0
 *                     - id: 2
 *                       choice_text: "Biden"
 *                       poll_id: 1
 *                       voter_count: 1
 *               continuous:
 *                 value:
 *                   id: 2
 *                   question: "Test question?"
 *                   poll_type: "continuous"
 *                   poll:
 *                     id: 2
 *                     min_value: 6
 *                     max_value: 10
 *                   choices:
 *                     - 7
 *                     - 8   
 */
router.get('/:pollId', authenticator.authorizeAccessToken, service.getPollWithId);

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
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *             examples:
 *               badRequest:
 *                 value:
 *                   message: Bad request body for creating a discrete poll.
 *                   code: 4000
 *               accessTokenNull:
 *                 value:
 *                   message: The access token is null
 *                   code: 1005
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *             examples:
 *               accessTokenInvalid:
 *                 value:
 *                   message: The access token is invalid.
 *                   code: 1001
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *             examples:
 *               databaseError:
 *                 value:
 *                   message: Error while accessing the database.
 *                   code: 3000
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
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *             examples:
 *               badRequest:
 *                 value:
 *                   message: Bad request body for creating a continuous poll.
 *                   code: 4001
 *               MINMAX_BAD_CONT_POLL_REQUEST_ERROR:
 *                 value:
 *                   message: Minimum value allowed was higher than maximum value allowed in the poll.
 *                   code: 4002
 *               accessTokenNull:
 *                 value:
 *                   message: The access token is null
 *                   code: 1005
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *             examples:
 *               accessTokenInvalid:
 *                 value:
 *                   message: The access token is invalid.
 *                   code: 1001
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *             examples:
 *               databaseError:
 *                 value:
 *                   message: Error while accessing the database.
 *                   code: 3000
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
 *                 type: integer
 *                 example: 9
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

module.exports = router;

