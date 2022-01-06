function flipBits(str) {
  return str
    .split('')
    .map((b) => (1 - b).toString())
    .join('');
}

module.exports.flipBits = flipBits;
