const service = require("../services/AuthorizationService")
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
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             key:
 *               type: string
 */
router.get('/', service.authorizeAccessToken, service.homePage)


/**
 * @swagger
 * /token:
 *   post:
 *     description: Create access token using refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 */
router.post('/token', service.createAccessTokenFromRefreshToken)

/**
 * @swagger
 * /logout:
 *   delete:
 *     description: Delete session data of the user"
 *     parameters:
 *       - in: path
 *         name: refreshToken
 *         required: true
 *         description: refresh token given in log in 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 */
router.delete('/logout', service.logOut)

/**
 * @swagger
 * /login:
 *   post:
 *     description: Create session data for the user
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
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *             refreshToken:
 *               type: string
 */
router.post("/login", service.logIn)

module.exports = router;