const parse = (input) => input.split(/\r?\n/);

const isVowel = (ch) => 'aeiou'.indexOf(ch) !== -1;

// eslint-disable-next-line complexity
const partOne = (input) => {
  const data = parse(input);
  let nice = 0;

  for (const line of data) {
    let vowels = isVowel(line[0]) ? 1 : 0;
    let naughty = false;
    let dubbleChar = false;

    for (let i = 0; i < line.length - 1; i++) {
      const ch1 = line[i];
      const ch2 = line[i + 1];

      if (['ab', 'cd', 'pq', 'xy'].includes(ch1 + ch2)) {
        naughty = true;
        break;
      }

      if (ch1 === ch2) {
        dubbleChar = true;
      }

      if (isVowel(ch2)) {
        vowels += 1;
      }
    }

    if (!naughty && vowels >= 3 && dubbleChar) {
      nice += 1;
    }
  }

  return nice;
};

// eslint-disable-next-line complexity
const partTwo = (input) => {
  const data = parse(input);
  let nice = 0;

  for (const line of data) {
    let oneLetterBetween = false;
    let twoLetterTwice = false;

    for (let i = 0; i < line.length - 2; i++) {
      const ch1 = line[i];
      const ch2 = line[i + 1];
      const ch3 = line[i + 2];
      const reminder = line.slice(i + 2);

      if (ch1 === ch3) {
        oneLetterBetween = true;
      }

      if (reminder.indexOf(ch1 + ch2) !== -1) {
        twoLetterTwice = true;
      }
    }

    if (oneLetterBetween && twoLetterTwice) {
      nice += 1;
    }
  }

  return nice;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
