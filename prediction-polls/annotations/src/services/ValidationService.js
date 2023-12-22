const Joi = require("joi");

const textPositionSelectorSchema = Joi.object({
  type: Joi.string().valid('TextPositionSelector').required(),
  start: Joi.number().integer().positive().required(),
  end: Joi.number().integer().positive().min(Joi.ref('start')).required(),
});

const textQuoteSelectorSchema = Joi.object({
  type: Joi.string().valid('TextQuoteSelector').required(),
  exact: Joi.string().required(),
  prefix: Joi.string().required().allow(''),
  suffix: Joi.string().required().allow(''),
});

const xPathSelectorSchema = Joi.object({
  type: Joi.string().valid('XPathSelector').required(),
  value: Joi.string().required(),
});

const cssSelectorSchema = Joi.object({
  type: Joi.string().valid('CssSelector').required(),
  value: Joi.string().required(),
});

const selectorSchema = Joi.alternatives().try(
  textPositionSelectorSchema,
  textQuoteSelectorSchema,
  xPathSelectorSchema,
  cssSelectorSchema
);

const targetUriSchema = Joi.string().uri().required();

const targetObjectSchema = Joi.object({
  source: Joi.string().uri().required(),
  selector: selectorSchema.required(),
});

const targetSchema = Joi.alternatives().try(targetUriSchema, targetObjectSchema);

const bodyUriSchema = Joi.string().uri().required();

const bodyObjectSchema = Joi.object({
  type: Joi.string().valid("TextualBody").required(),
  value: Joi.string().required(),
  format: Joi.string().valid("text/plain").required()
});

const bodySchema = Joi.alternatives().try(bodyUriSchema, bodyObjectSchema);

const annotationPostSchema = Joi.object({
  "@context": Joi.string().valid("http://www.w3.org/ns/anno.jsonld").required(),
  type: Joi.string().valid("Annotation").required(),
  target: targetSchema.required(),
  body: bodySchema,
  creator: Joi.string().uri()
});

async function validate(req, res, next) {
  const contentType = req.get('Content-Type');
  if (contentType !== 'application/ld+json') {
    return res.status(400).send('Invalid Content-Type. It must be application/ld+json.');
  }

  console.log(req.body)

  const {error, value} = annotationPostSchema.validate(req.body);

  if (error) {
    console.log(error.details);
    return res.status(400).json(error.details);
  }
  next();
}

async function validatePatchBody(req, res, next) {
  const {error, value} = bodySchema.validate(req.body);

  if (error) {
    console.log(error.details);
    return res.status(400).json(error.details);
  }
  next();
}

module.exports = { validate, validatePatchBody };