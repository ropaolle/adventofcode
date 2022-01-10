const parse = (input) => {
  const lines = input.split(/\r?\n/);

  return lines.map((v) => ({
    operator: v.substring(0, 3),
    argument: Number(v.substring(4)),
  }));
};

const getLastInstruction = (data) => {
  const usedPointers = new Set();
  // const maxItterations = 10000;

  let acc = 0;
  let pointer = 0;
  let index = 0;

  while (pointer < data.length /* && index < maxItterations */) {
    const { operator, argument } = data[pointer];

    if (operator === 'acc') {
      acc += argument;
      pointer += 1;
    } else if (operator === 'jmp') {
      pointer += argument;
    } else if (operator === 'nop') {
      pointer += 1;
    }

    if (usedPointers.has(pointer)) {
      break;
    }

    usedPointers.add(pointer);
    index += 1;
  }

  return { acc, pointer, index, instructions: data.length };
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
