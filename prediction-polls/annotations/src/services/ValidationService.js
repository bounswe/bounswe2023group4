const Joi = require("joi");

const textPositionSelectorSchema = Joi.object({
  type: Joi.string().valid('TextPositionSelector').required(),
  start: Joi.number().required(),
  end: Joi.number().required(),
});

const textQuoteSelectorSchema = Joi.object({
  type: Joi.string().valid('TextQuoteSelector').required(),
  exact: Joi.string().required(),
  prefix: Joi.string().required(),
  suffix: Joi.string().required(),
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
  target: targetSchema.required(),
  body: bodySchema,
  creator: Joi.string().min(1)
});

async function validate(req, res, next) {
  const {error, value} = annotationPostSchema.validate(req.body, {abortEarly: false});

  if (error) {
    console.log(error.details);
    return res.status(400).json(error.details);
  }
  next();
}

module.exports = { validate };