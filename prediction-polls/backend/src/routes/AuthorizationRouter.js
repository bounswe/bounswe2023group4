const service = require("../services/AuthorizationService.js")
const googleService = require("../services/AuthGoogleService.js")
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
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
 * /login:
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
 * /access-token:
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
 * /logout:
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
 * /signup:
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

router.get("/googleAuth", googleService.googleLogIn)

module.exports = router;