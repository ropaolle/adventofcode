const testInput = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`;

/*
0 - 6
1 - 2 [1]
2 - 5
3 - 5
4 - 4 [1]
5 - 5
6 - 6
7 - 3 [1]
8 - 7 [1]
9 - 6

0 a,b,c,-,e,f,g  6
1 -,-,c,-,-,f,- [2]
2 a,-,c,d,e,-,g  5
3 a,-,c,d,-,f,g  5 
4 -,b,c,d,-,f,- [4]
5 a,b,-,d,-,f,g  5
6 a,b,-,d,e,f,g  6
7 a,-,c,-,-,f,- [3]
8 a,b,c,d,e,f,g [7]
9 a,b,c,d,-,f,g  6  1. Same chars as 4


1 -,-,c,-,-,f,- [2]
4 -,b,c,d,-,f,- [4]
7 a,-,c,-,-,f,- [3]
8 a,b,c,d,e,f,g [7]
9 a,b,c,d,-,f,g  6 1. 4 is subset of 9
3 a,-,c,d,-,f,g  5 2. 7 is subset of 3 && 3 is a subset of 9?
0 a,b,c,-,e,f,g  6 3. 7 is subset of 0?
6 a,b,-,d,e,f,g  [6]


5 a,b,-,d,-,f,g  5 4. Endast en skillnad mot 6
2 a,-,c,d,e,-,g  5 5. Bara 2 kvar

acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf
8                         7                 4           1 

1 a,b,-,-,-,-,-
4 a,b,-,-,e,f,-
7 a,b,-,d,-,-,-
8 a,b,c,d,e,f,g
? -,b,c,d,e,f,-
? a,-,c,d,-,f,g
? a,b,c,d,-,f,-
? a,b,c,d,e,f,-
? -,b,c,d,e,f,g
? a,b,c,d,e,-,g
*/

function parse(input) {
  return input.split(/\r?\n/).filter((line) => line.length !== 0); // Ignore empty lines in the test input
}

function partOne(input) {
  const data = parse(input);

  return data.reduce(
    (acc, v) =>
      acc +
      v
        .split(' | ')
        .pop()
        .split(' ')
        .reduce((acc, v) => ([2, 3, 4, 7].includes(v.length) ? acc + 1 : acc), 0),

    0
  );
}

function isSubset(subset, set) {
  return subset && set && [...subset].every((v) => [...set].includes(v));
}

function diffCount(subset, set) {
  if (!subset || !set) {
    return;
  }
  return set.length - [...subset].reduce((acc, v) => ([...set].includes(v) ? acc + 1 : acc), 0);
}

function getValue(data) {
  const patterns = ['', '', '', '', '', '', '', '', '', ''];

  const [input, output] = data
    .split(' | ')
    .map((v) => v.split(' ').map((v) => v.split('').sort().join('')));

  // 1,4,7,8
  for (let i = 0; i < input.length; i++) {
    if (input[i].length === 2) {
      patterns[1] = input[i];
      input[i] = null;
    } else if (input[i].length === 3) {
      patterns[7] = input[i];
      input[i] = null;
    } else if (input[i].length === 4) {
      patterns[4] = input[i];
      input[i] = null;
    } else if (input[i].length === 7) {
      patterns[8] = input[i];
      input[i] = null;
    }
  }

  // 9
  for (let i = 0; i < input.length; i++) {
    if (isSubset(patterns[4], input[i])) {
      patterns[9] = input[i];
      input[i] = null;
      break;
    }
  }

  // 3
  for (let i = 0; i < input.length; i++) {
    if (isSubset(patterns[7], input[i]) && isSubset(input[i], patterns[9])) {
      patterns[3] = input[i];
      input[i] = null;
      break;
    }
  }

  // 0
  for (let i = 0; i < input.length; i++) {
    if (isSubset(patterns[7], input[i])) {
      patterns[0] = input[i];
      input[i] = null;
      break;
    }
  }

  // 6
  for (let i = 0; i < input.length; i++) {
    if (input[i] && input[i].length === 6) {
      patterns[6] = input[i];
      input[i] = null;
      break;
    }
  }

  // 5
  for (let i = 0; i < input.length; i++) {
    if (diffCount(input[i], patterns[6]) === 1) {
      patterns[5] = input[i];
      input[i] = null;
      break;
    }
  }

  // 2
  for (let i = 0; i < input.length; i++) {
    if (input[i]) {
      patterns[2] = input[i];
      input[i] = null;
      break;
    }
  }

  return Number(output.map((v) => patterns.indexOf(v)).join(''));
}

function partTwo(input) {
  const data = parse(input);

  return data.reduce((acc, v) => acc + getValue(v), 0);
}

/* c8 ignore next 4 */
if (process.env.ROPAOLLE === 'DEV') {
  console.info(`${__filename} - Part one:`, partOne(testInput));
  console.info(`${__filename} - Part two:`, partTwo(testInput));
}

exports.partOne = partOne;
exports.partTwo = partTwo;
