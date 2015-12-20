require('./polyfills');
var env = require('./env')
  , processEnv = process.env
  , envName = processEnv.NODE_ENV || processEnv.ENV || 'development'
  ;
var nodeEnv = Object.assign({}, env, {
  development: envName == 'development',
  name: envName,
  production: envName == 'production',
  test: envName == 'test',
  host: processEnv.HOST,
  webConcurrency: processEnv.WEB_CONCURRENCY || 1
});
module.exports = nodeEnv;