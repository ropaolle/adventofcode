const parse = (input) => {
  const lines = input.split('\n');
  return lines.map((v) => v.split(''));
};

const adjacent = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

const clone2DArray = (arr) => {
  return JSON.parse(JSON.stringify(arr));
  // return arr.map((row) => [...row]);
};

const onGrid = (row, col, maxRows, maxCols) =>
  row >= 0 && col >= 0 && row < maxRows && col < maxCols;

// eslint-disable-next-line complexity
const occupiedNeighbours = (row, col, levels, threshold, generation) => {
  const maxCols = generation[0].length;
  const maxRows = generation.length;
  const neighbours = [true, true, true, true, true, true, true, true, true];

  let level = 1;
  let vacantNeighbours = 0;
  let occupiedNeighbours = 0;

  while (level <= levels) {
    for (let i = 0; i < adjacent.length; i++) {
      if (neighbours[i]) {
        const currRow = row + adjacent[i][1] * level;
        const currCol = col + adjacent[i][0] * level;
        if (onGrid(currRow, currCol, maxRows, maxCols)) {
          const currNeighbour = generation[currRow][currCol];
          if (currNeighbour === '#') {
            occupiedNeighbours += 1;
            if (occupiedNeighbours >= threshold) {
              return occupiedNeighbours;
            }
            neighbours[i] = false;
          } else if (currNeighbour === 'L') {
            vacantNeighbours += 1;
            if (vacantNeighbours === 8) {
              return 0;
            }
            neighbours[i] = false;
          }
        } else {
          neighbours[i] = false;
        }
      }
    }

    level += 1;
  }

  return occupiedNeighbours;
};

// eslint-disable-next-line complexity
const nextGeneration = (generation, threshold, closestNeighbours) => {
  let next = clone2DArray(generation);
  const maxCols = generation[0].length;
  const maxRows = generation.length;

  let changed = false;
  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < maxCols; col++) {
      const levels = closestNeighbours ? 1 : Math.max(maxCols - col, maxRows - row, col, row);
      const occupied = occupiedNeighbours(row, col, levels, threshold, generation);
      const val = generation[row][col];
      if (val === 'L' && occupied === 0) {
        next[row][col] = '#';
        changed = true;
      } else if (val === '#' && occupied >= threshold) {
        next[row][col] = 'L';
        changed = true;
      }
    }
  }

  if (!changed) {
    return next.flat().filter((x) => x === '#').length;
  }

  return next;
};

const partOne = (input) => {
  let grid = parse(input);

  do {
    grid = nextGeneration(grid, 4, true);
  } while (Array.isArray(grid));

  return grid;
};

const partTwo = (input) => {
  let grid = parse(input);
  do {
    grid = nextGeneration(grid, 5, false);
  } while (Array.isArray(grid));

  return grid;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
