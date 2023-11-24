const authenticator = require("../services/AuthorizationService.js");
const service = require("../services/ProfileService.js");
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         profile_picture:
 *           type: string
 *         biography:
 *           type: string
 *         birthday:
 *           type: string
 *         isHidden:
 *           type: integer
 * 
 */


/**
 * @swagger
 * /profiles:
 *   get:
 *     tags:
 *       - profiles
 *     description: Get a profile using user info. user id, username or email can be used.If multiple info is provided only the most prioritized one is used 
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: false
 *         schema:
 *           type: integer
 *         description: The ID of the requested profile's user.
 *       - in: path
 *         name: username
 *         required: false
 *         schema:
 *           type: string
 *         description: The username of the requested profile's user.
 *       - in: path
 *         name: email
 *         required: false
 *         schema:
 *           type: string
 *         description: The email of the requested profile's user.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               schema:
 *               $ref: '#/components/schemas/Profile'
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
 *               userNotFoundWithUserId:
 *                 value:
 *                   error:
 *                     code: 2001,
 *                     message: User with the given user id not found
 *               ProfileNotFound:
 *                 value:
 *                   error:
 *                     code: 3000,
 *                     message: Profile not found,
 */
router.get('/', service.getProfile);

/**
 * @swagger
 * /profiles/myProfile:
 *   get:
 *     tags:
 *       - profiles
 *     description: Get your profile.  
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               schema:
 *               $ref: '#/components/schemas/Profile'
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
 *               userNotFoundWithUserId:
 *                 value:
 *                   error:
 *                     code: 2001,
 *                     message: User with the given user id not found
 *               ProfileNotFound:
 *                 value:
 *                   error:
 *                     code: 3000,
 *                     message: Profile not found,
 */
router.get('/myProfile',authenticator.authorizeAccessToken ,service.getMyProfile);

/**
 * @swagger
 * /profiles/{profileId}:
 *   get:
 *     tags:
 *       - profiles
 *     description: Get a profile by profile ID.
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the requested profile.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
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
 *               ProfileNotFound:
 *                 value:
 *                   error:
 *                     code: 3000,
 *                     message: Profile not found,
 */
router.get('/:profileId', service.getProfileWithProfileId);

/**
 * @swagger
 * /profiles:
 *   patch:
 *     tags:
 *       - profiles
 *     description: Update a profile. UserId, username and email only one of them have to be added. The others wont be used
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       201:
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
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
 *               ProfileNotFound:
 *                 value:
 *                   error:
 *                     code: 3003,
 *                     message: Profile could not be updated.
 */
router.patch('/', service.updateProfile);



module.exports = router;