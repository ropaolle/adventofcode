const regEx = /([-0-9]+)/g;

const parse = (input) => input.split('\n').map((line) => line.match(regEx).map(Number));

const dist = (sx, sy, bx, by) =>
  Math.max(sx, bx) - Math.min(sx, bx) + Math.max(sy, by) - Math.min(sy, by);

// const partOne = (input) => {
//   const data = parse(input);

//   let max = 0;
//   for (const [sx, , bx] of data) {
//     max = Math.max(sx, bx, max);
//   }
//   const y = max === 25 ? 10 : 2000000;
//   const row = new Set();

//   // max += 25;

//   for (const [sx, sy, bx, by] of data) {
//     const closestBeacon = dist(sx, sy, bx, by);

//     for (let i = -max; i < max; i++) {
//       if (closestBeacon >= dist(sx, sy, i, y)) {
//         row.add(i);
//       }
//     }

//     if (by === y) {
//       row.delete(bx);
//     }
//   }

//   // console.log('max', max);
//   // console.log('row', row);

//   return row.size;
// };

const nonBeaconPositions = (data, y) => {
  const row = new Set();

  for (const [sx, sy, bx, by] of data) {
    const closestBeacon = dist(sx, sy, bx, by);
    const left = sx - (closestBeacon - Math.abs(y - sy));
    const right = sx + (closestBeacon - Math.abs(y - sy));

    if (left < right) {
      for (let i = left; i <= right; i++) {
        row.add(i);
      }
    }

    if (by === y) {
      row.delete(bx);
    }
  }

  return row.size;
};

const partOne = (input) => {
  const data = parse(input);
  const y = data[0][0] === 2 ? 10 : 2000000;

  return nonBeaconPositions(data, y);
};

const nonBeaconPositions2 = (data, y, max) => {
  const row = new Map();

  for (const [sx, sy, bx, by] of data) {
    const closestBeacon = dist(sx, sy, bx, by);
    const left = sx - (closestBeacon - Math.abs(y - sy));
    const right = sx + (closestBeacon - Math.abs(y - sy));

    if (left < right) {
      for (let i = left; i <= right; i++) {
        row.set(i, '#');
      }
    }

    if (by === y) {
      row.set(bx, 'B');
    }
    if (sy === y) {
      row.set(sx, 'S');
    }
  }

  for (let i = 0; i <= max; i++) {
    if (!row.has(i)) {
      return { y, x: i };
    }
  }
};

const partTwo = (input) => {
  const data = parse(input);
  const max = data[0][0] === 2 ? 20 : 4000000;

  for (let i = 0; i <= max; i++) {
    const beacon = nonBeaconPositions2(data, i, max);
    if (beacon) {
      return beacon.x * 4000000 + beacon.y;
    }
  }
};

exports.partOne = partOne;
exports.partTwo = partTwo;
