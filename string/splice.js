module.exports = function( str, idx, rem, s ) {
  return (str.slice(0,idx) + (s||'') + str.slice(idx + Math.abs(rem)));
};
