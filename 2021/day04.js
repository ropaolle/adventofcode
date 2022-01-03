let testInput = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

const getBoards = (data) =>
  data.reduce((acc, val, i) => {
    const currentBoard = Math.ceil((i + 1) / 5);
    const valueArray = val.trim().replace(/  /g, ',').replace(/ /g, ',').split(',').map(Number);
    const newBoard = i % 5;
    if (newBoard === 0) {
      acc[currentBoard - 1] = [];
    }
    acc[currentBoard - 1].push(...valueArray);
    return acc;
  }, []);

const updateBoard = (boards, boardId, number) => {
  boards[boardId] = boards[boardId].map((v) => (v === number ? -1 : v));
};

const hasBingo = (board) => {
  for (let i = 0; i < 5; i++) {
    const j = i * 5;
    if (
      board[j] + board[j + 1] + board[j + 2] + board[j + 3] + board[j + 4] == -5 ||
      board[0 + i] + board[5 + i] + board[10 + i] + board[15 + i] + board[20 + i] == -5
    ) {
      return true;
    }
  }
};

const getScore = (board, number) =>
  board.reduce((acc, v) => (v !== -1 ? acc + v : acc), 0) * number;

function parse(input) {
  const data = input.split(/\r?\n/).filter((line) => line.length !== 0); // Ignore empty lines in the test input
  const numbers = data.shift().split(',').map(Number);
  const boards = getBoards(data);
  return [numbers, boards];
}

function partOne(input) {
  const [numbers, boards] = parse(input);

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    for (let j = 0; j < boards.length; j++) {
      updateBoard(boards, j, number);
      if (hasBingo(boards[j])) {
        return getScore(boards[j], number);
      }
    }
  }
  /* c8 ignore next */
}

function partTwo(input) {
  const [numbers, boards] = parse(input);

  let boardIds = boards.map((_, i) => i);
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    for (let j = 0; j < boards.length; j++) {
      if (boardIds.includes(j)) {
        updateBoard(boards, j, number);
        if (hasBingo(boards[j])) {
          if (boardIds.length === 1) {
            return getScore(boards[j], number);
          } else {
            boardIds = boardIds.filter((item) => item !== j);
          }
        }
      }
    }
  }
}

/* c8 ignore next 4 */
if (process.env.ROPAOLLE === 'DEV') {
  console.log(`${__filename} - Part one:`, partOne(testInput));
  console.log(`${__filename} - Part two:`, partTwo(testInput));
}

exports.partOne = partOne;
exports.partTwo = partTwo;
