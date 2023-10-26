const authenticator = require("../services/AuthorizationService.js");
const service = require("../services/PollService.js");
const express = require('express');
const router = express.Router();



router.get('/discrete', authenticator.authorizeAccessToken, service.getDiscretePolls);

router.post('/discrete', authenticator.authorizeAccessToken, service.addDiscretePoll);

router.get('/continuous', authenticator.authorizeAccessToken, service.getContinuousPolls);

router.post('/continuous', authenticator.authorizeAccessToken, service.addContinuousPoll);

