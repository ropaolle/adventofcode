const COMPOUND_PATTERN = /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/;

const COMPOUNDS = {
  children: '3',
  cats: '7',
  samoyeds: '2',
  pomeranians: '3',
  akitas: '0',
  vizslas: '0',
  goldfish: '5',
  trees: '3',
  cars: '2',
  perfumes: '1',
};

const parse = (input) => input.split('\n').map((line) => line.match(COMPOUND_PATTERN).slice(1));

const partOne = (input) => {
  const data = parse(input);

  for (const sue of data) {
    if (
      COMPOUNDS[sue[1]] === sue[2] &&
      COMPOUNDS[sue[3]] === sue[4] &&
      COMPOUNDS[sue[5]] === sue[6]
    ) {
      return +sue[0];
    }
  }
};

const compareCompound = (compound, value) => {
  if (['cats', 'trees'].includes(compound)) {
    return COMPOUNDS[compound] < value;
  }

  if (['pomeranians', 'goldfish'].includes(compound)) {
    return COMPOUNDS[compound] > value;
  }

  return COMPOUNDS[compound] === value;
};

const partTwo = (input) => {
  const data = parse(input);

  for (const sue of data) {
    if (
      compareCompound(sue[1], sue[2]) &&
      compareCompound(sue[3], sue[4]) &&
      compareCompound(sue[5], sue[6])
    ) {
      return +sue[0];
    }
  }
};

exports.partOne = partOne;
exports.partTwo = partTwo;
