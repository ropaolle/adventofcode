const getFishCount = (fishes, days) => {
  for (let i = 0; i < days; i++) {
    const count = fishes.length;
    for (let j = 0; j < count; j++) {
      if (fishes[j] === 0) {
        // newFishes += 1;
        fishes[j] = 6;
        fishes.push(8);
      } else {
        fishes[j] -= 1;
      }
    }
  }

  return fishes.length;
};

function parse(input) {
  return input.split(',').map(Number);
}

function partOne(input) {
  const data = parse(input);
  return getFishCount(data, 80);
}

function partTwo(input) {
  const data = parse(input);

  const fishGens = data.reduce(
    (acc, v) => {
      acc[v] += 1;
      return acc;
    },
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  );

  const days = 256;

  for (let i = 0; i < days; i++) {
    const sixes = fishGens.shift();
    fishGens.push(sixes);
    fishGens[6] += sixes;
  }

  return fishGens.reduce((acc, v) => acc + v);
}

exports.partOne = partOne;
exports.partTwo = partTwo;
