const regEx = /([a-z-]+)|([0-9]+)/g;

const nameSort = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

const parse = (input) =>
  input.split('\n').map((line) => {
    const params = line.match(regEx);
    return {
      checksum: params[2],
      serial: Number(params[1]),
      // Remove last dash
      name: params[0].substring(0, params[0].length - 1),
    };
  });

const partOne = (input) => {
  const data = parse(input);

  let sectorIdSum = 0;

  for (const { name, serial, checksum } of data) {
    const letterCount = name.split('').reduce((acc, chr) => {
      if (chr !== '-') {
        if (chr in acc === false) {
          acc[chr] = 0;
        }
        acc[chr] += 1;
      }
      return acc;
    }, {});

    const groupByCount = Object.entries(letterCount).reduce((acc, [chr, count]) => {
      if (count in acc === false) {
        acc[count] = [];
      }
      acc[count].push(chr);
      return acc;
    }, {});

    const lettersSorted = Object.entries(groupByCount).map((val) => [
      val[0],
      val[1].sort(nameSort),
    ]);

    const sortedByCount = lettersSorted.sort((a, b) => Number(b[0]) - Number(a[0]));

    const sorted = sortedByCount
      .map((v) => v[1])
      .flat()
      .join('');

    if (sorted.indexOf(checksum) === 0) {
      sectorIdSum += serial;
    }
  }

  return sectorIdSum;
};

const decryptName = (name, serial) => {
  return name
    .split('')
    .map((chr) => {
      const diff = serial % 26;
      const code = chr.charCodeAt(0) - 97;
      return chr === '-' ? ' ' : String.fromCharCode(97 + ((code + diff) % 26));
    })
    .join('');
};

const partTwo = (input) => {
  const data = parse(input);

  for (const { name, serial } of data) {
    const decryptedName = decryptName(name, serial);
    if (decryptedName.indexOf('northpole') > -1) {
      return serial;
    }
  }
};

exports.partOne = partOne;
exports.partTwo = partTwo;
