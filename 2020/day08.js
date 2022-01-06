const { loadData } = require('../../lib.js');

const data = loadData(__dirname, 'data.txt').map((v) => ({
  operator: v.substring(0, 3),
  argument: Number(v.substring(4)),
}));

const getLastInstruction = (data) => {
  const usedPointers = new Set();
  const maxItterations = 10000;
  // const view = [];
  let acc = 0;
  let pointer = 0;
  let index = 0;

  while (pointer < data.length && index < maxItterations) {
    const { operator, argument } = data[pointer];
    // view.push({ operator, argument, acc });

    if (operator === 'acc') {
      acc += argument;
      pointer += 1;
    } else if (operator === 'jmp') {
      pointer += argument;
    } else if (operator === 'nop') {
      pointer += 1;
    }

    if (pointer < 0 || pointer > data.length) {
      console.log('Error-pointer', pointer);
    }

    if (usedPointers.has(pointer)) {
      // view.push({ operator, argument, acc });
      break;
    }

    usedPointers.add(pointer);
    index += 1;
  }

  // console.table(view);
  return { acc, pointer, index, instructions: data.length };
};

const partOne = () => {
  const { acc } = getLastInstruction(data);
  return acc;
};

const partTwo = () => {
  let acc = 0;

  const nopsAndJmps = data.reduce((acc, { operator, argument }, i) => {
    if (operator === 'nop') {
      acc.push({ index: i, operator: 'jmp', argument });
    } else if (operator === 'jmp') {
      acc.push({ index: i, operator: 'nop', argument });
    }
    return acc;
  }, []);

  for (let { index, operator, argument } of nopsAndJmps) {
    // Deep clooning needed for objects in the array.
    const tempData = JSON.parse(JSON.stringify(data))
    tempData[index].operator = operator;
    const result = getLastInstruction(tempData);
    if (result.pointer >= tempData.length) {
      acc = result.acc
      break;
    }
  }

  return acc;
};

// console.clear();
// console.log('Part one:', partOne());
// console.log('Part two:', partTwo());

// Exports
exports.partOne = partOne;
exports.partTwo = partTwo;
