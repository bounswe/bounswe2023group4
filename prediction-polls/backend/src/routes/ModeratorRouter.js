const authenticator = require("../services/AuthorizationService.js");
const service = require("../services/ModeratorService.js");
const express = require('express');
const router = express.Router();

router.post('/appoint',authenticator.authorizeAccessToken,service.controlModRole, service.makeMod);

router.get('/my-tags',authenticator.authorizeAccessToken,service.controlModRole,service.getModTags);

router.post('/my-tags',authenticator.authorizeAccessToken,service.controlModRole,service.updateTags);

router.get('/my-requests',authenticator.authorizeAccessToken,service.controlModRole,service.getModRequests);

router.post('/my-requests',authenticator.authorizeAccessToken,service.controlModRole,service.answerRequest);