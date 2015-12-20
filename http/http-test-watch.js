var httpTestWatch = function httpTestWatch(argv) {
  var serverPath = argv[0]
    , path = require('path')
    , fileStatus = require('file-status')
    , fileStatusPath = require('../file-status/path')
    ;
  fileStatus.write(fileStatusPath('http.test.restart.status.json'));
  process.env.NODE_ENV = 'test';
  require(path.resolve(serverPath));
};
module.exports = httpTestWatch;
