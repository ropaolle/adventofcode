const parse = (input) => input.split(/\r?\n/).pop();

const ord = (str) => str.charCodeAt(0);
const chr = (code) => String.fromCharCode(code);

const isStraight = (chA, chB, chC) => ord(chB) - ord(chA) === 1 && ord(chC) - ord(chB) === 1;

// eslint-disable-next-line complexity
const validate = (password) => {
  if (password.length !== 8) {
    return;
  }

  let includesStraight = false;
  let nonOverlappingPairs = 0;
  let skipNext = false;

  for (let i = 0; i < password.length; i++) {
    if (['i', 'o', 'l'].includes(password[i])) {
      return;
    }

    if (i < password.length - 2 && isStraight(password[i], password[i + 1], password[i + 2])) {
      includesStraight = true;
    }

    if (i < password.length - 1) {
      if (skipNext === true) {
        skipNext = false;
      } else if (password[i] === password[i + 1]) {
        nonOverlappingPairs += 1;
        skipNext = true;
      }
    }
  }

  if (!includesStraight) {
    return;
  }

  if (nonOverlappingPairs < 2) {
    return;
  }

  return true;
};

const getNextChar = (ch) => {
  let nextChar = chr(ord(ch) + 1);
  // Not allowed chars, skip
  if (['i', 'o', 'l'].includes(nextChar)) {
    nextChar = chr(ord(nextChar) + 1);
  }
  return nextChar;
};

const increment = (password) => {
  const passwordArr = password.split('');
  let pointer = password.length - 1;

  while (pointer) {
    if (passwordArr[pointer] !== 'z') {
      passwordArr[pointer] = getNextChar(passwordArr[pointer]);
      pointer = null;
    } else {
      passwordArr[pointer] = 'a';
      pointer -= 1;
    }
  }

  return passwordArr.join('');
};

const nextPassword = (password) => {
  const MAX_ITERATIONS = 1000000;

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    password = increment(password);
    if (validate(password)) {
      return password;
    }
  }

  return password;
};

const partOne = (input) => {
  const password = parse(input);
  return nextPassword(password);
};

const partTwo = (input) => {
  const password = parse(input);
  return nextPassword(nextPassword(password));
};

exports.partOne = partOne;
exports.partTwo = partTwo;
