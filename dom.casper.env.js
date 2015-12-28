var system = require('system')
  , host = system.env.HOST || 'http://localhost:3001'
  , testFrontendUrl = host+'/test/dom'
  , test = system.args[4]
  , logPrefix = 'node-fullstack/dom.casper.env'
  ;
require('./polyfills/index');
casper.on('remote.message', function(message) {
  this.echo(message, 'INFO');
});
casper.on('page.error', function (msg, trace) {
  this.echo(msg + '\n' + trace.map(function(ti) {return ti.file + ':' + ti.line + '|' + ti.function;}).join('\n\t'), 'ERROR');
});
module.exports = {
  testBegin: function(desc, testFn) {
    return casper.test.begin(desc, {
      tearDown: tearDown,
      test: testFn
    });
  },
  start: function(data, fn) {
    console.info(logPrefix+'|start', testFrontendUrl, JSON.stringify(Object.assign({}, {test: test}, data)));
    var self = casper.start().thenOpen(testFrontendUrl, {
        method: 'POST',
        encoding: 'utf8',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(Object.assign({}, {test: test}, data))
      })
      .then(setup)
      .then(fn)
      ;
    if (!self.stop) self.stop = stopFn(self);
    return self;
  }
};
function setup() {
  console.info(logPrefix+'|setup');
  casper.evaluate(function (logPrefix) {
    console.info(logPrefix+'|setup|evaluate', window.require);
    require('test.helpers').setup();
  }, logPrefix);
}
function tearDown() {
  console.info(logPrefix+'|tearDown');
  casper.evaluate(function (logPrefix) {
    console.info(logPrefix+'|tearDown|evaluate', window.require);
    require('test.helpers').tearDown();
  }, logPrefix);
}
function stopFn(self) {
  return function(done) {
    if (!done) throw 'Error in casper stop ('+logPrefix+'). done Function argument required. i.e. `.stop(done)`';
    var steps = self.steps;
    self.then(function() {
      steps.splice(self.step, steps.length);
    });
    return self.run(done);
  }
}
