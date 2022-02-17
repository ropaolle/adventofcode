const parse = (input) => input.split('');

const transform = (str) => {
  let result = '';
  let current;

  for (let i = 0; i < str.length; i++) {
    const number = str[i];

    if (i === 0) {
      current = { number, count: 0 };
    }

    if (number === current.number) {
      current.count += 1;
    } else {
      result += current.count + current.number;
      current = { number, count: 1 };
    }

    if (i === str.length - 1) {
      result += current.count + current.number;
    }
  }

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
