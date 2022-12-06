const parse = (input) => input.split('').map((chr) => chr.charCodeAt(0) - 97);

const increment = (password) => {
  for (let i = password.length - 1; i >= 0; i--) {
    if (password[i] === 25) {
      password[i] = 0;
    } else {
      password[i]++;
      return password;
    }
  }
};

const hasConfusingLetters = (password) => password.some((v) => [8, 14, 11].includes(v));

const twoNonOverlappingPairs = (password) => {
  let pairs = new Set();
  let i = 0;

  while (i < password.length) {
    if (password[i] === password[i + 1]) {
      pairs.add(password[i]);
      if (pairs.size >= 2) {
        return true;
      }
      i += 1;
    }
    i++;
  }

  return pairs.size >= 2;
};

const oneThreeLetterStraight = (password) => {
  for (let i = 0; i < password.length; i++) {
    if (password[i] + 1 === password[i + 1] && password[i] + 2 === password[i + 2]) {
      return true;
    }
  }

  return false;
};

const validate = (password) =>
  !hasConfusingLetters(password) &&
  twoNonOverlappingPairs(password) &&
  oneThreeLetterStraight(password);

const nextPassword = (password) => {
  password = parse(password);

  do {
    password = increment(password);
  } while (!validate(password));

  return password.map((v) => String.fromCharCode(v + 97)).join('');
};

let passwordOne = '';

const partOne = (input) => {
  passwordOne = nextPassword(input);
  return passwordOne;
};

const partTwo = () => {
  return nextPassword(passwordOne);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
