var regexp = /^ *(\w+:{0,1}\w*@)?(\S+)(\.[a-zA-Z]{2,})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))? *$/
  ;
module.exports = function(text) {
  return regexp.test(text);
};