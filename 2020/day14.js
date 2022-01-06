const { loadData } = require('../../lib.js');

const data = loadData(__dirname, 'data.txt');

const partOne = () => {
  const map = {};
  let orMask, andMask;
  data
    .map((v) => v.split(' = '))
    .forEach(([address, value]) => {
      if (address === 'mask') {
        orMask = BigInt(parseInt(value.replace(/X/g, '0'), 2));
        andMask = BigInt(parseInt(value.replace(/X/g, '1'), 2));
      } else {
        map[address] = Number((BigInt(+value) | orMask) & andMask);
      }
    });
  return Object.values(map).reduce((a, b) => a + b, 0);
};

const partTwo = () => {
  const map = {};
  let masks;
  data
    .map((v) => v.split(' = '))
    .forEach(([address, value]) => {
      if (address === 'mask') {
        const floating = [...value.matchAll('X')].map((m) => 35n - BigInt(m.index));
        const orMask = BigInt(parseInt(value.replace(/X/g, '0'), 2));
        masks = new Array(Math.pow(2, floating.length))
          .fill({ orMask, andMask: 0n })
          .map((x, i) => {
            return floating.reduce(({ orMask, andMask }, position, bit) => {
              if ((i >> bit) & 1) {
                return { orMask: orMask | (1n << position), andMask };
              } else {
                return { orMask, andMask: andMask | (1n << position) };
              }
            }, x);
          });
      } else {
        address = BigInt(+address.match(/\d+/).pop());
        masks.forEach((x) => (map[(address | x.orMask) & ~x.andMask] = +value));
      }
    });
  return Object.values(map).reduce((a, b) => a + b, 0);
};

// console.clear();
console.log('Part one:', partOne());
console.log('Part two:', partTwo());

// Exports
exports.partOne = partOne;
exports.partTwo = partTwo;
