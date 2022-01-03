const testInput = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;

function parse(input) {
  return input
    .split(/\r?\n/)
    .filter((line) => line.length !== 0) // Ignore empty lines in the test input
    .map((v) => v.split('').map(Number));
}

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

const countFlashes = (matrix, generation = 0) => {
  let flashes = 0;

  for (let i = 0; i < 1000; i++) {
    let shallFlash = 0;

    // Inc by 1
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

    while (shallFlash > 0) {
      shallFlash = 0;
      // Flash all new
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          if (matrix[y][x] === 'F') {
            map.forEach(([my, mx]) => {
              const dy = y + my;
              const dx = x + mx;
              // On grid?
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

function partOne(input) {
  const matrix = parse(input);
  return countFlashes(matrix, 100);
}

function partTwo(input) {
  const matrix = parse(input);
  return countFlashes(matrix, 0);
}

/* c8 ignore next 4 */
if (process.env.ROPAOLLE === 'DEV') {
  console.log(`${__filename} - Part one:`, partOne(testInput));
  console.log(`${__filename} - Part two:`, partTwo(testInput));
}

exports.partOne = partOne;
exports.partTwo = partTwo;
