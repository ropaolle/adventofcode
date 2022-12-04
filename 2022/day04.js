const regEx = /(\d+)/g;

const parse = (input) => input.split('\n').map((line) => line.match(regEx).map(Number));

const partOne = (input) => {
  const data = parse(input);
  let contains = 0;

  for (const [a, b, x, y] of data) {
    if ((x >= a && y <= b) || (a >= x && b <= y)) {
      contains++;
    }
  }

  return contains;
};

const partTwo = (input) => {
  const data = parse(input);
  let overlap = 0;

  for (const [a, b, x, y] of data) {
    for (let i = a; i <= b; i++) {
      if (i >= x && i <= y) {
        overlap++;
        break;
      }
    }
  }

  return overlap;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
