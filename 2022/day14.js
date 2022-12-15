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

const getScreen = (data, minMax, pourPoint) => {
  const screen = getArray(
    minMax.max.row - minMax.min.row + 1 + 10,
    minMax.max.col - minMax.min.col + 1 + 2
  );

  screen[0][pourPoint] = '+';

  for (const lines of data) {
    for (let i = 0; i < lines.length - 1; i++) {
      const r1 = lines[i][1] - minMax.min.row + 5;
      const c1 = lines[i][0] - minMax.min.col + 1;
      const r2 = lines[i + 1][1] - minMax.min.row + 5;
      const c2 = lines[i + 1][0] - minMax.min.col + 1;

      for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) {
        for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
          screen[r][c] = '#';
        }
      }
    }
  }

  return screen;
};

const fallLeft = (screen, row, col) => {
  // let resting = false;

  while (row < screen.length - 1) {
    row++;
    col--;
    if (screen[row][col] !== '.') {
      screen[row - 1][col + 1] = 'o';
      // console.log('row,col', row, col);
      // resting = true;
      return true;
      // break;
    }
  }
};

const fallRight = (screen, row, col) => {
  while (row < screen.length - 1) {
    row++;
    col++;
    if (screen[row][col] !== '.') {
      screen[row - 1][col - 1] = 'o';
      return true;
    }
  }
};

const fallDown = (screen, [row, col], x) => {
  while (row < screen.length - 1) {
    // console.log('row,col', row, col, screen[row][col]);
    if (screen[row + 1][col] !== '.' && screen[row][col] === '.') {
      // const left = fallLeft(screen, row - 1, col);
      // const right = fallRight(screen, row - 1, col);
      // if (!left && !right) {
      //   screen[row - 1][col] = 'o';
      // }

      const left = screen[row][col - 1] === '.' && fallDown(screen, [row + 1, col - 1], 'l');
      const right = screen[row][col + 1] === '.' && fallDown(screen, [row + 1, col + 1], 'R');

      // console.log('left,right', left, right);
      if (!left && !right) {
        screen[row][col] = x;
        // return true;
      }
    }
    row++;
  }

  return false;
};

const partOne = (input) => {
  const data = parse(input);
  const minMax = getMinMax(data);
  const pourPoint = 500 - minMax.min.col + 1;
  const screen = getScreen(data, minMax, pourPoint);
  const start = [0, pourPoint];

  // Drop sand
  // - While empty fall down: start => inc row
  // - Try to fall left and then right:
  //   col-1, row+1 | col+1, row+1
  // - If no stop found we are done

  let resting = true;
  for (let i = 0; i < 15; i++) {
    // while (resting) {
    resting = fallDown(screen, start, '-');
    // console.log('resting', resting, start);
  }

  printScreen(screen);

  return 0;
};

const partTwo = (input) => {
  const data = parse(input);
  return 0;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
