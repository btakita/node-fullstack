// http://ejohn.org/blog/revised-javascript-dictionary-search/
module.exports = function findBinaryWord(dict, word) {
  // Figure out which bin we’re going to search
  var l = word.length;

  // Don’t search if there’s nothing to look through
  if (!dict[l]) {
    return false;
  }

  // Get the number of words in the dictionary bin
  var words = dict[l].length / l, // The low point from where we’re starting the binary search
    low = 0,

    // The max high point
    high = words - 1,

    // And the precise middle of the search
    mid = Math.floor(words / 2);

  // We continue to look until we reach a final word
  while (high >= low) {
    // Grab the word at our current position
    var found = dict[l].substr(l * mid, l);

    // If we’ve found the word, stop now
    if (word === found) {
      return true;
    }

    // Otherwise, compare
    // If we’re too high, move lower
    if (word < found) {
      high = mid - 1;
    // If we're too low, go higher
    } else {
      low = mid + 1;
    } // And find the new search point
    mid = Math.floor((low + high) / 2);
  } // Nothing was found return false;
};
