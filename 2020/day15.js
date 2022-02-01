const numericSort = (a, b) => a - b;

const parse = (input) =>
  input
    .split(/\r?\n/)
    .map((line) => Number(line))
    .sort(numericSort);

const partOne = (input) => {
  const data = parse(input);
};

const partTwo = (input) => {
  const data = parse(input);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
