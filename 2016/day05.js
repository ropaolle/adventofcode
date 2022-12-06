const crypto = require('crypto');

const partOne = (input) => {
  let i = 0;
  let hash = '';
  let password = '';

  for (let j = 0; j < 8; j++) {
    do {
      i += 1;
      hash = crypto
        .createHash('md5')
        .update(input + i)
        .digest('hex');
    } while (!hash.startsWith('00000'));

    password += hash[5];
  }

  return password;
};

const partTwo = (input) => {
  let i = 0;
  let hash = '';
  let password = ['-', '-', '-', '-', '-', '-', '-', '-'];

  do {
    do {
      i += 1;
      hash = crypto
        .createHash('md5')
        .update(input + i)
        .digest('hex');
    } while (!hash.startsWith('00000'));

    const pos = hash[5];

    if (pos >= 0 && pos < 8 && password[pos] === '-') {
      password[pos] = hash[6];
    }
  } while (password.includes('-'));

  return password.join('');
};

exports.partOne = partOne;
exports.partTwo = partTwo;
