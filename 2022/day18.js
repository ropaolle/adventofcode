const parse = (input) => input.split('\n').map((line) => line.split(',').map(Number));

const neighbors = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

const partOne = (input) => {
  const qubes = parse(input);
  const qubeSet = new Set(qubes.map((qube) => qube.join('|')));

  let exposed = 0;

  for (const [x, y, z] of qubes) {
    let sides = 6;
    for (const neighbor of neighbors) {
      const neighborStr = [x + neighbor[0], y + neighbor[1], z + neighbor[2]].join('|');
      if (qubeSet.has(neighborStr)) {
        sides--;
      }
    }
    exposed += sides;
  }

  return exposed;
};

const partTwo = (input) => {
  const qubes = parse(input);

  let max = -Infinity;
  let min = Infinity;

  for (const [x, y, z] of qubes) {
    max = Math.max(x, y, z, max);
    min = Math.min(x, y, z, min);
  }

  // TODO: Find
  // Max 19, min 0 ->  0,0,0 -> 19,19,19
  // find empty

  return 0;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
