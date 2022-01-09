const numericSort = (a, b) => a - b;

const flipBits = (str) =>
  str
    .split('')
    .map((b) => (1 - b).toString())
    .join('');

const isCapital = (ch) => /[A-Z]/.test(ch[0]);

const ord = (str) => str.charCodeAt(0);

const removeItem = (arr, value) => {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

const removeAllItems = (arr, value) => {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
};

// Finds all strings, including overlapping
const findPatterns = (pattern, str) => {
  const result = [];
  let i = str.indexOf(pattern, 0);
  while (i >= 0) {
    result.push(i);
    i = str.indexOf(pattern, i + 1);
  }

  return result;
};

// Find all all strings, ignore overlapping strings
const getIndicesOf = (searchStr, str, caseSensitive = true) => {
  var searchStrLen = searchStr.length;
  if (searchStrLen === 0) {
    return [];
  }
  var startIndex = 0,
    index,
    indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
};

exports.numericSort = numericSort;
exports.flipBits = flipBits;
exports.isCapital = isCapital;
exports.ord = ord;
exports.removeItem = removeItem;
exports.removeAllItems = removeAllItems;
exports.findPatterns = findPatterns;
exports.getIndicesOf = getIndicesOf;
