var env = require('./env')
  , domEnv = Object.assign({}, env, {
      $: require('./dom.env/$'),
      $$: require('./dom.env/$$'),
      $hidden: require('./dom.env/$hidden'),
      $visible: require('./dom.env/$visible'),
      domClasses: require('dom-classes'),
      formatDate: require('./date/formatDate'),
      popup: require('./dom.env/popup'),
      ready: require('./dom.env/ready'),
      redirect: require('./dom.env/redirect')
    })
  ;
module.exports = domEnv;
