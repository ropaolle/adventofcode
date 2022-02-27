const parse = (input) => input.split('\n').map((v) => Number(v));

const sumExist = (val, arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === val) {
        return true;
      }
    }
  }
  return false;
};

const partOne = (input) => {
  const data = parse(input);

  const preambleSize = 25;
  let window = data.slice(0, preambleSize);

  for (let i = preambleSize; i < data.length - preambleSize; i++) {
    const val = data[i];
    const exists = sumExist(val, window);
    if (!exists) {
      return val;
    }
    window.shift();
    window.push(val);
  }
};

const partTwo = (input) => {
  const data = parse(input);

  const test = 177777905; //127;

  for (let i = 0; i < data.length; i++) {
    let j = i;
    let sum = 0;
    let list = [];
    let min = test;
    let max = 0;

    while (sum < test) {
      j += 1;
      const val = data[j];
      list.push(val);
      min = Math.min(min, val);
      max = Math.max(max, val);
      sum += val;
    }
    if (sum === test) {
      return min + max;
    }
  }
};

exports.partOne = partOne;
exports.partTwo = partTwo;
