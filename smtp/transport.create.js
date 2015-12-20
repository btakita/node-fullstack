/*
 See http://adilapapaya.com/docs/nodemailer/

 smtpTransport.sendMail(mailOptions, function(error, response){
 if (error) {
 console.log(error);
 } else {
 console.log('Message sent: ' + response.message);
 }

 // if you don't want to use this transport object anymore, uncomment following line
 smtpTransport.close(); // shut down the connection pool, no more messages
 });
 */
var env = require('../node.env')
  , nodemailer = require('nodemailer')
  , smtpTransport = require('nodemailer-smtp-transport')
  , logPrefix = 'node-fullstack/smtp/transport.create'
  ;
module.exports = function transportCreate() {
  if (env.test) {
    console.log(logPrefix+'|1');
    return nodemailer.createTransport(require('nodemailer-stub-transport')());
  } else {
    console.log(logPrefix+'|2');
    var params = {
      host: env.smtpHost,
      port: env.smtpPort,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPassword
      },
      secureConnection: 'false',
      tls: { ciphers: 'SSLv3' }
    };
    return nodemailer.createTransport(smtpTransport(params));
  }
};
