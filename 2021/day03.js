function parse(input) {
  return input.split(/\r?\n/);
}

function flipBits(str) {
  return str
    .split('')
    .map((b) => (1 - b).toString())
    .join('');
}

function commonBits(data) {
  let result = Array(data[0].length).fill(0);

  for (const bits of data) {
    bits.split('').forEach((bit, i) => {
      result[i] += bit === '1' ? 1 : -1;
    });
  }

  return result.map((v) => (v >= 0 ? 1 : 0)).join('');
}

function mostCommonBit(data, bitPosition) {
  let zeros = 0;
  let ones = 0;

  for (const value of data) {
    const bit = value[bitPosition];
    if (bit === '1') {
      ones += 1;
    } else {
      zeros += 1;
    }
  }

  return ones < zeros ? '0' : '1';
}

function getRating(data, ratingType = 'oxygenGenerator') {
  let dataCopy = [...data];

  for (let i = 0; i < data[0].length; i++) {
    let commonBit = mostCommonBit(dataCopy, i);

    if (ratingType === 'oxygenGenerator') {
      dataCopy = dataCopy.filter((val) => val[i] === commonBit);
    } else {
      dataCopy = dataCopy.filter((val) => val[i] !== commonBit);
    }

    if (dataCopy.length <= 1) {
      break;
    }
  }

  return parseInt(dataCopy[0], 2);
}

function partOne(input) {
  const data = parse(input);
  const gammaBin = commonBits(data);
  const gamma = parseInt(gammaBin, 2);
  const epsilon = parseInt(flipBits(gammaBin), 2);

  return gamma * epsilon;
}

function partTwo(input) {
  const data = parse(input);
  const oxygenGeneratorRating = getRating(data, 'oxygenGenerator');
  const co2ScrubberRating = getRating(data, 'co2Scrubber');

  return oxygenGeneratorRating * co2ScrubberRating;
}

exports.partOne = partOne;
exports.partTwo = partTwo;
