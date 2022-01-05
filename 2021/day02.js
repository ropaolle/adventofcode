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
      /* istanbul ignore next */
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
      /* istanbul ignore next */
      default:
        break;
    }
  }
  return horizontal * depth;
}

exports.partOne = partOne;
exports.partTwo = partTwo;
