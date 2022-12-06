const parse = (input) => input.split('\n').map((line) => line.split(' '));

const getRegisterA = (input, registers) => {
  const instructions = parse(input).map((instruction) => {
    if (!isNaN(instruction[1])) {
      instruction[1] = Number(instruction[1]);
    }

    if (instruction[2] && !isNaN(instruction[2])) {
      instruction[2] = Number(instruction[2]);
    }

    return instruction;
  });

  let address = 0;

  while (address < instructions.length) {
    const [instruction, dataA, dataB] = instructions[address];

    switch (instruction) {
      case 'inc':
        registers[dataA]++;
        break;
      case 'dec':
        registers[dataA]--;
        break;
      case 'cpy':
        registers[dataB] = typeof dataA === 'number' ? dataA : registers[dataA];
        break;
      case 'jnz':
        if (registers[dataA] !== 0) {
          address += dataB - 1;
        }
    }

    address++;
  }

  return registers.a;
};

const partOne = (input) => getRegisterA(input, { a: 0, b: 0, c: 0, d: 0 });

const partTwo = (input) => getRegisterA(input, { a: 0, b: 0, c: 1, d: 0 });

exports.partOne = partOne;
exports.partTwo = partTwo;
