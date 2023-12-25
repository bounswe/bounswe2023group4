const authenticator = require("../services/AuthorizationService.js");
const service = require("../services/ModeratorService.js");
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /moderators/appoint:
 *   post:
 *     tags:
 *       - moderators
 *     description: Appoint a new moderator. Caller must be authorized and must be a mod
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
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
router.post('/appoint',authenticator.authorizeAccessToken,service.controlModRole, service.makeMod);

/**
 * @swagger
 * /moderators/request-promotion:
 *   post:
 *     tags:
 *       - moderators
 *     description: Users sends a request to become a moderator. User must be authorized 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
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
router.post('/request-promotion',authenticator.authorizeAccessToken, service.requestModRole);


/**
 * @swagger
 * /moderators/my-tags:
 *   get:
 *     tags:
 *       - moderators
 *     description: Retrieve moderator's selected favourite tags.
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
 *                   topic:
 *                     type: string
 *                   isSelected:
 *                     type: boolean
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
router.get('/my-tags',authenticator.authorizeAccessToken,service.controlModRole,service.getModTags);


/**
 * @swagger
 * /moderators/my-tags:
 *   post:
 *     tags:
 *       - moderators
 *     description: Update moderator's selected favourite tags.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *               isSelected:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
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
router.post('/my-tags',authenticator.authorizeAccessToken,service.controlModRole,service.updateTags);


/**
 * @swagger
 * /moderators/my-requests:
 *   get:
 *     tags:
 *       - moderators
 *     description: Retrieve moderator requests. These requests let the moderators decide on poll lifecycle. There are 3 types which are report, discrete, continuous
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 request_id:
 *                   type: integer
 *                 request_type:
 *                   type: string
 *                 poll:
 *                   $ref: '#/components/objects/pollObject'
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
router.get('/my-requests',authenticator.authorizeAccessToken,service.controlModRole,service.getModRequests);

/**
 * @swagger
 * /moderators/my-requests:
 *   post:
 *     tags:
 *       - moderators
 *     description: Respond to moderator request. Moderator must choose their choice according to request type.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               request_id:
 *                 type: integer
 *               choice:
 *                 oneOf:
 *                   - type: boolean
 *                     example: false
 *                   - type: integer
 *                     example: 9
 *                   - type: string
 *                     example: 2023-11-26
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
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
router.post('/my-requests',authenticator.authorizeAccessToken,service.controlModRole,service.answerRequest);

module.exports = router;