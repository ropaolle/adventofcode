const parse = (input) => input.split('\n').map((line) => line.split(''));

const NEIGHBOURS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const litLights = (grid) => grid.reduce((acc, row) => acc + row.filter((v) => v === '#').length, 0);

const litNeighbours = (grid, row, col) =>
  NEIGHBOURS.reduce(
    (count, [r, c]) => (grid[row + r] && grid[row + r][col + c] === '#' ? count + 1 : count),
    0
  );

// eslint-disable-next-line complexity
const nextCycle = (grid) => {
  const gridCols = grid[0].length;
  const gridRows = grid.length;

  // Deep clone
  const nextGrid = JSON.parse(JSON.stringify(grid));

  for (let col = 0; col < gridCols; col++) {
    for (let row = 0; row < gridRows; row++) {
      const lightIsOn = grid[row][col] === '#';
      const count = litNeighbours(grid, row, col);

      if (lightIsOn && ![2, 3].includes(count)) {
        nextGrid[row][col] = '.';
      } else if (!lightIsOn && count === 3) {
        nextGrid[row][col] = '#';
      }
    }
  }

  return nextGrid;
};

const STEPS = 100;

const partOne = (input) => {
  let grid = parse(input);

  for (let i = 0; i < STEPS; i++) {
    grid = nextCycle(grid);
  }

  return litLights(grid);
};

const litCorners = (grid) => {
  const gridCols = grid[0].length;
  const gridRows = grid.length;

  grid[0][0] = '#';
  grid[0][gridCols - 1] = '#';
  grid[gridRows - 1][0] = '#';
  grid[gridRows - 1][gridCols - 1] = '#';

  return grid;
};

const partTwo = (input) => {
  let grid = parse(input);

  for (let i = 0; i < STEPS; i++) {
    grid = nextCycle(litCorners(grid));
  }

  return litLights(litCorners(grid));
};

exports.partOne = partOne;
exports.partTwo = partTwo;
