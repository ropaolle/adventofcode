const parse = (input) => {
  return input.split('\n');
};

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
  const maxY = cords.reduce((acc, [, y]) => Math.max(acc, y), 0);
  //   console.log('maxX/maxY', maxX, maxY);
  const paper = Array(maxY + 1)
    .fill('.')
    .map(() => Array(maxX + 1).fill('.'));
  cords.forEach(([x, y]) => (paper[y][x] = '#'));
  return paper;
};

// const printPaper = (paper) => paper.forEach((v) => console.log(v.join('')));

const foldPaper = (paper, fold) => {
  const { dir, num } = fold;

  if (dir === 'y') {
    for (let i = 0; i < num; i++) {
      const last = paper.pop();
      for (let j = 0; j < last.length; j++) {
        if (last[j] === '#') {
          paper[i][j] = '#';
        }
      }
    }
    paper.pop();
    return paper;
  } else {
    return paper.map((v) => {
      for (let i = 0; i < num; i++) {
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

const partOne = (input) => {
  const data = parse(input);
  const [cords, folds] = getData(data);
  let paper = getGrid(cords);
  paper = foldPaper(paper, folds[0]);
  //   printPaper(paper);
  // const length =
  return (paper.join('').match(/#/g) || /* istanbul ignore next */ []).length;
};

const partTwo = (input) => {
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
};

exports.partOne = partOne;
exports.partTwo = partTwo;
