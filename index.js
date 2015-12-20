var fullstack = {
  httpWatch: require('./http/http-watch'),
  httpTestWatch: require('./http/http-test-watch'),
  testConfig: require('./test/config'),
  test: require('./test/test'),
  testWatch: require('./test/test-watch')
};
module.exports = fullstack;
