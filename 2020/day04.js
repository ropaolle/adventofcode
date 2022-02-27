const parse = (input) => {
  const lines = input.split('\n');

  return lines
    .map((line) => (line === '' ? '|' : line))
    .join(' ')
    .split('|')
    .map((group) =>
      group
        .trim()
        .split(' ')
        .reduce((acc, param) => {
          const [field, value] = param.split(':');
          return { ...acc, [field]: value };
        }, {})
    );
};

const fields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', /* 'cid', */ 'hgt'];

const partOne = (input) =>
  // eslint-disable-next-line no-prototype-builtins
  parse(input).filter((v) => fields.every((field) => v.hasOwnProperty(field))).length;

const validateParamCount = (params, minCount) => Object.keys(params).length >= minCount;
const validateDigitRange = (byr, min, max) => !Number.isNaN(byr) && byr >= min && byr <= max;
const validateHightAndUnit = (param) => {
  const allowedHeightCM = (height) => height >= 150 && height <= 193;
  const allowedHeightIN = (height) => height >= 59 && height <= 74;
  const [, height, unit] = /([0-9]{2,3})(cm|in)/g.exec(param) || [];
  if (Number(height) && unit) {
    return unit === 'cm' ? allowedHeightCM(height) : allowedHeightIN(height);
  }
};
const validateHairColor = (param) => /#[a-z0-9]{6}/.test(param);
const validateEyeColor = (param) =>
  ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(param);
const validatePassportId = (param) => /^\d{9}$/.test(param);

const partTwo = (input) => {
  const data = parse(input);
  const validPassports = data.filter(
    // eslint-disable-next-line complexity
    (v) =>
      validateParamCount(v, 6) &&
      validateDigitRange(Number(v.byr), 1920, 2002) &&
      validateDigitRange(Number(v.iyr), 2010, 2020) &&
      validateDigitRange(Number(v.eyr), 2020, 2030) &&
      validateHightAndUnit(v.hgt) &&
      validateHairColor(v.hcl) &&
      validateEyeColor(v.ecl) &&
      validatePassportId(v.pid)
  );

  return validPassports.length;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
