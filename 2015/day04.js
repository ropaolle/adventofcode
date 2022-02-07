const crypto = require('crypto');

const leadingZeros = (count) => (hash) => hash.slice(0, count) === '0'.repeat(count);

const getNumber = (secret, minLeadingZeros) => {
  const MAX_ITERATIONS = 10000000;
  const zeros = leadingZeros(minLeadingZeros);
  let i = 0;
  let hash = '';

  do {
    i += 1;
    hash = crypto
      .createHash('md5')
      .update(secret + i)
      .digest('hex');
  } while (i < MAX_ITERATIONS && !zeros(hash));

  return i;
};

const partOne = (input) => getNumber(input, 5);

const partTwo = (input) => getNumber(input, 6);

exports.partOne = partOne;
exports.partTwo = partTwo;
