module.exports = function callFn(name) {
  return function(obj) {
    var val = obj && obj[name];
    if (typeof val === 'function') {
      return obj[name]();
    } else {
      return val;
    }
  };
};