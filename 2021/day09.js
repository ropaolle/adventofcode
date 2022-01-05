const neighbors = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

function compareNumbers(a, b) {
  return b - a;
}

const getLowPoints = (matrix) => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const lowPoints = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const hit = neighbors.every(([nc, nr]) => {
        const dc = c + nc;
        const dr = r + nr;
        return dc < 0 || dc >= cols || dr < 0 || dr >= rows || matrix[dr][dc] > matrix[r][c];
      });

      if (hit) {
        lowPoints.push([r, c]);
      }
    }
  }

  return lowPoints;
};

function parse(input) {
  return input.split(/\r?\n/).map((v) => v.split('').map(Number));
}

function partOne(input) {
  const matrix = parse(input);
  return getLowPoints(matrix).reduce((acc, [r, c]) => (acc += matrix[r][c] + 1), 0);
}

function partTwo(input) {
  const matrix = parse(input);
  const rows = matrix.length;
  const cols = matrix[0].length;
  const lowPoints = getLowPoints(matrix);
  // console.log('\nlowPoints', lowPoints);

  const getMatches = (r, c, level = 0) => {
    let count = 0;
    matrix[r][c] = 9; // set checked to 9
    neighbors.forEach(([nc, nr]) => {
      const dc = c + nc;
      const dr = r + nr;
      if (dc < 0 || dc >= cols || dr < 0 || dr >= rows) {
        // Outside matrix, ignore
      } else if (matrix[dr][dc] === 9) {
        // not part of the basin, ignore
      } else {
        count += 1;
        count += getMatches(dr, dc, level + 1);
      }
    });
    return count;
  };

  return lowPoints
    .reduce((acc, [r, c]) => {
      const count = getMatches(r, c) + 1;
      acc.push(count);
      // console.log('count', count);
      return acc;
    }, [])
    .sort(compareNumbers)
    .splice(0, 3)
    .reduce((acc, v) => acc * v, 1);
}

exports.partOne = partOne;
exports.partTwo = partTwo;
