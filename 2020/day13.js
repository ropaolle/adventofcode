const parse = (input) => input.split(/\r?\n/);

const partOne = (input) => {
  const data = parse(input);
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
};

const partTwo = (input) => {
  const data = parse(input);
  const startTimes = data[1]
    .split(',')
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
};

exports.partOne = partOne;
exports.partTwo = partTwo;
