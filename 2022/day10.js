const parse = (input) =>
  input
    .split('\n')
    .map((line) => line.split(' '))
    .map(([cmd, val]) => [cmd, Number(val)]);

const partOne = (input) => {
  const data = parse(input);

  const cycles = 222;
  const samples = [20, 60, 100, 140, 180, 220];
  let regX = 1;
  let sum = 0;

  let addStarted = false;
  for (let i = 1; i <= cycles; i++) {
    if (addStarted) {
      regX += addStarted;
      addStarted = false;
    } else {
      const [cmd, val] = data.shift();
      if (cmd === 'addx') {
        addStarted = val;
      }
    }

    if (samples.includes(i + 1)) {
      sum += (i + 1) * regX;
    }
  }

  return sum;
};

const partTwo = (input) => {
  const data = parse(input);
  let display = [];
  let line = '';
  const cycles = 240;
  let regX = 1;

  let addStarted = false;

  for (let cycle = 1; cycle <= cycles; cycle++) {
    const pos = (cycle - 1) % 40;
    line += pos === regX - 1 || pos === regX || pos === regX + 1 ? '#' : '.';
    if (pos === 39) {
      display.push(line);
      line = '';
    }

    // Update regestry
    if (addStarted) {
      regX += addStarted;
      addStarted = false;
    } else {
      const [cmd, val] = data.shift();
      if (cmd === 'addx') {
        addStarted = val;
      }
    }
  }

  console.info(display);

  return 'RZEKEFHA';
};

exports.partOne = partOne;
exports.partTwo = partTwo;
