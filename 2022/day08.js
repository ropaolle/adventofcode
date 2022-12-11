const parse = (input) =>
  input.split('\n').reduce((acc, line) => [...acc, line.split('').map(Number)], []);

/* const printGrid = (grid) => {
  grid.forEach((row) => console.info(row.join(' ')));
  console.info();
}; */

const rotateMatrix = (matrix) =>
  matrix[0].map((val, index) => matrix.map((row) => row[index]).reverse());

const isGreatest = (val, arr) => val > Math.max(...arr);

const partOne = (input) => {
  let forrest = parse(input);
  let visibleTrees = forrest.map((row) => row.map(() => '-'));
  const rows = forrest.length;
  const cols = forrest[0].length;

  for (let i = 0; i < 4; i++) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let val = forrest[r][c];
        let range = forrest[r].slice(c + 1);
        if (isGreatest(val, range)) {
          visibleTrees[r][c] = 'T';
        }
      }
    }
    forrest = rotateMatrix(forrest);
    visibleTrees = rotateMatrix(visibleTrees);
  }

  return visibleTrees.flat().reduce((acc, tree) => (acc += tree === 'T' ? 1 : 0), 0);
};

const viewingDistans = (viewpoint, trees) => {
  let distans = 0;

  for (const tree of trees) {
    if (viewpoint === tree) {
      distans++;
      return distans;
    } else if (viewpoint > tree) {
      distans++;
    } /* else if (viewpoint < tree) */ else {
      distans++;
      return distans;
    }
  }

  return distans;
};

const partTwo = (input) => {
  let forrest = parse(input);
  let visibleTrees = forrest.map((row) => row.map(() => 1));
  const rows = forrest.length;
  const cols = forrest[0].length;

  for (let i = 0; i < 4; i++) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let val = forrest[r][c];
        let range = forrest[r].slice(c + 1);
        visibleTrees[r][c] *= viewingDistans(val, range);
      }
    }
    forrest = rotateMatrix(forrest);
    visibleTrees = rotateMatrix(visibleTrees);
  }

  return visibleTrees.flat().reduce((acc, tree) => Math.max(acc, tree), 0);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
