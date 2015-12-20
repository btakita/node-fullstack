var logPrefix = 'node-fullstack/core/dom.env/popup';
module.exports = function () {
  console.log(logPrefix);
  window.open.apply(window, arguments);
};
