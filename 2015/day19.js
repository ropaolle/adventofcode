const parse = (input) =>
  input.split('\n').reduce(
    (acc, line) => {
      const [p1, p2] = line.split(' => ');
      if (p2) {
        acc.replacements.push([p1, p2]);
      } else if (p1) {
        acc.molecule = p1;
      }
      return acc;
    },
    { replacements: [], molecule: '' }
  );

const getReplacements = (molecule, replacements) => {
  const molecules = new Set();

  for (const [org, replacement] of replacements) {
    let i = 0;
    while (i < molecule.length) {
      const pos = molecule.indexOf(org, i);
      if (pos > -1) {
        const prefix = molecule.slice(0, pos);
        const suffix = molecule.slice(pos + org.length);
        const newMolecule = prefix + replacement + suffix;

        molecules.add(newMolecule);
        i += org.length;
      } else {
        i = Infinity;
      }
    }
  }

  return molecules.size;
};

const partOne = (input) => {
  let { molecule, replacements } = parse(input);

  return getReplacements(molecule, replacements);
};

const partTwo = (input) => {
  let { molecule, replacements } = parse(input);

  let count = 0;
  while (molecule !== 'e') {
    for (const [replacement, element] of replacements) {
      if (molecule.includes(element)) {
        molecule = molecule.replace(element, replacement);
        count += 1;
      }
    }
  }

  return count;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
