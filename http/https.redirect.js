var env = require('../node.env');
module.exports = function(req,res,next){
  if (req.headers['x-forwarded-proto']) {
    if(req.headers['x-forwarded-proto']!='https')
      res.redirect(env.host+req.url);
    else
      next();
  } else {
    next();
  }
};
