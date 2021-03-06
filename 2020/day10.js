const parse = (input) => {
  const lines = input.split('\n');
  const sortedNumbers = lines.map((v) => Number(v)).sort((a, b) => a - b);

  return sortedNumbers;
};

const partOne = (input) => {
  const data = parse(input);
  let pointer = 0;
  let ones = 0;
  let threes = 0;
  for (let index = 0; index < data.length; index++) {
    const diff = data[index] - pointer;
    switch (diff) {
      case 1:
        ones += 1;
        break;
      case 3:
        threes += 1;
    }
    pointer = data[index];
  }
  return ones * (threes + 1);
};

const partTwo = (input) => {
  const data = parse(input);

  const map = new Map([[0, 1]]);
  for (let i = 0; i < data.length; i++) {
    const ways =
      (map.get(data[i] - 1) || 0) + (map.get(data[i] - 2) || 0) + (map.get(data[i] - 3) || 0);
    map.set(data[i], ways);
  }
  return map.get(data.pop());
};

exports.partOne = partOne;
exports.partTwo = partTwo;
