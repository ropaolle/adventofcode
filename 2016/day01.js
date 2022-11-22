const parse = (input) =>
  input.split(', ').map((v) => ({
    turn: v[0] === 'L' ? 'left' : 'right',
    length: Number(v.substring(1)),
  }));

const nextDirection = (direction, turn) => {
  direction += turn === 'right' ? 1 : -1;

  if (direction === 4) {
    return 0;
  } else if (direction === -1) {
    return 3;
  }

  return direction;
};

const partOne = (input) => {
  const data = parse(input);

  let direction = 0;
  let position = 0;

  for (const { turn, length } of data) {
    direction = nextDirection(direction, turn);
    position += direction > 1 ? -length : length;
  }

  return Math.abs(position);
};

const points = new Set();

const partTwo = (input) => {
  const data = parse(input);

  let direction = 0;
  let x = 0;
  let y = 0;
  let prevX = 0;
  let prevY = 0;

  for (const { turn, length } of data) {
    direction = nextDirection(direction, turn);

    switch (direction) {
      case 0:
        y += length;
        break;
      case 1:
        x += length;
        break;
      case 2:
        y -= length;
        break;
      case 3:
        x -= length;
        break;
    }

    for (let i = Math.min(prevY, y); i < Math.max(prevY, y); i++) {
      const diff = prevY < y ? 1 : 0;
      const next = `x${x}, y${i + diff}`;
      if (points.has(next)) {
        return Math.abs(x) + Math.abs(i + diff);
      } else {
        points.add(next);
      }
    }

    for (let i = Math.min(prevX, x); i < Math.max(prevX, x); i++) {
      const diff = prevX < x ? 1 : 0;
      const next = `x${i + diff}, y${y}`;
      if (points.has(next)) {
        return Math.abs(i + diff) + Math.abs(y);
      } else {
        points.add(next);
      }
    }

    prevX = x;
    prevY = y;
  }
};

exports.partOne = partOne;
exports.partTwo = partTwo;
