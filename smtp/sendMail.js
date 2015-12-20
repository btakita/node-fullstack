// TODO: batch/smtp.sendMail should use a queue
var smtpTransport = require('./transport')
  , env = require('../node.env')
  , logPrefix = 'node-fullstack/smtp/sendMail'
  ;
module.exports = function smtpSendMail(params, cb) {
  var params2 = Object.assign({
    from: env.emailFrom,
    to: env.emailTo
  }, params);
  smtpTransport().sendMail(params2, function(err, info) {
    console.log(logPrefix+'|sendMail', err, info);
    if (cb) cb(err, info);
  });
  return params2;
};
