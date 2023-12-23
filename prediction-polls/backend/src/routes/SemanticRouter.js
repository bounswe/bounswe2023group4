const service = require("../services/SemanticService.js");
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * paths:
 *  /semantic/search:
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
router.get('/search', service.getTagsForKeyword);

module.exports = router;