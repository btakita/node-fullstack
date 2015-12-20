module.exports = function deleteNullAttributes(obj) {
  for (var m in obj) {
    if (obj.hasOwnProperty(m)) {
      if (obj[m] == null) {
        delete obj[m];
      }
    }
  }
};