const service = require("../services/AuthorizationService.js")
const googleService = require("../services/AuthGoogleService.js")
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /auth/:
 *   get:
 *     description: Get data after authentication. Include Header Authorization set to "BEARER {access-key}"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                key:
 *                  type: string
 */
router.get('/', service.authorizeAccessToken, service.homePage)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Create session data for the user. username property can be also filled with email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *          
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                refreshToken:
 *                  type: string
 *       401:
 *         description: Could not find a matching (username, email) - password tuple
 */
router.post("/login", service.logIn)


/**
 * @swagger
 * /auth/access-token:
 *   post:
 *     description: Create access token using refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *       400:
 *         description: A refresh token is needed
 *       401:
 *         description: The refresh token is invalid
 *       
 */
router.post('/access-token', service.createAccessTokenFromRefreshToken)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     description: Delete session data of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       204:
 *         description: Successful response
 *       404:
 *         description: Refresh token not found
 */
router.post('/logout', service.logOut)

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     description: Create new user with the given credentials. Birthday should follow format "YYYY-MM-DD"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               birthday:
 *                 type: string
 * 
 *          
 *     responses:
 *       201:
 *         description: Successful response
 * 
 *       400:
 *         description: Registration failed. See response for more details.
 */
router.post("/signup", service.signup)

/**
 * @swagger
 * /auth/google:
 *   post:
 *     description: Log in using the recieved google data. Put either googleId or code in body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               googleId:
 *                 type: string
 *               code:
 *                 type: string
 *        
 *     responses:
 *       200:
 *         description: Successful response
 * 
 *       403:
 *         description: Google account is not verified.
 * 
 *       500:
 *         description: Server was not able to log in user with the given data.
 */
router.post("/google", googleService.googleLogIn)



module.exports = router;