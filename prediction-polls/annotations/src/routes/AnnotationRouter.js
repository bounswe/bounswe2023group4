const router = require('express').Router();
const service = require("../services/annotationService.js");
const validation = require("../services/ValidationService.js");
const timeService = require("../services/AddTimeService.js");
const contextService = require("../services/addContextService.js");

/**
 * @swagger
 * components:
 *   schemas:
 *     TextPositionSelector:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [TextPositionSelector]
 *           required: true
 *         start:
 *           type: number
 *           required: true
 *         end:
 *           type: number
 *           required: true
 *
 *     TextQuoteSelector:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [TextQuoteSelector]
 *           required: true
 *         exact:
 *           type: string
 *           required: true
 *         prefix:
 *           type: string
 *           required: true
 *         suffix:
 *           type: string
 *           required: true
 *
 *     XPathSelector:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [XPathSelector]
 *           required: true
 *         value:
 *           type: string
 *           required: true
 *
 *     CssSelector:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [CssSelector]
 *           required: true
 *         value:
 *           type: string
 *           required: true
 *
 *     Selector:
 *       oneOf:
 *         - $ref: "#/components/schemas/TextPositionSelector"
 *         - $ref: "#/components/schemas/TextQuoteSelector"
 *         - $ref: "#/components/schemas/XPathSelector"
 *         - $ref: "#/components/schemas/CssSelector"
 *
 *     TargetUri:
 *       type: string
 *       format: uri
 *       required: true
 *
 *     TargetObject:
 *       type: object
 *       properties:
 *         source:
 *           type: string
 *           format: uri
 *           required: true
 *         selector:
 *           $ref: "#/components/schemas/Selector"
 *           required: true
 *
 *     Target:
 *       oneOf:
 *         - $ref: "#/components/schemas/TargetUri"
 *         - $ref: "#/components/schemas/TargetObject"
 *
 *     BodyUri:
 *       type: string
 *       format: uri
 *       required: true
 *
 *     BodyObject:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [TextualBody]
 *           required: true
 *         value:
 *           type: string
 *           required: true
 *         format:
 *           type: string
 *           enum: [text/plain]
 *           required: true
 *
 *     Body:
 *       oneOf:
 *         - $ref: "#/components/schemas/BodyUri"
 *         - $ref: "#/components/schemas/BodyObject"
 *
 *     AnnotationPost:
 *       type: object
 *       properties:
 *         target:
 *           $ref: "#/components/schemas/Target"
 *           required: true
 *           description: The relationship between an Annotation and its Target
 *         body:
 *           $ref: "#/components/schemas/Body"
 *           description: The relationship between an Annotation and its Body
 *         creator:
 *           type: string
 *           minLength: 1
 *           description: The agent responsible for creating the resource
 * 
 *     Annotation:
 *       type: object
 *       required:
 *         - "@context"
 *         - "id"
 *         - "type"
 *         - "target"
 *         - "created"
 *         - "modified"
 *       properties:
 *         "@context":
 *           type: string
 *           description: The Annotation jsonld
 *         id:
 *           type: string
 *           description: The identity of the Annotation, an IRI
 *         type:
 *           type: string
 *           description: The type of the Annotation
 *         target:
 *           $ref: "#/components/schemas/Target"
 *           required: true
 *           description: The relationship between an Annotation and its Target
 *         body:
 *           $ref: "#/components/schemas/Body"
 *           description: The relationship between an Annotation and its Body
 *         creator:
 *           type: string
 *           description: The agent responsible for creating the resource
 *         created:
 *           type: string
 *           description: The time at which the resource was created. The datetime must be a xsd:dateTime with the UTC timezone expressed as "Z".
 *         modified:
 *           type: string
 *           description: The time at which the resource was modified, after creation. Often the same with "created". The datetime must be a xsd:dateTime with the UTC timezone expressed as "Z".
*/

