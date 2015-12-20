var jsFilesHtmlEct = require('./http.html.ect')
  , env = require('../node.env')
  , extension = env.production ? '.min.js' : '.js'
  ;
module.exports = function(jsFiles) {
  return jsFilesHtmlEct({jsFiles: jsFiles.map(function(jsFile) {
    return jsFile + extension;
  })});
};
