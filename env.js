var env = {
  arrayLast: require('./array/last'),
  arrayUnique: require('./array/unique'),
  assign: require('./assign'),
  callFn: require('./fn/callFn'),
  deepEqual: require('deep-equal'),
  deleteNullAttributes: require('./object/deleteNullAttributes'),
  hashToQuery: require('./urls/hashToQuery'),
  lPad: require('./string/lPad'),
  jsonObj: require('./json-obj/index'),
  keyCodes: require('./char/keyCodes'),
  rPad: require('./string/rPad'),
  uriParse: require('./urls/uriParse'),
  xhr: require('xhr2'),
  xhrRequest: require('./xhr/xhr.request')
};
module.exports = env;
