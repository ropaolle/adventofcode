const parse = (input) => JSON.parse(input.split(/\r?\n/));

// eslint-disable-next-line complexity
const getSum = (obj, excludeRed = false, sum = 0) => {
  if (typeof obj === 'number') {
    return sum + obj;
  }

  if (Array.isArray(obj)) {
    for (const value of obj) {
      sum += getSum(value, excludeRed);
    }
  } else if (typeof obj === 'object') {
    const values = Object.values(obj);
    if (!excludeRed || (excludeRed && !values.includes('red'))) {
      for (const value of values) {
        sum += getSum(value, excludeRed);
      }
    }
  }

  return sum;
};

const partOne = (input) => getSum(parse(input), false);

const partTwo = (input) => getSum(parse(input), true);

exports.partOne = partOne;
exports.partTwo = partTwo;
