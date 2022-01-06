const { loadData } = require('../../lib.js');

const data = loadData(__dirname, 'data.txt')
  .reduce(
    (acc, line) => {
      if (line.trim().length > 0) {
        acc[acc.length - 1] += line + ' ';
      } else {
        acc.push('');
      }
      return acc;
    },
    ['']
  )
  .map((v) =>
    v
      .trim()
      .split(' ')
      .reduce((acc, v) => {
        const entry = v.split(':');
        acc[entry[0]] = entry[1];
        return acc;
      }, {})
  );

const fields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', /* 'cid', */ 'hgt'];

const partOne = () =>
  data.filter((v) => fields.every((field) => v.hasOwnProperty(field))).length;

const partTwo = () =>
  data.filter((v) => {
    if (Object.keys(v).length < 7) {
      return;
    }

    const byr = Number(v.byr);
    if (Number.isNaN(byr) || byr < 1920 || byr > 2002) {
      return;
    }

    const iyr = Number(v.iyr);
    if (Number.isNaN(iyr) || iyr < 2010 || iyr > 2020) {
      return;
    }

    const eyr = Number(v.eyr);
    if (Number.isNaN(eyr) || eyr < 2020 || eyr > 2030) {
      return;
    }

    const hgt = /([0-9]{2,3})(cm|in)/g.exec(v.hgt);
    if (!hgt) {
      return;
    }
    const hgtNum = Number(hgt[1]);
    if (Number.isNaN(hgtNum) || !['cm', 'in'].includes(hgt[2])) {
      return;
    }
    if (hgt[2] === 'cm' && (hgtNum < 150 || hgtNum > 193)) {
      return;
    }
    if (hgt[2] === 'in' && (hgtNum < 59 || hgtNum > 76)) {
      return;
    }

    if (!/#[a-z0-9]{6}/.test(v.hcl)) {
      return;
    }

    const m = v.ecl && v.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/g);
    if (!m || (Array.isArray(m) && m.length !== 1)) {
      return;
    }

    if (!/^\d{9}$/.test(v.pid)) {
      return;
    }

    return true;
  }).length;

// console.clear();
// console.log('Part one:', partOne());
// console.log('Part two:', partTwo());

// Exports
exports.partOne = partOne;
exports.partTwo = partTwo;
