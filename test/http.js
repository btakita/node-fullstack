var domHtmlEct = require('./http.dom.html.ect')
  , path = require('path')
  , domTestOptions = require('./dom.test.options.js')
  , logPrefix = 'node-fullstack/test/http'
  ;
module.exports = function(app, seneca) {
  app.get('/test/dom', function (req, res) {
    var params = req.query;
    console.info(logPrefix+'|GET /test/dom', params);
    testFrontend(req, res, params);
  });
  app.post('/test/dom', function(req, res) {
    var body = req.body;
    console.info(logPrefix+'|POST /test/dom', body);
    testFrontend(req, res, body);
  });
  function testFrontend(req, res, params) {
    console.info(logPrefix+'|testFrontend', params);
    var params2 = params || {}
      , test = params2.test || ''
      ;
    if (test) {
      var options = Object.assign({}, domTestOptions(test), params2);
      if (options.exists) {
        var jsFiles = options.jsFiles;
        console.info(logPrefix+'|jsFiles', jsFiles);
        res.status(200).send(domHtmlEct(options));
      } else {
        res.status(400).send(options.errorMessage);
      }
    } else {
      res.status(400).send('No "test" param provided: '+JSON.stringify(params2));
    }
  }
};
