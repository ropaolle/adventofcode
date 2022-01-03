const testInput = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`;

// Fixade inte denna, använde https://github.com/noamsauerutley/balanced-brackets/blob/master/balancedBrackets.js

let isBalanced = (input) => {
  let brackets = '[]{}()<>';
  let stack = [];
  const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

  for (let bracket of input) {
    let bracketsIndex = brackets.indexOf(bracket);
    if (bracketsIndex % 2 === 0) {
      stack.push(bracketsIndex + 1);
    } else {
      if (stack.length === 0 || stack.pop() !== bracketsIndex) {
        return points[brackets[bracketsIndex]];
      }
    }
  }
  return 0;
};

let isBalanced2 = (input) => {
  let brackets = '[]{}()<>';
  let stack = [];
  const points = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  };

  for (let bracket of input) {
    let bracketsIndex = brackets.indexOf(bracket);
    if (bracketsIndex % 2 === 0) {
      stack.push(bracketsIndex + 1);
    } else {
      if (stack.length === 0 || stack.pop() !== bracketsIndex) {
        return [];
      }
    }
  }
  return stack;
};

function parse(input) {
  return input.split(/\r?\n/).filter((line) => line.length !== 0); // Ignore empty lines in the test input
}

function partOne(input) {
  const data = parse(input);
  return data.reduce((acc, v) => acc + isBalanced(v), 0);
}

function partTwo(input) {
  const data = parse(input);

  const points2 = ['', 2, '', 3, '', 1, '', 4];

  const scores = data
    .map((v) =>
      isBalanced2(v)
        .reverse()
        .reduce((acc, v) => acc * 5 + points2[v], 0)
    )
    .filter((v) => v > 0)
    .sort((a, b) => a - b);

  const mid = Math.ceil((scores.length - 1) / 2);

  return scores[mid];
}

/* c8 ignore next 4 */
if (process.env.ROPAOLLE === 'DEV') {
  console.info(`${__filename} - Part one:`, partOne(testInput));
  console.info(`${__filename} - Part two:`, partTwo(testInput));
}

exports.partOne = partOne;
exports.partTwo = partTwo;
