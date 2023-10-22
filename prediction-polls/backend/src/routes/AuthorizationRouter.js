const service = require("../services/AuthorizationService.js")
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
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                refreshToken:
 *                  type: string 
 */
router.post("/login", service.logIn)


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
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
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
 *       200:
 *         description: Successful response
 */
router.post('/logout', service.logOut)

/**
 * @swagger
 * /signup:
 *   post:
 *     description: Create new user with the given credentials
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
 */
router.post("/signup", service.signup)

module.exports = router;