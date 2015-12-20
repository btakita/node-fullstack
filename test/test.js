var test = function test(filePath) {
  var config = require('./config')
    , startTime = Date.now()
    , path = require('path')
    , child_process = require('child_process')
    , fileBasename = path.basename(filePath)
    , fileStatus = require('file-status')
    , fileStatusPath = require('../file-status/path')
    , restartServer = !process.env.NO_RESTART_SERVER
    , waitForPort = require('wait-for-port')
    , isFrontEndTest = (fileBasename.indexOf('dom.') > -1) && (fileBasename.indexOf('test.js') > -1)
    , logPrefix = 'node-fullstack/test/test'
    ;
  console.log(logPrefix);
  process.env.NODE_ENV = 'test';
  if (isFrontEndTest) {
    var domTestOptions = require('./dom.test.options')(path.resolve(filePath));
    if (domTestOptions.exists) {
      var testStatusBasename = path.basename(domTestOptions.test) + '.status.json';
      waitToExecCasperTest(domTestOptions, testStatusBasename, execCasperTest);
    } else {
      throw domTestOptions.errorMessage;
    }
  } else {
    waitToExecNodeTest(execNodeTest);
  }
  function waitToExecNodeTest(fn) {
    var serverStatusBasename = 'http.test.server.status.json'
      , restartStatusBasename = 'http.test.restart.status.json'
      ;
    waitToExecNodeTest2(serverStatusBasename, restartStatusBasename, Date.now() + 5000, fn);
  }
  function waitToExecNodeTest2(serverStatusBasename, restartStatusBasename, serverStatusTimeoutThreshold, fn) {
    var restartStatus = fileStatus.read(fileStatusPath(restartStatusBasename))
      , restartStatusMtime = restartStatus.mtime
      , serverStatus = fileStatus.read(fileStatusPath(serverStatusBasename))
      , serverStatusMtime = serverStatus.mtime
      , now = Date.now()
      , serverRestarted = serverStatusMtime == restartStatusMtime
      , startTimeThreshold = startTime - 1000
      , serverStatusUpdated = restartServer || (serverStatusMtime >= startTimeThreshold)
      , serverStatusTimeout = now >= serverStatusTimeoutThreshold
      ;
    console.log(logPrefix+'|waitToExecNodeTest2|serverRestarted', serverRestarted, serverStatusMtime, restartStatusMtime);
    if (serverRestarted) {
      console.log(logPrefix+'|waitToExecNodeTest2|serverRestarted', serverStatusMtime, restartStatusMtime, startTimeThreshold);
    }
    if (serverStatusUpdated) {
      console.log(logPrefix+'|waitToExecNodeTest2|serverStatusUpdated', serverStatusMtime, startTimeThreshold);
    }
    if (serverStatusTimeout) {
      console.log(logPrefix+'|waitToExecNodeTest2|serverStatusTimeout', now, serverStatusTimeout);
    }
    if (serverRestarted && (serverStatusTimeout || serverStatusUpdated)) {
      fn();
    } else {
      setTimeout(function() {
        waitToExecNodeTest2(serverStatusBasename, restartStatusBasename, serverStatusTimeoutThreshold, fn);
      }, 200);
    }
  }
  function waitToExecCasperTest(domTestOptions, statusBasename, fn) {
    var jsFiles = [].concat(domTestOptions.jsFiles)
      , jsFileStatuses = jsFiles.map(function(jsFile) {
        return fileStatus.read(fileStatusPath(path.basename(jsFile) + '.status.json'));
      })
      , lastStatus = jsFileStatuses.sort(sortByMtime)[jsFileStatuses.length - 1]
      , lastStatusMtime = lastStatus.mtime
      , statusUpdated = lastStatusMtime > startTime
      , timeoutThreshold = lastStatusMtime + 2000
      , now = Date.now()
      , timeout = now >= timeoutThreshold
      ;
    console.info(logPrefix+'|waitToExecCasperTest', lastStatusMtime, startTime);
    if (statusUpdated) {
      console.log(logPrefix+'|waitToExecCasperTest|statusUpdated', now, timeoutThreshold);
    }
    if (timeout) {
      console.log(logPrefix+'|waitToExecCasperTest|timeout', lastStatusMtime, startTime);
    }
    if (statusUpdated || timeout) {
      waitForPort('localhost', 3001, function(err) {
        if (err) throw err;
        setTimeout(fn, 100);
      });
    } else {
      setTimeout(function() {
        waitToExecCasperTest(domTestOptions, statusBasename, fn);
      }, 200);
    }
  }
  function sortByMtime(a, b) {
    return a-b;
  }
  function execNodeTest() {
    var filePath2 = path.resolve(filePath);
    console.log(logPrefix+'|execNodeTest', filePath2);
    // TODO: Use tap-difflet here
    require(filePath2);
  }
  function execCasperTest() {
    child_process.spawn('casperjs', ['test', filePath], { stdio: 'inherit', stderr: 'inherit' });
  }
};
module.exports = test;
