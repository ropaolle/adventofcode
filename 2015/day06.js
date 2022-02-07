const parse = (input) =>
  input
    .split(/\r?\n/)
    .map((line) => line.replace(' through ', ',').replace('turn ', '').replace(' ', ',').split(','))
    .map(([a, b, c, d, e]) => [a, Number(b), Number(c), Number(d), Number(e)]);

const getGrid = () =>
  Array(1000)
    .fill(0)
    .map(() => Array(1000).fill(0));

const litLights = (grid) =>
  grid.reduce((acc, row) => acc + row.reduce((acc, light) => acc + light, 0), 0);

const loopGrid = (data, testFunc) => {
  const grid = getGrid();

  for (const [command, x1, y1, x2, y2] of data) {
    for (let i = x1; i <= x2; i++) {
      for (let j = y1; j <= y2; j++) {
        grid[i][j] = testFunc(grid[i][j], command);
      }
    }
  }

  return litLights(grid);
};

const partOne = (input) => {
  const data = parse(input);

  const testFunc = (value, command) => {
    if (command === 'toggle') {
      return value === 0 ? 1 : 0;
    } else {
      return command === 'on' ? 1 : 0;
    }
  };

  return loopGrid(data, testFunc);
};

const partTwo = (input) => {
  const data = parse(input);

  const testFunc = (value, command) => {
    if (command === 'toggle') {
      value += 2;
    } else if (command === 'on') {
      value += 1;
    } else if (value > 0) {
      value -= 1;
    }
    return value;
  };

  return loopGrid(data, testFunc);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
