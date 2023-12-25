async function attachTimestamp(req, res, next) {
  req.body.created = new Date().toISOString();
  req.body.modified = new Date().toISOString();
  next();
}

module.exports = { attachTimestamp };