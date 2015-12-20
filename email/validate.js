// http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
//var regexp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var regexp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gi;
//http://stackoverflow.com/questions/16424659/check-if-a-string-contains-an-email-address
var regexp2 = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gi;
function emailValidate(email) {
  regexp.lastIndex = 0;
  return regexp.test(email);
}
emailValidate.regexp = regexp;
emailValidate.regexp2 = regexp2;
module.exports = emailValidate;
