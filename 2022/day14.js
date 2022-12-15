const regEx = /([0-9]+),([0-9]+)/g;

const parse = (input) =>
  input.split('\n').map((line) => line.match(regEx).map((v) => v.split(',').map(Number)));

const getArray = (rows, cols) => new Array(rows).fill().map(() => new Array(cols).fill('.'));

const printScreen = (screen) => screen.map((row) => console.info(row.join('')));

const getMinMax = (data) => {
  let max = { row: 0, col: 0 };
  let min = { row: Infinity, col: Infinity };
  for (const lines of data) {
    for (const [col, row] of lines) {
      max.row = Math.max(max.row, row);
      max.col = Math.max(max.col, col);
      min.row = Math.min(min.row, row);
      min.col = Math.min(min.col, col);
    }
  }
  return { min, max };
};

const getScreen = (data, minMax, pourPoint, floor) => {
  const screen = getArray(
    minMax.max.row - minMax.min.row + 1 + 20,
    minMax.max.col - minMax.min.col + 1 + 30
  );

  // screen[0][pourPoint] = '+';

  if (floor) {
    screen[minMax.max.row + 8] = screen[minMax.max.row + 8].map(() => '#');
  }

  for (const lines of data) {
    for (let i = 0; i < lines.length - 1; i++) {
      const r1 = lines[i][1] - minMax.min.row + 10;
      const c1 = lines[i][0] - minMax.min.col + 15;
      const r2 = lines[i + 1][1] - minMax.min.row + 10;
      const c2 = lines[i + 1][0] - minMax.min.col + 15;

      for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) {
        for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
          screen[r][c] = '#';
        }
      }
    }
  }

  return screen;
};

const fallDown = (screen, row, col, x) => {
  while (row < screen.length - 1) {
    if (screen[row + 1][col] !== '.') {
      if (
        screen[row][col] === '.' &&
        screen[row + 1][col + 1] !== '.' &&
        screen[row + 1][col - 1] !== '.'
      ) {
        screen[row][col] = x;
        // console.log('row,col', row, col);
        if (row === 6 && col === 21) {
          return false;
        }
        return true;
      }

      if (screen[row + 1][col - 1] === '.') {
        return fallDown(screen, row + 1, col - 1, 'l');
      } else if (screen[row + 1][col + 1] === '.') {
        return fallDown(screen, row + 1, col + 1, 'r');
      }
    }

    row++;
  }

  return false;
};

const partOne = (input) => {
  const data = parse(input);
  const minMax = getMinMax(data);
  const pourPoint = 500 - minMax.min.col + 15;
  const screen = getScreen(data, minMax, pourPoint);
  const start = [0, pourPoint];

  let i = 0;
  while (fallDown(screen, start[0], start[1], '-')) {
    i++;
  }

  return i;
};

const partTwo = (input) => {
  const data = parse(input);
  const minMax = getMinMax(data);
  const pourPoint = 500 - minMax.min.col + 15;
  const screen = getScreen(data, minMax, pourPoint, true);
  const start = [0, pourPoint];
  console.log('start', start);
  let i = 0;
  while (fallDown(screen, start[0], start[1], '-')) {
    i++;
  }

  printScreen(screen);

  return i + 1;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