/**
 * @swagger
 * components:
 *   examples:
 *     Basic:
 *       value:
 *         "@context": http://www.w3.org/ns/anno.jsonld
 *         id: http://example.org/anno1
 *         type: Annotation
 *         target: http://example.com/page1
 *         created: 2023-12-10T20:06:46.123Z
 *         modified: 2023-12-10T20:06:46.123Z
 *     WithBodyAndCreator:
 *       value:
 *         "@context": http://www.w3.org/ns/anno.jsonld
 *         id: http://example.org/anno1
 *         type: Annotation
 *         target: http://example.com/page1
 *         body: http://example.org/post1
 *         creator: user1
 *         created: 2023-12-10T20:06:46.123Z
 *         modified: 2023-12-10T20:06:46.123Z
 *     EmbeddedTextBody:
 *       value:
 *         "@context": http://www.w3.org/ns/anno.jsonld
 *         id: http://example.org/anno1
 *         type: Annotation
 *         target: http://example.com/page1
 *         body: 
 *           "type": TextualBody 
 *           value: Example annotation content 
 *           format: text/plain 
 *         creator: user1
 *         created: 2023-12-10T20:06:46.123Z
 *         modified: 2023-12-10T20:06:46.123Z
 *     CSSSelector:
 *       value:
 *         "@context": http://www.w3.org/ns/anno.jsonld
 *         id: http://example.org/anno1
 *         type: Annotation
 *         target: 
 *           source: "http://example.org/page1.html"
 *           selector: 
 *             type: "CssSelector"
 *             value: "#elemid > .elemclass + p"
 *         body: 
 *           "type": TextualBody 
 *           value: Example annotation content 
 *           format: text/plain 
 *         creator: user1
 *         created: 2023-12-10T20:06:46.123Z
 *         modified: 2023-12-10T20:06:46.123Z
 *     XPathSelector:
 *       value:
 *         "@context": http://www.w3.org/ns/anno.jsonld
 *         id: http://example.org/anno1
 *         type: Annotation
 *         target: 
 *           source: "http://example.org/page1.html"
 *           selector: 
 *             type: "XPathSelector"
 *             value: "/html/body/p[2]/table/tr[2]/td[3]/span"
 *         body: 
 *           "type": TextualBody 
 *           value: Example annotation content 
 *           format: text/plain 
 *         creator: user1
 *         created: 2023-12-10T20:06:46.123Z
 *         modified: 2023-12-10T20:06:46.123Z
 *     TextQuoteSelector:
 *       value:
 *         "@context": http://www.w3.org/ns/anno.jsonld
 *         id: http://example.org/anno1
 *         type: Annotation
 *         target: 
 *           source: "http://example.org/page1"
 *           selector: 
 *             type: "TextQuoteSelector"
 *             exact: "anotation"
 *             prefix: "this is an "
 *             suffix: " that has some"
 *         body: 
 *           "type": TextualBody 
 *           value: "This seems to be a typo."
 *           format: text/plain 
 *         creator: user1
 *         created: 2023-12-10T20:06:46.123Z
 *         modified: 2023-12-10T20:06:46.123Z
 *     TextPositionSelector:
 *       value:
 *         "@context": http://www.w3.org/ns/anno.jsonld
 *         id: http://example.org/anno1
 *         type: Annotation
 *         target: 
 *           source: "http://example.org/page1"
 *           selector: 
 *             type: "TextPositionSelector"
 *             start: 412
 *             end: 795
 *         body: 
 *           "type": TextualBody 
 *           value: "Example annotation content."
 *           format: text/plain 
 *         creator: user1
 *         created: 2023-12-10T20:06:46.123Z
 *         modified: 2023-12-10T20:06:46.123Z
 */

/**
 * @swagger
 * components:
 *   examples:
 *     PostBasic:
 *       value:
 *         target: /page1
 *     PostWithBodyAndCreator:
 *       value:
 *         target: /page1
 *         body: http://example.org/post1
 *         creator: user1
 *     PostEmbeddedTextBody:
 *       value:
 *         target: /page1
 *         body: 
 *           "type": TextualBody 
 *           value: Example annotation content 
 *           format: text/plain 
 *         creator: user1
 *     PostCSSSelector:
 *       value:
 *         target: 
 *           source: "/page1.html"
 *           selector: 
 *             type: "CssSelector"
 *             value: "#elemid > .elemclass + p"
 *         body: 
 *           "type": TextualBody 
 *           value: Example annotation content 
 *           format: text/plain 
 *         creator: user1
 *     PostXPathSelector:
 *       value:
 *         target: 
 *           source: "/page1.html"
 *           selector: 
 *             type: "XPathSelector"
 *             value: "/html/body/p[2]/table/tr[2]/td[3]/span"
 *         body: 
 *           "type": TextualBody 
 *           value: Example annotation content 
 *           format: text/plain 
 *         creator: user1
 *     PostTextQuoteSelector:
 *       value:
 *         target: 
 *           source: "/page1"
 *           selector: 
 *             type: "TextQuoteSelector"
 *             exact: "anotation"
 *             prefix: "this is an "
 *             suffix: " that has some"
 *         body: 
 *           "type": TextualBody 
 *           value: "This seems to be a typo."
 *           format: text/plain 
 *         creator: user1
 *     PostTextPositionSelector:
 *       value:
 *         target: 
 *           source: "/page1"
 *           selector: 
 *             type: "TextPositionSelector"
 *             start: 412
 *             end: 795
 *         body: 
 *           "type": TextualBody 
 *           value: "Example annotation content."
 *           format: text/plain 
 *         creator: user1
 */

