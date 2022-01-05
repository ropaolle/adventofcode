function parse(input) {
  return input.split(/\r?\n/).map((line) => Number(line));
}

function partOne(input) {
  const data = parse(input);
  // console.log('data', data, data.length);
  for (let p1 = 0; p1 < data.length - 1; p1++) {
    for (let p2 = p1 + 1; p2 < data.length; p2++) {
      const sum = data[p1] + data[p2];
      // console.log('sum', sum, data[p1], data[p2]);
      // use if nubers are sorted
      // if (sum > 2020) {
      //   break;
      // }
      if (sum === 2020) {
        return data[p1] * data[p2];
      }
    }
  }
}

function partTwo(input) {
  const data = parse(input);
  // console.log('data', data);
  for (let p1 = 0; p1 < data.length - 2; p1++) {
    for (let p2 = p1 + 1; p2 < data.length - 1; p2++) {
      for (let p3 = p2 + 1; p3 < data.length; p3++) {
        const sum = data[p1] + data[p2] + data[p3];
        // use if nubers are sorted
        // if (sum > 2020) {
        //   break;
        // }
        if (sum === 2020) {
          return data[p1] * data[p2] * data[p3];
        }
      }
    }
  }
}

exports.partOne = partOne;
exports.partTwo = partTwo;
