var htmlEct = require('./http.html.ect');
function version() {
  return process.env.GIT_SHA || (new Date()).getTime();
}
module.exports = function() {
  return htmlEct({version: version()});
};
