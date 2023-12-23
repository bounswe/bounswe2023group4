const service = require("../services/SemanticService.js");
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   objects:
 *     pollObject:
 *       type: object
 *       required: ["id", "question", "tags", "creatorName", "creatorUsername", "creatorImage", "pollType", "closingDate", "rejectVotes", "isOpen", "comments", "options"]
 *       properties: 
 *         id:
 *           type: integer
 *         question:
 *           type: string
 *         tags:
 *           type: array
 *           items: 
 *             type: string
 *         creatorName:
 *           type: string
 *         creatorUsername:
 *           type: string
 *         creatorImage:
 *           type: string
 *         pollType:
 *           type: string
 *         closingDate:
 *           type: string
 *         rejectVotes:
 *           type: string
 *         isOpen:
 *           type: boolean
 *         cont_poll_type:
 *           type: string
 *         comments:
 *           type: array
 *           items: 
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               content:
 *                 type: string
 *         options:
 *           oneOf:
 *             - type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   choice_text:
 *                     type: string
 *                   poll_id:
 *                     type: integer
 *                   voter_count:
 *                     type: integer
 *             - type: array
 *               items:
 *                 oneOf:
 *                   - type: integer
 *                     example: 9
 *                   - type: string
 *                     example: 2023-11-26
 *   schemas:
 *     error:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           properties:
 *            message:
 *              type: string
 *            code:
 *              type: integer
 */

/**
 * @swagger
 * paths:
 *  /semantic/tagsearch:
 *    get:
 *      summary: Get semantic tags for a keyword
 *      description: Retrieve semantic tags related to a specified keyword.
 *      parameters:
 *        - in: query
 *          name: keyword
 *          required: true
 *          schema:
 *            type: string
 *          description: The keyword for which semantic tags should be retrieved.
 *          default: cimbom
 *      responses:
 *        '200':
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      description: The ID of the semantic tag.
 *                      example: Q495299
 *                    label:
 *                      type: string
 *                      description: The label of the semantic tag.
 *                      example: Galatasaray S.K.
 *                    description:
 *                      type: string
 *                      description: The description of the semantic tag.
 *                      example: Turkish association football team
 *        '400':
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    description: Description of the error.
 *                    example: 'Invalid keyword parameter.'
 *        '500':
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    description: Description of the error.
 *                    example: 'Internal server error.'
 */
router.get('/tagsearch', service.getTagsForKeyword);

/**
 * @swagger
 * paths:
 *   /semantic/pollsearch:
 *     get:
 *       description: Get all polls related to given keyword
 *       parameters:
 *         - in: query
 *           name: keyword
 *           required: true
 *           schema:
 *             type: string
 *           description: The keyword for which semantic tags should be retrieved.
 *           default: cimbom
 *       responses:
 *         200:
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/objects/pollObject'
 *               examples:
 *                 genericExample:
 *                   value:
 *                     - id: 1
 *                       question: "Who will become POTUS?"
 *                       tags: ["tag1", "tag2"]
 *                       creatorName: "user123"
 *                       creatorUsername: "GhostDragon"
 *                       creatorImage: null
 *                       pollType: "discrete"
 *                       rejectVotes: "5 min"
 *                       closingDate: "2023-11-20T21:00:00.000Z"
 *                       isOpen: 1 
 *                       comments: []
 *                       options:
 *                         - id: 1
 *                           choice_text: "Trumpo"
 *                           poll_id: 1
 *                           voter_count: 0
 *                         - id: 2
 *                           choice_text: "Biden"
 *                           poll_id: 1
 *                           voter_count: 1
 *                     - id: 2
 *                       question: "Test question?"
 *                       tags: ["tag1", "tag2"]
 *                       creatorName: "GhostDragon"
 *                       creatorUsername: "GhostDragon"
 *                       creatorImage: null
 *                       pollType: "continuous"
 *                       rejectVotes: "2 hr"
 *                       closingDate: null
 *                       isOpen: 1 
 *                       cont_poll_type: "numeric"
 *                       comments: []
 *                       options:
 *                         - 7
 *                         - 8
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/error'
 *               examples:
 *                 databaseError:
 *                   value:
 *                     error:
 *                       message: Error while accessing the database.
 *                       code: 3004
 */
router.get('/pollsearch', service.getPollsForKeyword);

/**
 * @swagger
 * paths:
 *   /semantic/insert:
 *     post:
 *       summary: Insert a semantic tag for a poll
 *       description: Add a semantic tag to a specified poll using the provided data.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pollId:
 *                   type: integer
 *                   description: The ID of the poll to which the semantic tag should be added.
 *                   example: 34
 *                 semanticTag:
 *                   type: string
 *                   description: The semantic tag to be added to the poll.
 *                   example: "Q213"
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   insertId:
 *                     type: string
 *                     description: The ID of the inserted semantic tag.
 *                   success:
 *                     type: boolean
 *                     description: Indicates whether the insertion was successful.
 *                     example: true
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Description of the error.
 *                     example: 'Bad request, need pollId and semanticTag.'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Description of the error.
 *                     example: 'Internal server error.'
 */
router.post('/insert', service.insertTag);

module.exports = router;