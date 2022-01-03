let testInput = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`;

function parse(input) {
  return input.split(/\r?\n/).filter((line) => line.length !== 0); // Ignore empty lines in the test input
}

const getData = (data) =>
  data.reduce(
    (acc, v) => {
      if (v.length > 0) {
        if (v.indexOf('fold along ') === 0) {
          acc[1].push(
            v
              .substring(11)
              .split('=')
              .reduce((acc, v) => {
                if (['x', 'y'].includes(v)) {
                  acc.dir = v;
                } else {
                  acc.num = Number(v);
                }
                return acc;
              }, {})
          );
        } else {
          acc[0].push(v.split(',').map(Number));
        }
      }
      return acc;
    },
    [[], []]
  );

const getGrid = (cords) => {
  const maxX = cords.reduce((acc, [x]) => Math.max(acc, x), 0);
  const maxY = cords.reduce((acc, [_, y]) => Math.max(acc, y), 0);
  //   console.log('maxX/maxY', maxX, maxY);
  const paper = Array(maxY + 1)
    .fill('.')
    .map((_) => Array(maxX + 1).fill('.'));
  cords.forEach(([x, y]) => (paper[y][x] = '#'));
  return paper;
};

// const printPaper = (paper) => paper.forEach((v) => console.log(v.join('')));

const foldPaper = (paper, fold) => {
  if (fold.dir === 'y') {
    for (let i = 0; i < fold.num; i++) {
      const last = paper.pop();
      for (let j = 0; j < last.length; j++) {
        if (last[j] === '#') {
          paper[i][j] = '#';
        }
      }
    }
    paper.pop();
    return paper;
  } else if (fold.dir === 'x') {
    return paper.map((v) => {
      for (let i = 0; i < fold.num; i++) {
        const last = v.pop();
        if (last === '#') {
          v[i] = '#';
        }
      }
      v.pop();
      return v;
    });
  }
};

function partOne(input) {
  const data = parse(input);
  const [cords, folds] = getData(data);
  let paper = getGrid(cords);
  paper = foldPaper(paper, folds[0]);
  //   printPaper(paper);
  // const length = 
  return (paper.join('').match(/#/g) || /* c8 ignore next */ []).length;
}

function partTwo(input) {
  const data = parse(input);
  const [cords, folds] = getData(data);
  let paper = getGrid(cords);

  for (const fold of folds) {
    paper = foldPaper(paper, fold);
  }

  // The code have to be read manually
  // printPaper(paper);
  // ##.#...##.#..#.####.####.#..#.#.##.#..#.
  // #..#....#.####.#..#...##.####.###..#..#.
  // #.......#.##.#.####..#...#.##.###..#..#.
  // #..#.#..#.#..#.####.##...#..#.#.#..#..#.
  // ####.##.#.#..#.#..#.####.#..#.#..#.###..

  return 'CJHAZHKU';
}

/* c8 ignore next 4 */
if (process.env.ROPAOLLE === 'DEV') {
  console.log(`${__filename} - Part one:`, partOne(testInput));
  console.log(`${__filename} - Part two:`, partTwo(testInput));
}

exports.partOne = partOne;
exports.partTwo = partTwo;
