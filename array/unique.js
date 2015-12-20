// http://stackoverflow.com/a/17903018
module.exports = function arrayUnique(a) {
  return a.reduce(function(p, c) {
    if (p.indexOf(c) < 0) p.push(c);
    return p;
  }, []);
};
