var sockjs = require('sockjs');
var sockjsServer = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
module.exports = sockjsServer;
