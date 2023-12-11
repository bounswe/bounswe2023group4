const router = require('express').Router();
const service = require("../services/annotationService.js");
const validation = require("../services/ValidationService.js");
const timeService = require("../services/AddTimeService.js");
const contextService = require("../services/addContextService.js");

/**
 * @swagger
 * components:
 *   schemas:
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
 *           oneOf:
 *             - type: string
 *             - type: object
 *               properties:
 *                 source: 
 *                   type: string
 *                   description: Source IRI of the resource
 *                 selector:
 *                   oneOf:
 *                     - type: object
 *                       properties:
 *                         "type": 
 *                            type: string
 *                            description: The class of the Selector
 *                         value:
 *                            type: string
 *                            description: The CSS selection path to the Segment OR The xpath to the selected segment
 *                     - type: object
 *                       properties:
 *                         "type": 
 *                            type: string
 *                            description: The class of the Selector
 *                         exact: 
 *                            type: string
 *                            description: A copy of the text which is being selected, after normalization
 *                         prefix: 
 *                            type: string
 *                            description: A snippet of text that occurs immediately before the text which is being selected
 *                         suffix: 
 *                            type: string
 *                            description: The snippet of text that occurs immediately after the text which is being selected.
 *                     - type: object
 *                       properties:
 *                         "type": 
 *                            type: string
 *                            description: The class of the Selector
 *                         start: 
 *                            type: integer
 *                            description: The starting position of the segment of text. The first character in the full text is character position 0, and the character is included within the segment
 *                         end: 
 *                            type: integer
 *                            description: The end position of the segment of text. The character is not included within the segment
 *                     
 *                   description: The relationship between a Specific Resource and a Selector.
 *                 
 *           description: The relationship between an Annotation and its Target
 *         body:
 *           oneOf:
 *             - type: string
 *             - type: object
 *               properties:
 *                 "type":
 *                   type: string
 *                   description: The type of the Textual Body resource. The Body should have the TextualBody class
 *                 value:
 *                   type: string  
 *                   description: The character sequence of the content of the Textual Body  
 *                 format:
 *                   type: string  
 *                   description: The format of the Web Resource's content
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
 * /annotations:
 *   get:
 *     summary: Returns the list of all Annotations
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
router.get('/', service.getAllAnnotations);

router.post('/', validation.validate, contextService.attachContext, timeService.attachTimestamp, service.createAnnotation);

module.exports = router;