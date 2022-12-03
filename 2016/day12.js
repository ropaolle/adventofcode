const parse = (input) => input.split('\n').map((line) => line.split(' '));

const getRegisterA = (input, registers) => {
  const instructions = parse(input);

  let address = 0;

  while (address < instructions.length) {
    const [instruction, dataA, dataB] = instructions[address];
    if (instruction === 'inc') {
      registers[dataA]++;
    } else if (instruction === 'dec') {
      registers[dataA]--;
    } else if (instruction === 'cpy') {
      !isNaN(dataA) ? (registers[dataB] = Number(dataA)) : (registers[dataB] = registers[dataA]);
    } else if (instruction === 'jnz' && registers[dataA] !== 0) {
      address += Number(dataB) - 1;
    }
    address += 1;
  }

  return registers.a;
};

const partOne = (input) => getRegisterA(input, { a: 0, b: 0, c: 0, d: 0 });

const partTwo = (input) => getRegisterA(input, { a: 0, b: 0, c: 1, d: 0 });

exports.partOne = partOne;
exports.partTwo = partTwo;
