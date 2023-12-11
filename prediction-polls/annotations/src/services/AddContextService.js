async function attachContext(req, res, next) {
  req.body["@context"] = "http://www.w3.org/ns/anno.jsonld";
  req.body.type = "Annotation";
  next();
}

module.exports = {attachContext};