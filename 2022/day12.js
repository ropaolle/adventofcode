const parse = (input) => input.split('\n').map((line) => line.split(''));

const findCell = (grid, chr) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === chr) {
        return { row, col };
      }
    }
  }
};

const getVisitedGrid = (grid, fill = false) =>
  Array(grid.length)
    .fill()
    .map(() => Array(grid[0].length).fill(fill));

// Breadth first traversal (BFS) algorithm
const findShortestPath = (grid, visited, start, end, levels) => {
  const q = [];

  // let steps = 0;

  const rows = grid.length;
  const cols = grid[0].length;

  const isValid = (visited, row, col, cell) => {
    // Cell is out of bounds
    if (row < 0 || col < 0 || row >= rows || col >= cols) {
      return false;
    }

    // Cell too high, i.e. cannot be reached
    const adjCell = grid[row][col];
    if (cell.charCodeAt(0) + 1 < adjCell.charCodeAt(0)) {
      // console.log('cell NOK', cell, adjCell);
      return false;
    }

    // Cell visited
    if (visited[row][col]) {
      return false;
    }

    return true;
  };

  // Direction vectors
  const dRow = [-1, 0, 1, 0];
  const dCol = [0, 1, 0, -1];

  // Push start cell to queue and mark as visited
  q.push([start.row, start.col]);
  visited[start.row][start.col] = true;
  levels[start.row][start.col] = 0;

  while (q.length !== 0) {
    const [row, col] = q[0];
    const cell = grid[row][col];
    // console.log('grid', grid[row][col]);
    q.shift();

    // End found
    if (row === end.row && col === end.col) {
      // console.log('levels', levels[row][col]);
      return levels[row][col];
    }

    // Check adjacent cells
    for (let i = 0; i < 4; i++) {
      const adjRow = row + dRow[i];
      const adjCol = col + dCol[i];

      if (isValid(visited, adjRow, adjCol, cell)) {
        q.push([adjRow, adjCol]);
        visited[adjRow][adjCol] = true;
        levels[adjRow][adjCol] = levels[row][col] + 1;
      }
    }
  }
};

const partOne = (input) => {
  const grid = parse(input);
  const visited = getVisitedGrid(grid);
  const levels = getVisitedGrid(grid, '');
  const start = findCell(grid, 'S');
  const end = findCell(grid, 'E');

  grid[start.row][start.col] = 'a';
  grid[end.row][end.col] = 'z';

  console.log('start', start, end);

  // console.log('grid', grid);
  // const numberGrid = grid.map((row) => row.map((cell) => cell.charCodeAt(0)));

  // findShortestPath(numberGrid, visited, start, end);
  return findShortestPath(grid, visited, start, end, levels);
  // return findShortestPath(grid, visited, end, start, levels);
};

const partTwo = (input) => {
  const data = parse(input);
  return 0;
};

exports.partOne = partOne;
exports.partTwo = partTwo;

/*

// https://www.geeksforgeeks.org/breadth-first-traversal-bfs-on-a-2d-array/

const ROW = 4;
const COL = 4;

// Direction vectors
const dRow = [-1, 0, 1, 0];
const dCol = [0, 1, 0, -1];

// Function to check if a cell is be visited or not
const isValid = (vis, row, col) => {
  // If cell lies out of bounds
  if (row < 0 || col < 0 || row >= ROW || col >= COL) {
    return false;
  }

  // If cell is already visited
  if (vis[row][col]) {
    return false;
  }

  // Otherwise
  return true;
};

// Function to perform the BFS traversal
const BFS = (grid, vis, row, col) => {
  // Stores indices of the matrix cells
  const q = [];

  // Mark the starting cell as visited
  // and push it into the queue
  q.push([row, col]);
  vis[row][col] = true;

  // Iterate while the queue
  // is not empty
  while (q.length != 0) {
    const cell = q[0];
    const x = cell[0];
    const y = cell[1];
    console.log(grid[x][y] + ' ');

    q.shift();

    // Go to the adjacent cells
    for (let i = 0; i < 4; i++) {
      const adjx = x + dRow[i];
      const adjy = y + dCol[i];

      if (isValid(vis, adjx, adjy)) {
        q.push([adjx, adjy]);
        vis[adjx][adjy] = true;
      }
    }
  }
};

// Driver Code
// Given input matrix
const grid = [
  ['a', 'b', 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

*/
