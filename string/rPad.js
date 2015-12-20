module.exports = function rPad(str, padString, length) {
  var str2 = str.toString();
  while (str2.length < length)
    str2 = str2 + padString;
  return str2;
};