/**
 * @swagger
 * components:
 *   examples:
 *     UpdatedBodyExample:
 *       value: 
 *         "type": TextualBody 
 *         value: "Updated Annotation Body"
 *         format: text/plain 
 */

/**
 * @swagger
 * /annotations:
 *   get:
 *     summary: Returns the list of Annotations according to query parameters
 *     parameters:
 *       - in: query
 *         name: creator
 *         schema:
 *           type: string
 *         description: The creator of the Annotation
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *         description: The source of the Target of the Annotations
 *     responses:
 *       200:
 *         description: The list of the books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: "#/components/schemas/Annotation"
 *             examples:
 *               Basic:
 *                 $ref: "#/components/examples/Basic" 
 *               WithBodyAndCreator:
 *                 $ref: "#/components/examples/WithBodyAndCreator" 
 *               EmbeddedTextBody:
 *                 $ref: "#/components/examples/EmbeddedTextBody" 
 *               CSSSelector:
 *                 $ref: "#/components/examples/CSSSelector" 
 *               XPathSelector:
 *                 $ref: "#/components/examples/XPathSelector" 
 *               TextQuoteSelector:
 *                 $ref: "#/components/examples/TextQuoteSelector" 
 *               TextPositionSelector:
 *                 $ref: "#/components/examples/TextPositionSelector" 
 */
router.get('/', service.getAnnotations);

/**
 * @swagger
 * /annotations/{id}:
 *   get:
 *     summary: Get an annotation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the annotation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of the books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: "#/components/schemas/Annotation"
 *             examples:
 *               Basic:
 *                 $ref: "#/components/examples/Basic" 
 *               WithBodyAndCreator:
 *                 $ref: "#/components/examples/WithBodyAndCreator" 
 *               EmbeddedTextBody:
 *                 $ref: "#/components/examples/EmbeddedTextBody" 
 *               CSSSelector:
 *                 $ref: "#/components/examples/CSSSelector" 
 *               XPathSelector:
 *                 $ref: "#/components/examples/XPathSelector" 
 *               TextQuoteSelector:
 *                 $ref: "#/components/examples/TextQuoteSelector" 
 *               TextPositionSelector:
 *                 $ref: "#/components/examples/TextPositionSelector" 
 *       404:
 *         description: Annotation not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', service.getAnnotationWithId);

/**
 * @swagger
 * /annotations:
 *   post:
 *     summary: Create a new annotation
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AnnotationPost"
 *           examples:
 *             Basic:
 *               $ref: "#/components/examples/PostBasic" 
 *             WithBodyAndCreator:
 *               $ref: "#/components/examples/PostWithBodyAndCreator" 
 *             EmbeddedTextBody:
 *               $ref: "#/components/examples/PostEmbeddedTextBody" 
 *             CSSSelector:
 *               $ref: "#/components/examples/PostCSSSelector" 
 *             XPathSelector:
 *               $ref: "#/components/examples/PostXPathSelector" 
 *             TextQuoteSelector:
 *               $ref: "#/components/examples/PostTextQuoteSelector" 
 *             TextPositionSelector:
 *               $ref: "#/components/examples/PostTextPositionSelector" 
 *     responses:
 *       '200':
 *         description: Successfully created annotation
 *       '400':
 *         description: Bad Request - Invalid input data
 */
router.post('/', validation.validate, contextService.attachContext, timeService.attachTimestamp, service.createAnnotation);

/**
 * @swagger
 * /annotations/{id}:
 *   delete:
 *     summary: Delete an annotation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the annotation to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Annotation deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Annotation not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete('/:id', service.deleteAnnotationWithId);

/**
 * @swagger
 * /annotations/{id}:
 *   patch:
 *     summary: Update the body of an annotation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the annotation to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated body of the annotation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Body"
 *           examples:
 *             BodyUpdateExample:
 *               $ref: "#/components/examples/UpdatedBodyExample"
 *     responses:
 *       200:
 *         description: Annotation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request - Invalid request body format
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *       404:
 *         description: Annotation not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.patch('/:id', validation.validatePatchBody, service.patchAnnotationWithId);


module.exports = router;