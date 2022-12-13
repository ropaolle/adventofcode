const parse = (input) => input.split('\n').map((line) => line.split(''));

const adjacentVectors = [
  { row: -1, col: 0 },
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 0, col: -1 },
];

const getVisitedGrid = (grid) =>
  Array(grid.length)
    .fill()
    .map(() => Array(grid[0].length).fill(-1));

const findCell = (grid, chr) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === chr) {
        return { row, col };
      }
    }
  }
};

const isReachable = (grid, visited, current, adjacent, rows, cols) => {
  // Adjacent is out of bounds
  if (adjacent.row < 0 || adjacent.col < 0 || adjacent.row >= rows || adjacent.col >= cols) {
    return false;
  }

  // Cell visited
  if (visited[adjacent.row][adjacent.col] > -1) {
    return false;
  }

  // Cell too high, i.e. cannot be reached
  if (
    // Changed to run in revearse, i.e. from end to start
    // grid[current.row][current.col].charCodeAt(0) + 1 <
    // grid[adjacent.row][adjacent.col].charCodeAt(0)
    grid[current.row][current.col].charCodeAt(0) - 1 >
    grid[adjacent.row][adjacent.col].charCodeAt(0)
  ) {
    return false;
  }

  return true;
};

// Breadth first traversal (BFS) algorithm
const findShortestPath = (grid, visited, start, end, endVal) => {
  const q = [];

  const rows = grid.length;
  const cols = grid[0].length;

  // Push start cell to queue and mark as visited
  q.push(start);
  visited[start.row][start.col] = 0;

  while (q.length !== 0) {
    const current = q[0];
    q.shift();

    // Is end found
    if (endVal) {
      if (grid[current.row][current.col] === endVal) {
        return visited[current.row][current.col];
      }
    } else {
      if (current.row === end.row && current.col === end.col) {
        return visited[current.row][current.col];
      }
    }

    // Check adjacent cells
    for (let i = 0; i < 4; i++) {
      const adjacent = {
        row: current.row + adjacentVectors[i].row,
        col: current.col + adjacentVectors[i].col,
      };

      if (isReachable(grid, visited, current, adjacent, rows, cols)) {
        q.push(adjacent);
        visited[adjacent.row][adjacent.col] = visited[current.row][current.col] + 1;
      }
    }
  }
};

const partOne = (input) => {
  const grid = parse(input);
  // Tag visited and to store level/steps
  const visited = getVisitedGrid(grid);
  const start = findCell(grid, 'S');
  const end = findCell(grid, 'E');
  grid[start.row][start.col] = 'a';
  grid[end.row][end.col] = 'z';

  return findShortestPath(grid, visited, end, start);
};

const partTwo = (input) => {
  const grid = parse(input);
  // Tag visited and to store level/steps
  const visited = getVisitedGrid(grid);
  const start = findCell(grid, 'S');
  const end = findCell(grid, 'E');
  grid[start.row][start.col] = 'a';
  grid[end.row][end.col] = 'z';

  return findShortestPath(grid, visited, end, start, 'a');
};

exports.partOne = partOne;
exports.partTwo = partTwo;
