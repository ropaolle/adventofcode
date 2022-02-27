const getBoards = (data) =>
  data.reduce((acc, val, i) => {
    const currentBoard = Math.ceil((i + 1) / 5);
    const valueArray = val.trim().replace(/ {2}/g, ',').replace(/ /g, ',').split(',').map(Number);
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
      board[j] + board[j + 1] + board[j + 2] + board[j + 3] + board[j + 4] === -5 ||
      board[0 + i] + board[5 + i] + board[10 + i] + board[15 + i] + board[20 + i] === -5
    ) {
      return true;
    }
  }
};

const getScore = (board, number) =>
  board.reduce((acc, v) => (v !== -1 ? acc + v : acc), 0) * number;

const parse = (input) => {
  const data = input.split('\n').filter((line) => line.length !== 0);
  const numbers = data.shift().split(',').map(Number);
  const boards = getBoards(data);
  return [numbers, boards];
};

const partOne = (input) => {
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
};

// eslint-disable-next-line complexity
const partTwo = (input) => {
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
};

exports.partOne = partOne;
exports.partTwo = partTwo;
