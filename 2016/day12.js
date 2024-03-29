const parse = (input) => input.split('\n').map((line) => line.split(' '));

/* Optimization - https://www.reddit.com/r/adventofcode/comments/5hus40/comment/db4chsi/?utm_source=share&utm_medium=web2x&context=3

inc x
dec y
jnz y -2

could be replaced with 

add x y
nop
nop

*/

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
        break;
      case 'add':
        registers[dataA] += registers[dataB];
        registers[dataB] = 0;
    }

    address++;
  }

  return registers.a;
};

const partOne = (input) => getRegisterA(input, { a: 0, b: 0, c: 0, d: 0 });

const partTwo = (input) => getRegisterA(input, { a: 0, b: 0, c: 1, d: 0 });

exports.partOne = partOne;
exports.partTwo = partTwo;
