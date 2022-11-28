const regEx = /(\([0-9x]+\)|([A-Z]+))/g;

const parse = (input) => input.match(regEx);

const partOne = (input) => {
  const data = parse(input);

  let i = 0;
  let decompressedMessage = '';

  while (i < data.length) {
    const segment = data[i];

    const isMarker = segment[0] === '(';

    if (!isMarker) {
      decompressedMessage += segment;
      i += 1;
    } else {
      const [length, repeat] = segment.match(/([0-9]+)/g);
      let dataSegment = '';
      while (dataSegment.length < length) {
        i += 1;
        dataSegment += data[i];
        if (i >= data.length) {
          return decompressedMessage.length;
        }
      }
      decompressedMessage +=
        dataSegment.slice(0, length).repeat(repeat) + dataSegment.slice(length);
      i += 1;
    }
  }

  return decompressedMessage.length;
};

const partTwo = (input) => {
  const data = parse(input);

  let decompressedLength = 0;

  while (data.length > 0) {
    const segment = data.shift();
    const isMarker = segment[0] === '(';
    if (!isMarker) {
      decompressedLength += segment.length;
    } else {
      const [length, repeat] = segment.match(/([0-9]+)/g);
      let next = '';
      while (next.length < length && data.length > 0) {
        next += data.shift();
      }
      decompressedLength += repeat * partTwo(next);
    }
  }

  return decompressedLength;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
