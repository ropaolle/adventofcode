const getMax = (lines) =>
  lines.reduce(
    (acc, [[x1, y1], [x2, y2]]) => [Math.max(acc[0], x1, x2), Math.max(acc[1], y1, y2)],
    [0, 0]
  );

const getGrid = (lines) => {
  const [maxX, maxY] = getMax(lines);
  return Array(maxY + 1)
    .fill(0)
    .map(() => Array(maxX + 1).fill(0));
};

const getCount = (grid) =>
  grid.reduce((acc, v) => v.reduce((acc, v) => (v > 1 ? acc + 1 : acc), acc), 0);

const parse = (input) => {
  return input.split(/\r?\n/).map((v) => v.split('->').map((v) => v.trim().split(',').map(Number)));
};

const partOne = (input) => {
  const lines = parse(input);
  const grid = getGrid(lines);

  lines.forEach((v) => {
    const [[x1, y1], [x2, y2]] = v;
    if (x1 === x2) {
      const start = Math.min(y1, y2);
      const stop = Math.max(y1, y2);
      for (let y = start; y < stop + 1; y++) {
        grid[y][x1] += 1;
      }
    } else if (y1 === y2) {
      const start = Math.min(x1, x2);
      const stop = Math.max(x1, x2);
      for (let x = start; x < stop + 1; x++) {
        grid[y1][x] += 1;
      }
    }
  });

  return getCount(grid);
};

const partTwo = (input) => {
  const lines = parse(input);
  const grid = getGrid(lines);

  // eslint-disable-next-line complexity
  lines.forEach(([[x1, y1], [x2, y2]]) => {
    if (x1 === x2) {
      const start = Math.min(y1, y2);
      const stop = Math.max(y1, y2);
      for (let y = start; y < stop + 1; y++) {
        grid[y][x1] += 1;
      }
    } else if (y1 === y2) {
      const start = Math.min(x1, x2);
      const stop = Math.max(x1, x2);
      for (let x = start; x < stop + 1; x++) {
        grid[y1][x] += 1;
      }
    } else {
      const steps = Math.abs(x1 - x2);
      const dirX = x1 - x2 > 0 ? -1 : 1;
      const dirY = y1 - y2 > 0 ? -1 : 1;
      for (let i = 0; i < steps + 1; i++) {
        grid[y1 + dirY * i][x1 + dirX * i] += 1;
      }
    }
  });

  return getCount(grid);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
