var nodeEnv = require('../node.env')
  , sessionIdNew = require('../session/id.new')
  , logPrefix = 'node-fullstack/http/test-mitm'
  ;
if (nodeEnv.test) {
  // TODO: Integrate with senecajs
  var Mitm = require('mitm')
    , mitm = Mitm()
    , sockjsServer = require('../sockjs/server')
    , clients = {}
    , requests = {}
    ;
  sockjsServer.on('connection', function(conn) {
    console.log(logPrefix+'|sockjsServer|connection');
    // add this client to clients object
    clients[conn.id] = conn;
    // on receive new data from client event
    conn.on('data', function(data) {
      var data2 = JSON.parse(data);
      console.log(logPrefix+'|sockjsServer|connection|data', data2);
      if (data2.cmd == 'mitmResponse') {
        var request = requests[data2.requestId];
        if (request) {
          var response = data2.response
            , statusCode = response[0]
            , headers = response[1]
            , body = response[2]
            , req = request.req
            , res = request.res
            ;
          res.statusCode = statusCode;
          for (var headerName in headers) {
            res.setHeader(headerName, headers[headerName]);
          }
          res.end(body);
        }
      }
    });
    // on connection close event
    conn.on('close', function() {
      console.log(logPrefix+'|sockjsServer|connection|close');
      delete clients[conn.id];
    });
    conn.write(JSON.stringify({cmd: 'mitmInit', sessionId: conn.id}));
  });
  mitm.on('connect', function(socket, opts) {
    console.log(logPrefix+'|mitm|on connect', opts.host);
    if (opts.host == 'localhost' || opts.host == '127.0.0.1') socket.bypass();
  });
  mitm.on('request', function(req, res) {
    console.info(logPrefix+'|mitm|on request');
    var request = {
          method: req.method,
          url: req.url,
          headers: req.headers,
          body: req.body
        }
      , requestId = request.id = sessionIdNew()
      ;
    console.log(logPrefix+'|mitm|on request', Object.keys(clients).length, request);
    requests[requestId] = {req: req, res: res};
    setTimeout(function() {
      delete requests[requestId];
    }, 5000);
    broadcast({cmd: 'mitmRequest', request: request});
  });
  function broadcast(message){
    // iterate through each client in clients object
    for (var client in clients){
      var conn = clients[client]
        , message2 = Object.assign({connectionId: conn.id}, message)
        ;
      // send the message to that client
      conn.write(JSON.stringify(message2));
    }
  }
}
