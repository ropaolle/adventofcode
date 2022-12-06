const parse = (input) => input.split('').map(Number);

const transform = (buff) => {
  let result = [];
  let current = { number: buff[0], count: 0 };

  for (const number of buff) {
    if (number === current.number) {
      current.count++;
    } else {
      result.push(current.count, current.number);
      current = { number, count: 1 };
    }
  }

  result.push(current.count, current.number);

  return result;
};

const applyProcess = (count, input) => {
  let data = parse(input);

  for (let i = 0; i < count; i++) {
    data = transform(data);
  }

  return data.length;
};

const partOne = (input) => applyProcess(40, input);

const partTwo = (input) => applyProcess(50, input);

exports.partOne = partOne;
exports.partTwo = partTwo;
