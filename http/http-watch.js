var httpWatch = function httpWatch(argv) {
  var serverPath = argv[0]
    , path = require('path')
    , fileStatus = require('file-status')
    , fileStatusPath = require('../file-status/path')
    , kexec = require('kexec')
    , logPrefix = 'bin/http-watch'
    ;
  console.log(logPrefix+'|2');
  var envName = process.env.NODE_ENV = process.env.NODE_ENV || process.env.ENV || 'development';
  fileStatus.write(fileStatusPath('http.'+envName+'.restart.status.json'));
  kexec('node-dev "'+path.resolve(serverPath)+'"');
};
module.exports = httpWatch;
