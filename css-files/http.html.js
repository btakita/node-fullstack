var cssFilesHtmlEct = require('./http.html.ect')
  , extension = '.css'
  ;
module.exports = function(cssFiles) {
  return cssFilesHtmlEct({cssFiles: cssFiles.map(function(cssFile) {
    return cssFile + extension;
  })});
};
