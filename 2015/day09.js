const parse = (input) =>
  input.split(/\r?\n/).map((line) => line.replace(' to ', ',').replace(' = ', ',').split(','));

const partOne = (input) => {
  const data = parse(input);
  console.log('data', data);
};

const partTwo = (input) => {
  const data = parse(input);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
