const fs = require('fs');
const pathFunc = require('path');

const numSort = (a, b) => a - b;

exports.numSort = numSort;

exports.loadData = (path, filename, options = {}) => {
  const { numeric, sorted } = options;
  let file = fs.readFileSync(pathFunc.join(path, filename), 'utf8').split(/\r?\n/);

  if (numeric && sorted) {
    return file.map((v) => Number(v)).sort(numSort);
  } else if (numeric) {
    return file.map((v) => Number(v));
  }

  return file;
};

exports.runFuncWithTimer = (func, showTime = false, lineBreak) => {
  let startTime = performance.now();
  let result = func();

  process.stdout.write(`${lineBreak ? '\n' : ''}Running ${func.name} ...`);
  // 'Running ' + func.name + '... ' + func())
  let endTime = performance.now();
  if (showTime) {
    console.log(` ${result} - ${(endTime - startTime).toFixed(2)} ms`);
  }
};

exports.removeItem = (arr, value) => {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

exports.isCapital = (ch) => /[A-Z]/.test(ch[0]);

exports.ord = (str) => str.charCodeAt(0);

exports.removeAllItems = (arr, value) => {
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
exports.findPatterns = (pattern, str) => {
  const result = [];
  let i = str.indexOf(pattern, 0);
  while (i >= 0) {
    result.push(i);
    i = str.indexOf(pattern, i + 1);
  }

  return result;
};

//  https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
// Find all all strings, not overlapping strings
exports.getIndicesOf = (searchStr, str, caseSensitive = true) => {
  var searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
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

// https://www.30secondsofcode.org/articles/s/js-data-structures-tree

exports.printTree = (tree) => console.log([...tree.preOrderTraversal()].map((x) => x.value));

class TreeNode {
  constructor(key, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

exports.Tree = class Tree {
  constructor(key, value = key) {
    this.root = new TreeNode(key, value);
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root) {
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert(parentNodeKey, key, value = key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(new TreeNode(key, value, node));
        return true;
      }
    }
    return false;
  }

  remove(key) {
    for (let node of this.preOrderTraversal()) {
      const filtered = node.children.filter((c) => c.key !== key);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }
};
