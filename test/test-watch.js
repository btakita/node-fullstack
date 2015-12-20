module.exports = function testWatch(argv) {
  var filePath = argv[0]
    , path = require('path')
    , nodemon = require('nodemon')
    , fileBasename = path.basename(filePath)
    , isFrontEndTest = (fileBasename.indexOf('dom.') > -1) && (fileBasename.indexOf('test.js') > -1)
    , logPrefix = 'node-fullstack/test/test-watch'
    ;
  console.info(logPrefix, JSON.stringify(argv));
  process.env.NODE_ENV = 'test';
  var extraArgs = ''
    , ignore;
  if (isFrontEndTest) {
    ignore = [];
    process.env.NO_RESTART_SERVER = '1';
  } else {
    ignore = ['*dom.test.js'];
    extraArgs = ' | ./node_modules/tap-difflet/bin/tap-difflet --color';
  }
  nodemon({
    ignore: ignore,
    exec: 'NODE_ENV=test npm test ' + argv.map(function(arg) {
      return "'" + arg + "'";
    }).join(' ') + extraArgs
  });
};
