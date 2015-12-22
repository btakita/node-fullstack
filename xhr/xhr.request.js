module.exports = function xhrRequest(xhr, fn) {
  var fn2 = fn || function() {};
  xhr.onload = function() {
    var responseText = xhr.responseText;
    if (xhr.status >= 200 && xhr.status < 400) {
      fn2(null, responseText, xhr);
    } else {
      fn2(''+xhr.status+':'+responseText, responseText, xhr);
    }
  };
  xhr.onerror = function(e) {
    fn2('Error: '+e, null, xhr);
  };
  return xhr;
};