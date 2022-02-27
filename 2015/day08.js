const parse = (input) => input.split('\n');

const partOne = (input) => {
  const data = parse(input);
  let charCount = 0;
  let charInMemCount = 0;

  for (const str of data) {
    charCount += str.length;
    // Escape: \\, \" and \x00
    const s = str
      .slice(1, -1) // Remove the first and last ".
      .replace(/\\"/g, '#')
      .replace(/\\\\/g, '#')
      .replace(/\\x[0-9a-f]{2}/g, '#');
    charInMemCount += s.length;
  }

  return charCount - charInMemCount;
};

const partTwo = (input) => {
  const data = parse(input);

  let charCount = 0;
  let encodedCharCount = 0;

  for (const str of data) {
    charCount += str.length;

    const s = str
      // .slice(1, -1) // Remove the first and last ".
      .replace(/\\"/g, '####')
      .replace(/\\\\/g, '++++')
      .replace(/\\x[0-9a-f]{2}/g, '%%%%%');

    // +4: the tthe first and last " should be replaced with "/"..."/" e.g 6 characters.
    encodedCharCount += s.length + 4;
  }

  return encodedCharCount - charCount;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
