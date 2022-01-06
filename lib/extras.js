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

// Usage: `return logExecutionTime(() => partTwoGo(input));`
module.exports.logExecutionTime = function logExecutionTime(func) {
  const t0 = performance.now();
  const result = func();
  const t1 = performance.now();
  console.info(`Execution time ${t1 - t0} ms.`);
  return result;
};
