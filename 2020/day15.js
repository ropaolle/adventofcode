const parse = (input) => {
  return input.split(',').map((num) => Number(num));
  // .sort(numericSort);
};

const partOne = (input) => {
  const data = parse(input);
  console.log('data', data);
};

const partTwo = (input) => {
  // const data = parse(input);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
