const { performance } = require('perf_hooks');

module.exports.numericSort = function numericSort(a, b) {
  return a - b;
};

module.exports.flipBits = function flipBits(str) {
  return str
    .split('')
    .map((b) => (1 - b).toString())
    .join('');
};

/* istanbul ignore next */
// Usage: `return logExecutionTime(() => partTwoGo(input));`
module.exports.logExecutionTime = function logExecutionTime(func) {
  const t0 = performance.now();
  const result = func();
  const t1 = performance.now();
  console.info(`Execution time ${t1 - t0} ms.`);
  return result;
};

/* TEMP */
const fs = require('fs');
const pathFunc = require('path');

module.exports.loadData = (path, filename, options = {}) => {
  const { numeric, sorted } = options;
  let file = fs.readFileSync(pathFunc.join(path, filename), 'utf8').split(/\r?\n/);

  if (numeric && sorted) {
    return file.map((v) => Number(v)).sort((a, b) => a - b);
  } else if (numeric) {
    return file.map((v) => Number(v));
  }

  return file;
};
