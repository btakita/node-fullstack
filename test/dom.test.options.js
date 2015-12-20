var fs = require('fs')
  , path = require('path')
  , logPrefix = 'node-fullstack/test/dom.test.options'
  ;
module.exports = function(test) {
  console.info(logPrefix);
  var optionsPath = path.resolve(test.replace(/\.js$/, '') + '.options.js')
    , options = {
        path: optionsPath,
        exists: fs.existsSync(optionsPath)
      }
    ;
  if (options.exists) {
    options = Object.assign(options, require(optionsPath));
    options.test = options.test || test;
    options.jsFiles = ['/dist/test.js'].concat(options.jsFiles || []);
  } else {
    options.errorMessage = 'File: ' + optionsPath + ' must be added to the project. It should return the test options';
  }
  return options;
};