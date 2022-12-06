/* const firstMarkerPositionNaive = (buffer) => {
  for (let i = 0; i < buffer.length - 3; i++) {
    const a = buffer[i];
    const b = buffer[i + 1];
    const c = buffer[i + 2];
    const d = buffer[i + 3];
    if (a === b || a === c || a === d || b === c || (b === d) | (c === d)) {
      continue;
    } else {
      return i + 4;
    }
  }
}; */

const firstMarkerPosition = (input, size) => {
  let notEqualCount = 0;
  let rest = input;

  while (notEqualCount < size) {
    let comp = rest[0];
    let indexOf = rest.slice(1, size - notEqualCount).indexOf(comp);
    rest = rest.slice(1);

    if (indexOf === -1) {
      notEqualCount++;
    } else {
      notEqualCount = 0;
    }
  }

  return input.length - rest.length;
};

const partOne = (input) => firstMarkerPosition(input, 4);

const partTwo = (input) => firstMarkerPosition(input, 14);

exports.partOne = partOne;
exports.partTwo = partTwo;
