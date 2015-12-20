var lPad = require('../string/lPad')
  , daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  , logPrefix = 'node-fullstack/date/formatDate'
  ;
module.exports = function formatDate(date) {
  console.log(logPrefix+'|formatDate');
  var day = daysOfWeek[date.getDay()]
    , mm = date.getMonth()+1
    , dd = date.getDate()
    , yyyy = date.getFullYear()
    , hours = date.getHours()
    , minutes = date.getMinutes()
    ;
  return day+' '+lPad(mm, '0', 2)+'/'+lPad(dd, '0', 2)+'/'+yyyy+' '+lPad(hours, '0', 2)+':'+lPad(minutes, '0', 2);
};
