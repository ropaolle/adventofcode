const parse = (input) => {
  return input.split('\n').map((v) => v.split('').map(Number));
};

const map = [
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
];

// eslint-disable-next-line complexity
const countFlashes = (matrix, generation) => {
  let flashes = 0;
  let shallFlash = 0;

  const incByOne = () => {
    shallFlash = 0;

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const level = matrix[y][x];
        if (level === 9) {
          shallFlash += 1;
          flashes += 1;
          matrix[y][x] = 'F';
        } else {
          matrix[y][x] += 1;
        }
      }
    }
  };

  const onGrid = (dx, dy) => {
    if (matrix[dy] && matrix[dy][dx]) {
      const level = matrix[dy][dx];
      if (level === 9) {
        shallFlash += 1;
        flashes += 1;
        matrix[dy][dx] = 'F';
      } else if (level !== 'F' && level !== 0) {
        matrix[dy][dx] += 1;
      }
    }
  };

  for (let i = 0; i < 1000; i++) {
    incByOne();

    while (shallFlash > 0) {
      shallFlash = 0;
      // Flash all new
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          if (matrix[y][x] === 'F') {
            map.forEach(([my, mx]) => {
              const dy = y + my;
              const dx = x + mx;
              onGrid(dx, dy);
            });
            matrix[y][x] = 0;
          }
        }
      }
    }

    // Total flashes to thos generation
    if (generation === i + 1) {
      return flashes;
    }

    // All equal to 0
    if (matrix.every((v) => v.join('') === '0000000000')) {
      return i + 1;
    }
  }
};

const partOne = (input) => {
  const matrix = parse(input);
  return countFlashes(matrix, 100);
};

const partTwo = (input) => {
  const matrix = parse(input);
  return countFlashes(matrix, 0);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
