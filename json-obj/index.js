module.exports = function jsonObj(obj) {
  return JSON.parse(JSON.stringify(obj));
};