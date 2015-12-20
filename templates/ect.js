var ECT = require('ect')
  , ect = ECT();
require.extensions['.ect'] = function (module, filename){
  module.exports = function(data) {
    return ect.render(filename, data);
  };
};
module.exports = ect;
