module.exports = function assignFn() {
  return Object.assign.apply(Object, [this].concat(Array.prototype.slice.call(arguments, 0)));
};
