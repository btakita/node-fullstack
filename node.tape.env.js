var nodeEnv = require('./node.env')
  , config = require('./test/config')
  , test = require('tape-catch')
  , deepEqual = require('deep-equal')
  , request = require('supertest')
  , serverHost = process.env.SERVER_HOST || 'http://localhost:3001'
  , SockJs = require('sockjs-client')
  , sockjsPrefix = require('./sockjs/prefix')
  , logPrefix = 'node-fullstack/node.tape.env'
  ;
var httpTapeEnv = Object.assign({}, nodeEnv, {
  setup: setup,
  test: function() {
    var args = Array.prototype.slice.call(arguments)
      , fn = args.pop()
      , params;
    params = (args.length > 1) ? args.pop() : {};
    args.push(function(t) {
      setup(t, params, fn)
    });
    return test.apply(test, args);
  }
});
module.exports = httpTapeEnv;
function setup(t, params, fn) {
  console.log(logPrefix+'|setup');
  var end2 = t.end
    , sock = Object.assign(new SockJs(serverHost + sockjsPrefix), {
      onmessage: onmessage
    })
    , self = Object.assign({}, t, {
      request: request(serverHost),
      deepEqual2: deepEqual,
      sock: sock  ,
      end: end
    })
    ;
  setupExceptionHandling();
  if (httpTapeEnv.assign) httpTapeEnv.assign(self);
  return self;
  function setupExceptionHandling() {
    process.on('uncaughtException', function(err) {
      if (err) {
        if (err.stack) {
          console.error(err.stack);
        } else {
          console.trace(err);
        }
      }
    });
  }
  function end() {
    sock.close();
    end2.apply(self);
  }
  function onmessage(e) {
    var data = JSON.parse(e.data);
    if (data.cmd == 'mitmInit') {
      self.sessionId = data.sessionId;
      fn(self);
    }
  }
}
