const url = require('url');

async function attachContext(req, res, next) {
  req.body["@context"] = "http://www.w3.org/ns/anno.jsonld";
  if (typeof req.body.target === 'string') {
    req.body.target = url.resolve(process.env.APP_URI, req.body.target);;
  } else if (typeof req.body.target === 'object') {
    req.body.target.source = url.resolve(process.env.APP_URI, req.body.target.source);
  }
  req.body.type = "Annotation";
  next();
}

module.exports = {attachContext};