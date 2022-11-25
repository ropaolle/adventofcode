const parse = (input) => input.split('\n').map((line) => line);

/*
const countLettersWithReduce = (string) =>
  string
    .split('')
    .reduce(
      (letters, letter) => letters.set(letter, letters.has(letter) ? letters.get(letter) + 1 : 1),
      new Map()
    );
*/

const countLetters = (string) => {
  const letters = new Map();

  for (const letter of string.split('')) {
    letters.set(letter, letters.has(letter) ? letters.get(letter) + 1 : 1);
  }

  return letters;
};

const getMessage = (data, sortFunc) => {
  let lettersByCol = [];

  for (const message of data) {
    const letters = message.split('');
    for (let j = 0; j < letters.length; j++) {
      if (j in lettersByCol === false) {
        lettersByCol[j] = [];
      }
      lettersByCol[j].push(letters[j]);
    }
  }

  let letterCounts = [];
  for (const letters of lettersByCol) {
    letterCounts.push(countLetters(letters.join('')));
  }

  let message = '';

  for (const letters of letterCounts) {
    message += [...letters].sort(sortFunc)[0][[0]];
  }

  return message;
};

const partOne = (input) => getMessage(parse(input), ([, a], [, b]) => b - a);

const partTwo = (input) => getMessage(parse(input), ([, a], [, b]) => a - b);

exports.partOne = partOne;
exports.partTwo = partTwo;
