/*
 See http://adilapapaya.com/docs/nodemailer/

 smtpTransport.sendMail(mailOptions, function(error, response){
   if (error) {
     console.log(error);
   } else {
     console.log("Message sent: " + response.message);
   }

   // if you don't want to use this transport object anymore, uncomment following line
   smtpTransport.close(); // shut down the connection pool, no more messages
 });
 */
var transportCreate = require('./transport.create.js')
  , transport2
  ;
module.exports = function smtpTransport() {
  if (!transport2) transport2 = transportCreate();
  return transport2;
};
