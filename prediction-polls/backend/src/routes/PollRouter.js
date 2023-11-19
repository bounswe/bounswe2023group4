const authenticator = require("../services/AuthorizationService.js");
const service = require("../services/PollService.js");
const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /polls/discrete:
 *   get:
 *     tags:
 *       - polls
 *     description: Get all discrete polls
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties: 
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   question:
 *                     type: string
 *                     example: "Who will become POTUS?"
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
router.get('/discrete', service.getDiscretePolls);

/**
 * @swagger
 * /polls/discrete/{pollId}:
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
 *               properties:
 *                 poll:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     question:
 *                       type: string
 *                       example: "Who will become POTUS?"
 *                 choices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       choice_text:
 *                         type: string
 *                         example: "Trumpo"
 *                       poll_id:
 *                         type: integer
 *                         example: 1
 *                       voter_count:
 *                         type: integer
 *                         example: 0
 *               example:
 *                 poll:
 *                   id: 1
 *                   question: "Who will become POTUS?"
 *                 choices:
 *                   - id: 1
 *                     choice_text: "Trumpo"
 *                     poll_id: 1
 *                     voter_count: 0
 *                   - id: 2
 *                     choice_text: "Biden"
 *                     poll_id: 1
 *                     voter_count: 1
 *
 */
router.get('/discrete/:pollId', authenticator.authorizeAccessToken, service.getDiscretePollWithId);

/**
 * @swagger
 * /polls/discrete/:
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
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Who will become POTUS?"
 *               choices:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Trumpino", "Biden"]
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
 *   get:
 *     tags:
 *       - polls
 *     description: Get a list of continuous polls
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   question:
 *                     type: string
 *                     example: "Test3?"
 *                   min_value:
 *                     type: integer
 *                     example: 6
 *                   max_value:
 *                     type: integer
 *                     example: 10
 *       404:
 *         description: Polls not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/continuous', authenticator.authorizeAccessToken, service.getContinuousPolls);

/**
 * @swagger
 * /polls/continuous/{pollId}:
 *   get:
 *     tags:
 *       - polls
 *     description: Get a specific continuous poll by ID
 *     parameters:
 *       - in: path
 *         name: pollId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the continuous poll.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 poll:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     question:
 *                       type: string
 *                       example: "Test3?"
 *                     min_value:
 *                       type: integer
 *                       example: 6
 *                     max_value:
 *                       type: integer
 *                       example: 10
 *                 choices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       selected_value:
 *                         type: integer
 *                         example: 7
 *       404:
 *         description: Poll not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/continuous/:pollId', authenticator.authorizeAccessToken, service.getContinuousPollWithId);

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
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Test3?"
 *               min:
 *                 type: integer
 *                 example: 6
 *               max:
 *                 type: integer
 *                 example: 10
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

