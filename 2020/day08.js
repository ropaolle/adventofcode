const parse = (input) => {
  const lines = input.split('\n');

  return lines.map((v) => ({
    operator: v.substring(0, 3),
    argument: Number(v.substring(4)),
  }));
};

const nextPointer = (operator, pointer, argument) => {
  /* istanbul ignore next */
  if (['acc', 'nop'].includes(operator)) {
    pointer += 1;
    // Not matched by the coverage test
  } else if (operator === 'jmp') {
    pointer += argument;
  }

  return pointer;
};

const getLastInstruction = (data) => {
  const usedPointers = new Set();

  let acc = 0;
  let pointer = 0;

  while (pointer < data.length) {
    const { operator, argument } = data[pointer];

    if (operator === 'acc') {
      acc += argument;
    }

    pointer = nextPointer(operator, pointer, argument);

    if (usedPointers.has(pointer)) {
      break;
    }

    usedPointers.add(pointer);
  }

  return { acc, pointer };
};

const partOne = (input) => {
  const data = parse(input);
  const { acc } = getLastInstruction(data);
  return acc;
};

const partTwo = (input) => {
  const data = parse(input);
  let acc = 0;

  const nopsAndJmps = data.reduce((acc, { operator, argument }, i) => {
    if (operator === 'nop') {
      acc.push({ index: i, operator: 'jmp', argument });
    } else if (operator === 'jmp') {
      acc.push({ index: i, operator: 'nop', argument });
    }
    return acc;
  }, []);

  for (let { index, operator } of nopsAndJmps) {
    // Deep cloning needed for objects in the array.
    const tempData = JSON.parse(JSON.stringify(data));
    tempData[index].operator = operator;
    const result = getLastInstruction(tempData);

    if (result.pointer >= tempData.length) {
      acc = result.acc;
      break;
    }
  }

  return acc;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
