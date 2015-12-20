function countWords(value){
  return value.match(/\S+/g).length;
}
module.exports = countWords;