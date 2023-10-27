const authenticator = require("../services/AuthorizationService.js");
const service = require("../services/PollService.js");
const express = require('express');
const router = express.Router();



router.get('/discrete', service.getDiscretePolls);

router.get('/discrete/:pollId', authenticator.authorizeAccessToken, service.getDiscretePollWithId);

router.post('/discrete', authenticator.authorizeAccessToken, service.addDiscretePoll);

router.get('/continuous', authenticator.authorizeAccessToken, service.getContinuousPolls);

router.get('/continuous/:pollId', authenticator.authorizeAccessToken, service.getContinuousPollWithId);

router.post('/continuous', authenticator.authorizeAccessToken, service.addContinuousPoll);

router.post('/discrete/:pollId/vote',authenticator.authorizeAccessToken, service.voteDiscretePoll);

router.post('/continuous/:pollId/vote',authenticator.authorizeAccessToken, service.voteContinuousPoll);

module.exports = router;

