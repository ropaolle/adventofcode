const partOne = (input) => {
  let floor = 0;
  for (let i = 0; i < input.length; i++) {
    floor += input[i] === '(' ? 1 : -1;
  }

  return floor;
};

const partTwo = (input) => {
  let floor = 0;
  for (let i = 0; i < input.length; i++) {
    floor += input[i] === '(' ? 1 : -1;
    if (floor === -1) {
      return i + 1;
    }
  }
};

exports.partOne = partOne;
exports.partTwo = partTwo;
