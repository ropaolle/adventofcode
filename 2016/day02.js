const parse = (input) => input.split('\n').map((line) => line.split(''));

const getCode = (data, keypad, pos) => {
  let code = '';

  for (const line of data) {
    for (const action of line) {
      let { x, y } = pos;
      if (action === 'U') {
        x -= 1;
      } else if (action === 'D') {
        x += 1;
      } else if (action === 'L') {
        y -= 1;
      } else if (action === 'R') {
        y += 1;
      }

      if (keypad[x][y] !== '0') {
        pos = { x, y };
      }
    }

    code += keypad[pos.x][pos.y];
  }

  return code;
};

const partOne = (input) => {
  const data = parse(input);

  const keypad = [
    ['0', '0', '0', '0', '0'],
    ['0', '1', '2', '3', '0'],
    ['0', '4', '5', '6', '0'],
    ['0', '7', '8', '9', '0'],
    ['0', '0', '0', '0', '0'],
  ];
  const pos = { x: 1, y: 1 };

  return getCode(data, keypad, pos);
};

const partTwo = (input) => {
  const data = parse(input);

  const keypad = [
    ['0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '1', '0', '0', '0'],
    ['0', '0', '2', '3', '4', '0', '0'],
    ['0', '5', '6', '7', '8', '9', '0'],
    ['0', '0', 'A', 'B', 'C', '0', '0'],
    ['0', '0', '0', 'D', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0'],
  ];
  let pos = { x: 3, y: 3 };

  return getCode(data, keypad, pos);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
