const parse = (input) => input.split('\n\n').map((group) => group.split('\n').map(JSON.parse));

const compare = ([left, right]) => {
  if ([left, right].every(Number.isInteger)) {
    if (left < right) {
      return true;
    }
    if (left > right) {
      return false;
    }
    return;
  }

  if ([left, right].every(Array.isArray)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      const res = compare([left[i], right[i]]);
      if (res != null) {
        return res;
      }
    }

    return compare([left.length, right.length]);
  }

  return compare([[left].flat(), [right].flat()]);
};

const partOne = (input) => {
  const data = parse(input);
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    if (compare(data[i])) {
      sum += i + 1;
    }
  }

  return sum;
};

const partTwo = (input) => {
  const data = parse(input);

  const divider1 = [[2]];
  const divider2 = [[6]];
  let messages = [divider1, divider2];

  for (const msg of data) {
    messages.push(...msg);
  }

  messages = messages.sort((a, b) => {
    if (compare([a, b]) === false) {
      return 1;
    }
    if (compare([a, b]) === true) {
      return -1;
    }

    return 0;
  });

  return (
    (messages.findIndex((v) => v === divider1) + 1) *
    (messages.findIndex((v) => v === divider2) + 1)
  );
};

exports.partOne = partOne;
exports.partTwo = partTwo;
