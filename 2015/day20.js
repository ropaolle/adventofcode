const parse = (input) => +input.split('\n')[0];

// Very slow in Jest, but works fine in NodeJs.
/* const factorize = (n) => {
  const factors = [1];
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i * i !== n) {
        factors.push(n / i);
      }
    }
  }

  if (n > 1) {
    factors.push(n);
  }

  return factors.sort((a, b) => a - b);
}; */

const factorize = (n) => {
  if (n > 1) {
    var sqrtn = Math.sqrt(n) | 0;
    var factn = [1, n];
    var ipos = 0;
    for (let i = 2; i <= sqrtn; i++) {
      if (n % i === 0) {
        ipos++;
        if (n / i !== i) {
          factn.splice(ipos, 0, i, n / i);
        } else {
          factn.splice(ipos, 0, i);
        }
      }
    }
  }
  return factn || [1];
};

const getHouseNumber = (input, getPresentCountFunc, divider) => {
  let data = parse(input);
  const presents = data / divider;
  let houseNumber = 1;

  while (getPresentCountFunc(houseNumber) <= presents) {
    houseNumber += 1;
  }

  return houseNumber;
};

const partOne = (input) => {
  const getPresentCount = (houseNumber) => factorize(houseNumber).reduce((acc, v) => acc + v, 0);

  return getHouseNumber(input, getPresentCount, 10);
};

const partTwo = (input) => {
  const getPresentCount = (houseNumber) =>
    factorize(houseNumber).reduce((acc, v) => acc + (houseNumber / v > 50 ? 0 : v), 0);

  return getHouseNumber(input, getPresentCount, 11);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
