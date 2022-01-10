const parse = (input) => {
  const lines = input.split(/\r?\n/);

  return lines.map((v) => ({
    cmd: v[0],
    val: Number(v.substring(1)),
  }));
};

const partOne = (input) => {
  const data = parse(input);

  const directions = 'NESW';
  let direction = 1;
  let northSouth = 0;
  let eastWest = 0;

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
  });

  return Math.abs(eastWest) + Math.abs(northSouth);
};

const partTwo = (input) => {
  const data = parse(input);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
