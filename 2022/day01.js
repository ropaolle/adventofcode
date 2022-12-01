const parse = (input) => input.split('\n').map(Number);

const getTotCals = (input) =>
  parse(input).reduce((acc, cals) => {
    if (acc.length === 0 || cals === 0) {
      acc.push(0);
    }
    acc[acc.length - 1] += cals;
    return acc;
  }, []);

const partOne = (input) => getTotCals(input).reduce((acc, cals) => Math.max(acc, cals));

const partTwo = (input) =>
  getTotCals(input)
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((acc, cals) => acc + cals);

exports.partOne = partOne;
exports.partTwo = partTwo;
