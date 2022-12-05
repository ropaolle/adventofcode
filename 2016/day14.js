const crypto = require('crypto');

const hasTriplet = (hash) => {
  for (let i = 0; i < hash.length - 2; i++) {
    if (hash[i] === hash[i + 1] && hash[i] === hash[i + 2]) {
      return hash[i];
    }
  }
};

const hasQuintet = (hash, chr) => hash.includes(chr.repeat(5));

const getHash = (seed, hashes, repeat = 0) => {
  if (!hashes.has(seed)) {
    let hash = crypto.createHash('md5').update(seed).digest('hex');
    for (let i = 0; i < repeat; i++) {
      hash = crypto.createHash('md5').update(hash).digest('hex');
    }
    hashes.set(seed, hash);
  }
  return hashes.get(seed);
};

const getIndex = (input, repeat = 0) => {
  let i = 0;
  let chr;
  let keyCount = 0;
  const hashes = new Map();

  while (keyCount < 64) {
    let hash = getHash(input + i, hashes, repeat);

    if ((chr = hasTriplet(hash))) {
      for (let j = 0; j < 1000; j++) {
        hash = getHash(input + (i + j + 1), hashes, repeat);
        if (hasQuintet(hash, chr)) {
          keyCount++;
          break;
        }
      }
    }

    i += 1;
  }

  return i - 1;
};

const partOne = (input) => getIndex(input);

const partTwo = (input) => getIndex(input, 2016);

exports.partOne = partOne;
exports.partTwo = partTwo;
