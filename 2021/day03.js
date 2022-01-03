let testInput = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

function parse(input) {
  return input.split(/\r?\n/).filter((line) => line.length !== 0); // Ignore empty lines in the test input
}

function flipBits(str) {
  return str
    .split('')
    .map((b) => (1 - b).toString())
    .join('');
}

function commonBits(data) {
  return data
    .reduce((acc, val, i, arr) => {
      val.split('').forEach((val, i) => {
        acc[i] += val == '1' ? 1 : -1;
      });
      return acc;
    }, Array(data[0].length).fill(0))
    .map((v) => (v >= 0 ? 1 : 0))
    .join('');
}

/* for loop
function commonBits(data) {
  let result = Array(data[0].length).fill(0);
  for (const bits of data) {
    bits.split('').forEach((bit, i) => {
      result[i] += bit == '1' ? 1 : -1;
    });
  }
  return result.map((v) => (v >= 0 ? 1 : 0)).join('');
}
*/

function getRating(input, compare) {
  let data = parse(input);

  for (let i = 0; i < data[0].length; i++) {
    if (data.length == 1) {
      break;
    }
    data = data.filter((v) => compare(v, i, data));
  }
  return data.map((v) => parseInt(v, 2)).shift();
}

function partOne(input) {
  const gammaBin = commonBits(parse(input));
  const gamma = parseInt(gammaBin, 2);
  const epsilon = parseInt(flipBits(gammaBin), 2);

  return gamma * epsilon;
}

function partTwo(input) {
  const oxygenGeneratorRating = getRating(input, (v, i, acc) => v[i] === commonBits(acc)[i]);
  const co2ScrubberRating = getRating(input, (v, i, acc) => v[i] !== commonBits(acc)[i]);

  return oxygenGeneratorRating * co2ScrubberRating;
}

/* c8 ignore next 4 */
if (process.env.ROPAOLLE === 'DEV') {
  console.log(`${__filename} - Part one:`, partOne(testInput));
  console.log(`${__filename} - Part two:`, partTwo(testInput));
}

exports.partOne = partOne;
exports.partTwo = partTwo;
