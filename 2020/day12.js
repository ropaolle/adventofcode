const { loadData } = require('../../lib.js');

const data = loadData(__dirname, 'data.txt').map((v) => ({
  cmd: v[0],
  val: Number(v.substring(1)),
}));

const partOne = () => {
  const directions = 'NESW';
  let direction = 1;
  let northSouth = 0;
  let eastWest = 0;
  const l = [];

  const addDistance = (direction, distance) => {
    switch (direction) {
      case 'N':
        northSouth += distance;
        break;
      case 'S':
        northSouth -= distance;
        break;
      case 'E':
        eastWest += distance;
        break;
      case 'W':
        eastWest -= distance;
        break;
    }
  };

  data.forEach(({ cmd, val }) => {
    switch (cmd) {
      case 'F':
        addDistance(directions[direction], val);
        break;
      case 'L':
        // +4 to compensate for negative values
        direction = (direction + 4 - val / 90) % 4;
        break;
      case 'R':
        direction = (direction + val / 90) % 4;
        break;
      case 'N':
      case 'E':
      case 'S':
      case 'W':
        addDistance(cmd, val);
        break;
    }

    // l.push({ cmd, val, direction, direction2: directions[direction], northSouth, eastWest });
  });

  // console.table(l);

  return Math.abs(eastWest) + Math.abs(northSouth);
};

const partTwo = () => {}; 

console.log('Part one:', partOne());
// console.log('Part two:', partTwo());

// Exports
exports.partOne = partOne;
exports.partTwo = partTwo;
