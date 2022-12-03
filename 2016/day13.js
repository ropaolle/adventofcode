var PF = require('pathfinding');

const parse = (input) => input.split(' ').map(Number);

const count1s = (n) => n.toString(2).replace(/0/g, '').length;

const isWall = (x, y, offset) => {
  const sum = x * x + 3 * x + 2 * x * y + y + y * y + offset;
  const bin = (sum >>> 0).toString(2);
  const bits = count1s(bin);

  return bits % 2 === 1;
};

const partOne = (input) => {
  const [favoriteNumber, destCol, destRow] = parse(input);
  const rows = destRow * 2;
  const cols = destCol * 2;

  const grid = new PF.Grid(cols, rows);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (isWall(c, r, favoriteNumber)) {
        grid.setWalkableAt(c, r, false);
      }
    }
  }

  const finder = new PF.AStarFinder();
  const path = finder.findPath(1, 1, destCol, destRow, grid);
  return path.length - 1;
};

const partTwo = (input) => {
  const [favoriteNumber] = parse(input);
  const rows = 51;
  const cols = 51;

  const grid = new PF.Grid(cols, rows);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (isWall(c, r, favoriteNumber)) {
        grid.setWalkableAt(c, r, false);
      }
    }
  }

  const distinctCordinates = new Set();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!(c === 1 && r === 1)) {
        const finder = new PF.AStarFinder();
        const path = finder.findPath(0, 0, r, c, grid.clone());
        if (path.length - 1 <= 50) {
          path.forEach(([x, y]) => distinctCordinates.add(x + '|' + y));
        }
      }
    }
  }

  return distinctCordinates.size;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
