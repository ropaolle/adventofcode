const parse = (input) => input.split('');

/* const printChamber = (chamber) => {
  // console.clear()
  console.info();
  chamber.reverse().forEach((r) => console.info(r.join('')));
  console.info();
}; */

const rocks = [
  [['#', '#', '#', '#']],
  [
    ['.', '#', '.'],
    ['#', '#', '#'],
    ['.', '#', '.'],
  ],

  [
    ['#', '#', '#'],
    ['.', '.', '#'],
    ['.', '.', '#'],
  ],

  [['#'], ['#'], ['#'], ['#']],

  [
    ['#', '#'],
    ['#', '#'],
  ],
];

const getChamber = (size) => {
  const chamberFirstRow = ['+', '-', '-', '-', '-', '-', '-', '-', '+'];
  const chamberRow = ['|', '.', '.', '.', '.', '.', '.', '.', '|'];

  let chamber = Array(size)
    .fill(0)
    .map(() => [...chamberRow]);
  chamber[0] = chamberFirstRow;

  return chamber;
};

const handleRock = (chamber, rockId, top, left, placeRock) => {
  const rock = rocks[rockId];
  let chamberR = top + 4;
  let chamberC = left;

  for (let r = 0; r < rock.length; r++) {
    for (let c = 0; c < rock[0].length; c++) {
      if (placeRock) {
        // Add resting rock to chamber
        if (rock[r][c] === '#') {
          chamber[chamberR + r][chamberC + c] = rock[r][c];
        }
      } else {
        // Check if rock fits
        if (chamberC + c < 1 || chamberC + c > 7) {
          return false;
        }
        if (rock[r][c] === '#' && chamber[chamberR + r][chamberC + c] !== '.') {
          return false;
        }
      }
    }
  }

  return true;
};

const placeRock = (chamber, rockId, top, left) => handleRock(chamber, rockId, top, left, true);

const rockFits = (chamber, rockId, top, left) => handleRock(chamber, rockId, top, left, false);

const addRock = (chamber, jetPatterns, rockId, top, left, jetId) => {
  let move = true;
  let prevTop = top;

  while (move) {
    // Move left/right
    const jet = jetPatterns[jetId % jetPatterns.length];
    const offset = jet === '>' ? 1 : -1;
    jetId++;
    if (rockFits(chamber, rockId, top, left + offset)) {
      left += offset;
    }
    // Fall down
    if (rockFits(chamber, rockId, top - 1, left)) {
      top--;
    } else {
      move = false;
    }
  }

  placeRock(chamber, rockId, top, left);

  const newTop = Math.max(prevTop, top + 3 + rocks[rockId].length);

  return [newTop, jetId];
};

const findPattern = (jetPatterns) => {
  let chamber = getChamber(jetPatterns.length * 5);
  let rockId = 0;
  let left = 3;
  let top = 0;
  let jetId = 0;

  let patterns = [];

  for (let i = 0; i < jetPatterns.length * 2; i++) {
    [top, jetId] = addRock(chamber, jetPatterns, rockId % 5, top, left, jetId);
    patterns.push([rockId % 5, jetId % jetPatterns.length, i, top]);
    rockId++;
  }

  for (let i = 0; i < jetPatterns.length * 2; i++) {
    let j = i + 1;
    while (j < patterns.length) {
      if (patterns[i][0] === patterns[j][0] && patterns[i][1] === patterns[j][1]) {
        let k = 1;
        while (
          patterns[i + k][0] === patterns[j + k][0] &&
          patterns[i + k][1] === patterns[j + k][1]
        ) {
          if (k > 10) {
            const divisor = j - i;
            const heightOffset = patterns[j][3] - patterns[i][3];

            return [divisor, heightOffset];
          }
          k++;
        }
      }
      j++;
    }
  }
};

const getRestHeight = (jetPatterns, rockCount, divisor, height) => {
  let chamber = getChamber(jetPatterns.length * 5);
  let rockId = 0;
  let left = 3;
  let top = 0;
  let jetId = 0;

  const fixHeigth = Math.floor(rockCount / divisor) * height;
  const rest = rockCount % divisor;

  for (let i = 0; i < rest; i++) {
    [top, jetId] = addRock(chamber, jetPatterns, rockId % 5, top, left, jetId);
    rockId++;
  }

  return top + fixHeigth;
};

const getHeight = (jetPatterns, rockCount) => {
  const [divisor, height] = findPattern(jetPatterns, rockCount);

  return getRestHeight(jetPatterns, rockCount, divisor, height);
};

const partOne = (input) => getHeight(parse(input), 2022);

const partTwo = (input) => getHeight(parse(input), 1000000000000);

exports.partOne = partOne;
exports.partTwo = partTwo;
