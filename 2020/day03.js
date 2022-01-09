const parse = (input) => input.split(/\r?\n/);

const countTrees = (right, down, mapWith, data) => {
  let count = 0;
  let x = 0;

  for (let y = down; y < data.length; y += down) {
    x += right;
    if (data[y][x % mapWith] === '#') {
      count += 1;
    }
  }

  return count;
};

const partOne = (input) => countTrees(3, 1, 31, parse(input));

const partTwo = (input) => {
  const data = parse(input);
  return (
    countTrees(1, 1, 31, data) *
    countTrees(3, 1, 31, data) *
    countTrees(5, 1, 31, data) *
    countTrees(7, 1, 31, data) *
    countTrees(1, 2, 31, data)
  );
};

exports.partOne = partOne;
exports.partTwo = partTwo;
