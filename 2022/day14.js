const regEx = /([0-9]+),([0-9]+)/g;

const parse = (input) =>
  input.split('\n').map((line) => line.match(regEx).map((v) => v.split(',').map(Number)));

const getArray = (rows, cols) => new Array(rows).fill().map(() => new Array(cols).fill('.'));

// const printScreen = (screen) => screen.map((row) => console.info(row.join('')));

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

const colOffset = 500;

const getScreen = (data, minMax, floor) => {
  const screen = getArray(minMax.max.row + 1 + 2, minMax.max.col - minMax.min.col + 1 + colOffset);

  if (floor) {
    screen[minMax.max.row + 2] = screen[minMax.max.row + 2].map(() => '#');
  }

  for (const lines of data) {
    for (let i = 0; i < lines.length - 1; i++) {
      const r1 = lines[i][1];
      const c1 = lines[i][0] - minMax.min.col + colOffset / 2;
      const r2 = lines[i + 1][1];
      const c2 = lines[i + 1][0] - minMax.min.col + colOffset / 2;

      for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) {
        for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
          screen[r][c] = '#';
        }
      }
    }
  }

  return screen;
};

const pourSandUnit = (screen, row, col, pourPoint) => {
  while (row < screen.length - 1) {
    if (screen[row + 1][col] !== '.') {
      if (
        screen[row][col] === '.' &&
        screen[row + 1][col + 1] !== '.' &&
        screen[row + 1][col - 1] !== '.'
      ) {
        screen[row][col] = 'o';
        if (col === pourPoint && row === 0) {
          return false;
        }
        return true;
      } else if (screen[row + 1][col - 1] === '.') {
        return pourSandUnit(screen, row + 1, col - 1, pourPoint);
      } else if (screen[row + 1][col + 1] === '.') {
        return pourSandUnit(screen, row + 1, col + 1, pourPoint);
      }
    }

    row++;
  }
};

const pourSand = (data, partTwo) => {
  const minMax = getMinMax(data);
  const pourPoint = 500 - minMax.min.col + colOffset / 2;
  const screen = getScreen(data, minMax, partTwo);
  const start = [0, pourPoint];
  // screen[0][pourPoint] = '+';

  let i = 0;
  while (pourSandUnit(screen, start[0], start[1], partTwo && pourPoint)) {
    i++;
  }

  // printScreen(screen);

  return i + (partTwo ? 1 : 0);
};

const partOne = (input) => pourSand(parse(input));

const partTwo = (input) => pourSand(parse(input), true);

exports.partOne = partOne;
exports.partTwo = partTwo;
