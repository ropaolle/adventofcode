const fs = require('fs');

const year = process.argv[2].padStart(4, '20');
const day = process.argv[3].padStart(2, '0');

const { partOne, partTwo } = require(`./${year}/day${day}.js`);

let input = '';

try {
  input = fs.readFileSync(`./${year}/input/day${day}-test.txt`).toString();
} catch (err) {}

// eslint-disable-next-line no-console
console.clear();

console.info(`\n--[ ${year} day ${day} - Part one ]----------------------------------\n`);
console.info('Result:', '\x1b[30m\x1b[42m', `${partOne(input)}`, '\x1b[0m');

console.info(`\n--[ ${year} day ${day} - Part two ]----------------------------------\n`);
console.info('Result:', '\x1b[30m\x1b[42m', `${partTwo(input)}`, '\x1b[0m');
