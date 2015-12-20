var uuid = require('node-uuid')
  , idNew = require('./id.new.js')
  ;
module.exports = function(req, res, next) {
  // TODO: Get from Session-Id Header, or Session Cookie, or create new session id
  var sessionId = req.headers['session-id'] || idNew();
  res.set('session-id', sessionId);
  next();
};