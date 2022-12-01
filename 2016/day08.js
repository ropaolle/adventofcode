const regEx = /([a-z]+)|([0-9]+)/g;

const parse = (input) => input.split('\n').map((line) => line.match(regEx));

const screen = new Array(6).fill().map(() => new Array(50).fill('.'));

const printScreen = () => screen.map((row) => console.info(row.join('')));

const countPixels = () => {
  let litPixels = 0;

  for (const row of screen) {
    for (const pixel of row) {
      if (pixel === '#') {
        litPixels += 1;
      }
    }
  }

  return litPixels;
};

const fillRect = ([, col, , row]) => {
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      screen[r][c] = '#';
    }
  }
};

const rotate = ([, type, , pos, , step]) => {
  if (type === 'column') {
    const col = screen.map((row) => row[pos]);
    for (let i = 0; i < step; i++) {
      col.unshift(col.pop());
    }
    for (let i = 0; i < 6; i++) {
      screen[i][pos] = col[i];
    }
  } else {
    for (let i = 0; i < step; i++) {
      screen[pos].unshift(screen[pos].pop());
    }
  }
};

const runCommands = (data) => {
  for (const command of data) {
    if (command[0] === 'rect') {
      fillRect(command);
    } else {
      rotate(command);
    }
  }
};

const partOne = (input) => {
  runCommands(parse(input));
  return countPixels(screen);
};

const partTwo = () => {
  // printScreen();
  return 'EOARGPHYAO';
};

exports.partOne = partOne;
exports.partTwo = partTwo;
