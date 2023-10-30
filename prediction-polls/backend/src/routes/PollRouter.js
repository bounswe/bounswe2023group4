const authenticator = require("../services/AuthorizationService.js");
const service = require("../services/PollService.js");
const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /discrete:
 *   get:
 *     description: Get all discrete polls
 *     
 */
router.get('/discrete', service.getDiscretePolls);

/**
 * @swagger
 * /discrete/{pollId}:
 *   get:
 *     description: Get discrete poll with id
 *     
 */
router.get('/discrete/:pollId', authenticator.authorizeAccessToken, service.getDiscretePollWithId);

/**
 * @swagger
 * /discrete:
 *   post:
 *     description: Create new discrete poll
 *     
 */
router.post('/discrete', authenticator.authorizeAccessToken, service.addDiscretePoll);

/**
 * @swagger
 * /continuous:
 *   get:
 *     description: Get all continuous polls
 *     
 */
router.get('/continuous', authenticator.authorizeAccessToken, service.getContinuousPolls);

/**
 * @swagger
 * /continuous/{pollId}:
 *   get:
 *     description: Get continuous poll with id
 *     
 */
router.get('/continuous/:pollId', authenticator.authorizeAccessToken, service.getContinuousPollWithId);

/**
 * @swagger
 * /continuous:
 *   post:
 *     description: Create new continuous poll
 *     
 */
router.post('/continuous', authenticator.authorizeAccessToken, service.addContinuousPoll);

/**
 * @swagger
 * /discrete/{pollId}/vote:
 *   post:
 *     description: vote on a discrete poll
 *     
 */
router.post('/discrete/:pollId/vote',authenticator.authorizeAccessToken, service.voteDiscretePoll);

/**
 * @swagger
 * /continuous/{pollId}/vote:
 *   post:
 *     description: vote on a continuous poll
 *     
 */
router.post('/continuous/:pollId/vote',authenticator.authorizeAccessToken, service.voteContinuousPoll);

module.exports = router;

