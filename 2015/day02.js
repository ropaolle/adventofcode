const parse = (input) => input.split(/\r?\n/).map((line) => line.split('x').map(Number));

const partOne = (input) => {
  const data = parse(input);

  let squareFeet = 0;
  for (const [l, w, h] of data) {
    const sideA = l * w;
    const sideB = w * h;
    const sideC = h * l;
    squareFeet += 2 * (sideA + sideB + sideC) + Math.min(sideA, sideB, sideC);
  }

  return squareFeet;
};

const partTwo = (input) => {
  const data = parse(input);

  let feetOfRibbon = 0;
  for (const [l, w, h] of data) {
    feetOfRibbon += l * w * h + (l + w + h - Math.max(l, w, h)) * 2;
  }

  return feetOfRibbon;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
