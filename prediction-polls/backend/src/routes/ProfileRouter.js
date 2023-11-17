const authenticator = require("../services/AuthorizationService.js");
const service = require("../services/ProfileService.js");
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /polls/discrete:
 *   get:
 *     tags:
 *       - polls
 *     description: Get profile using profile id
 */
router.get('/:profileId', service.getProfileWithProfileId);

/**
 * @swagger
 * /polls/discrete:
 *   get:
 *     tags:
 *       - polls
 *     description: Get profile using user data
 */

router.get('/', service.getProfile);

router.post('/', service.addProfile);

router.patch('/', service.updateProfile);



module.exports = router;