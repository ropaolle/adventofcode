let testInput = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`;

function parse(input) {
  return input.split(/\r?\n/).map((val) => val.split(' '));
}

function partOne(input) {
  let horizontal = 0;
  let depth = 0;

  for (const [dir, val] of parse(input)) {
    switch (dir) {
      case 'forward':
        horizontal += Number(val);
        break;
      case 'up':
        depth -= Number(val);
        break;
      case 'down':
        depth += Number(val);
        break;
      /* c8 ignore next 2 */
      default:
        break;
    }
  }

  return horizontal * depth;
}

function partTwo(input) {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (const [dir, val] of parse(input)) {
    switch (dir) {
      case 'forward':
        horizontal += Number(val);
        depth += aim * Number(val);
        break;
      case 'up':
        aim -= Number(val);
        break;
      case 'down':
        aim += Number(val);
        break;
      /* c8 ignore next 2 */
      default:
        break;
    }
  }
  return horizontal * depth;
}

/* c8 ignore next 4 */
if (process.env.ROPAOLLE === 'DEV') {
  console.log(`${__filename} - Part one:`, partOne(testInput));
  console.log(`${__filename} - Part two:`, partTwo(testInput));
}

exports.partOne = partOne;
exports.partTwo = partTwo;
