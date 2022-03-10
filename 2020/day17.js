const parse = (input) => input.split('\n');

// https://github.com/matthewgehring/adventofcode/tree/main/2020/day17

const getGrid = (size) => [...Array(size)].map(() => Array(size).fill('.'));
const getQube = (size) => [...Array(size)].map(() => getGrid(size));

const countActive = (qube) => {
  const width = qube.length;

  let active = 0;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < width; y++) {
      for (let z = 0; z < width; z++) {
        if (qube[x][y][z] === '#') {
          active += 1;
        }
      }
    }
  }

  return active;
};

const addLayer = (qube) => {
  const width = qube.length;

  for (let z = 0; z < width; z++) {
    for (let x = 0; x < width; x++) {
      qube[z][x].unshift('.');
      qube[z][x].push('.');
    }
    qube[z].unshift(Array(width + 2).fill('.'));
    qube[z].push(Array(width + 2).fill('.'));
  }
  qube.unshift(getGrid(width + 2));
  qube.push(getGrid(width + 2));

  // console.log('qube', qube);

  return qube;
};

const print = (qube) => {
  const width = qube.length;
  for (let z = 0; z < width; z++) {
    for (let y = 0; y < width; y++) {
      console.info(qube[z][y].flat().join(''));
    }
    console.info();
  }
};

const adjacent = [
  // x, y, z
  [-1, -1, -1],
  [0, -1, -1],
  [1, -1, -1],
  [-1, 0, -1],
  [0, 0, -1],
  [1, 0, -1],
  [-1, 1, -1],
  [0, 1, -1],
  [1, 1, -1],
  //
  [-1, -1, 0],
  [0, -1, 0],
  [1, -1, 0],
  [-1, 0, 0],
  // [0,0,0],
  [1, 0, 0],
  [-1, 1, 0],
  [0, 1, 0],
  [1, 1, 0],
  //
  [-1, -1, 1],
  [0, -1, 1],
  [1, -1, 1],
  [-1, 0, 1],
  [0, 0, 1],
  [1, 0, 1],
  [-1, 1, 1],
  [0, 1, 1],
  [1, 1, 1],
];

// eslint-disable-next-line complexity
const nextGen = (qube) => {
  const width = qube.length;

  for (let z = 0; z < width; z++) {
    for (let y = 0; y < width; y++) {
      for (let x = 0; x < width; x++) {
        let active = 0;

        for (const [dx, dy, dz] of adjacent) {
          if (!qube[z + dz] || !qube[z + dz][y + dy] || !qube[z + dz][y + dy][x + dx]) {
            break;
          }
          // break;
          active += qube[z + dz][y + dy][x + dx] === '#';
        }

        // if (active > 0) {
        //   console.log('active', active);
        // }

        if (qube[z][y][x] === '#') {
          if (active < 2 || active > 3) {
            // console.log('inactive');
            qube[z][y][x] = '.';
          }
        } else {
          if (active === 3) {
            qube[z][y][x] = '#';
            // console.log('active');
          }
        }

        // qube[z][y][x] = '@';
      }
    }
  }

  return qube;
};

// eslint-disable-next-line complexity
const partOne = (input) => {
  const data = parse(input);
  const width = data.length;

  let active = 0;
  // let qube = getQube(width);

  // console.log('qube', qube);

  // Initial qube
  let qube = [getGrid(width), data.map((row) => row.split('')), getGrid(width)];
  console.log('grid', qube);
  print(qube);

  // const center = Math.floor(qube.length / 2);
  // for (let z = 0; z < width; z++) {
  //   for (let y = 0; y < width; y++) {
  //     // if (x === 0) {
  //     // qube[x] = [...grid];
  //     // qube[x] = JSON.parse(JSON.stringify(grid));
  //     // }
  //     for (let y = 0; y < width; y++) {
  //       // qube[z][y][x] = grid[y][x];
  //     }
  //   }
  // }

  // console.log(qube);

  qube = addLayer(qube);
  // qube = addLayer(qube);
  // console.log(qube);

  print(qube);
  qube = nextGen(qube);
  // active = countActive(qube);

  print(qube);

  return active;
};

const partTwo = (input) => {
  const data = parse(input);
  return 1;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
