const { loadData } = require('../../lib.js');

const data = loadData(__dirname, 'data.txt', { numeric: false, sorted: false });

const partOne = () => {
  const MAX_ITTERATIONS = 100;

  const timestamp = +data[0];
  const startTimes = data[1]
    .split(',')
    .filter((v) => v !== 'x')
    .map((v) => Number(v));

  for (let index = timestamp; index < timestamp + MAX_ITTERATIONS; index++) {
    const i = startTimes.map((v) => index % v).findIndex((v) => v === 0);
    if (i !== -1) {
      return (index - timestamp) * startTimes[i];
    }
  }

  /* let firstTimestamp = -1;
  let index = timestamp;
  do {
    firstTimestamp = startTimes.map((v) => index % v).findIndex((v) => v === 0);
    if (firstTimestamp !== -1) {
        return (index - timestamp) * startTimes[firstTimestamp];
    }
    index += 1;
} while (true); */
};

const partTwo = () => {
  const START_INDEX = 500000000000000;
  const MAX_ITTERATIONS = 510000000000000;

  // console.log('100000000000000', 1000000000000000000000000000);
  // 17,x,13,19

  //   console.log(1068788 / 19);

  const startTimes = data[1]
    .split(',')
    // .map((v, i) => ({ i, number: Number(v) }))
    // .filter((v) => v.number);
    .map((x, i) => ({ id: +x, offset: i }))
    .filter(({ id }) => !isNaN(id));

  let result = 0;
  let step = 1;
  startTimes.forEach(({ id, offset }) => {
    while ((result + offset) % id !== 0) {
      result += step;
    }
    step *= id; //assumes bus numbers do not have common divisors
  });
  return result;

  /*   for (let index = START_INDEX; index < MAX_ITTERATIONS; index++) {
    const hit = startTimes.every(({ i, number }) => {
      return (index + i) % number === 0;
    });

    if (hit) {
      return [
        index + startTimes[startTimes.length - 1].i,
        index,
        startTimes[startTimes.length - 1].i,
      ];
    } 
  }*/
};

// console.clear();
// console.log('Part one:', partOne());
console.log('Part two:', partTwo());

// Exports
exports.partOne = partOne;
exports.partTwo = partTwo;
