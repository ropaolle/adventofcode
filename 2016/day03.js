const parse = (input) => input.split('\n').map((line) => line.match(/[0-9]{1,3}/g).map(Number));

const isTriangle = ([a, b, c]) => a + b > c && a + c > b && b + c > a;

const partOne = (input) => {
  const data = parse(input);
  let triangles = 0;

  for (const triangle of data) {
    if (isTriangle(triangle)) {
      triangles += 1;
    }
  }

  return triangles;
};

const partTwo = (input) => {
  const data = parse(input);
  let triangles = 0;

  for (let i = 0; i < data.length; i += 3) {
    const [a1, a2, a3] = data[i];
    const [b1, b2, b3] = data[i + 1];
    const [c1, c2, c3] = data[i + 2];

    if (isTriangle([a1, b1, c1])) {
      triangles += 1;
    }
    if (isTriangle([a2, b2, c2])) {
      triangles += 1;
    }
    if (isTriangle([a3, b3, c3])) {
      triangles += 1;
    }
  }

  return triangles;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
