var path = require('path');
module.exports = function fileStatusPath(basename) {
  return path.resolve(path.join('.', 'tmp', basename));
};
