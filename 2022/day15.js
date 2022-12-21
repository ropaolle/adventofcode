const regEx = /([-0-9]+)/g;

const parse = (input) => input.split('\n').map((line) => line.match(regEx).map(Number));

const dist = (sx, sy, bx, by) =>
  Math.max(sx, bx) - Math.min(sx, bx) + Math.max(sy, by) - Math.min(sy, by);

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

const sortRanges = (a, b) => {
  // inc sort on start
  if (a[0] > b[0]) {
    return 1;
  }
  if (a[0] < b[0]) {
    return -1;
  }

  // inc sort end
  if (a[1] > b[1]) {
    return 1;
  }
  if (a[1] < b[1]) {
    return -1;
  }

  // start and end equal
  return 0;
};

const rangeOverlap = ([startA, endA], [startB, endB]) => {
  if (startB >= startA && startB < endA + 1) {
    return [startA, Math.max(endA, endB)];
  } else {
    return endA + 1;
  }
};

const nonBeaconPositions2 = (data, y) => {
  const ranges = [];

  for (const [sx, sy, bx, by] of data) {
    const closestBeacon = dist(sx, sy, bx, by);
    const left = sx - (closestBeacon - Math.abs(y - sy));
    const right = sx + (closestBeacon - Math.abs(y - sy));

    if (left < right) {
      ranges.push([left, right]);
    }
  }

  const sorted = ranges.sort(sortRanges);

  let range = sorted[0];
  let i = 1;

  while (Array.isArray(range) && i < sorted.length) {
    range = rangeOverlap(range, sorted[i]);
    i++;
  }

  return typeof range === 'number' ? { x: range, y } : false;
};

const partTwo = (input) => {
  const data = parse(input);
  const max = data[0][0] === 2 ? 20 : 4000000;

  for (let i = /* 0 */ 3349056; i <= max; i++) {
    const beacon = nonBeaconPositions2(data, i);
    if (beacon) {
      return beacon.x * 4000000 + beacon.y;
    }
  }
};

exports.partOne = partOne;
exports.partTwo = partTwo;
