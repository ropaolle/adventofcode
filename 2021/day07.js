function parse(input) {
  return input.split(',').map(Number);
}

const MAX_ITTERATIONS = 500;

const sum = (val) => (val * (1 + val)) / 2;

function getCheapestOutcome(input, part) {
  const positions = parse(input);

  let prevCost = 0;
  for (let i = 0; i < MAX_ITTERATIONS; i++) {
    const nextCost =
      part === 1
        ? positions.reduce((acc, v) => acc + Math.abs(v - i), 0)
        : positions.reduce((acc, v) => acc + sum(Math.abs(v - i)), 0);
    if (prevCost === 0 || nextCost < prevCost) {
      prevCost = nextCost;
    }
  }

  return prevCost;
}

function partOne(input) {
  return getCheapestOutcome(input, 1);
}

function partTwo(input) {
  return getCheapestOutcome(input, 2);
}

exports.partOne = partOne;
exports.partTwo = partTwo;
