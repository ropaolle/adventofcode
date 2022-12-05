const parse = (input) => {
  const data = input.split('\n').reduce(
    (acc, line) => {
      if (line.length > 0) {
        if (line.startsWith('move')) {
          acc.instructions.push(line.match(/\d+/g).map(Number));
        } else if (line.indexOf('[') > -1) {
          for (let i = 0; i < line.length / 4; i++) {
            const chr = line[i * 4 + 1];
            if (i in acc.stacks === false) {
              acc.stacks.push([]);
            }
            if (chr !== ' ') {
              acc.stacks[i].push(chr);
            }
          }
        }
      }
      return acc;
    },
    { stacks: [], instructions: [] }
  );

  data.stacks = data.stacks.map((a) => a.reverse());

  return data;
};

const partOne = (input) => {
  const { stacks, instructions } = parse(input);

  for (const [count, from, to] of instructions) {
    for (let i = 0; i < count; i++) {
      stacks[to - 1].push(stacks[from - 1].pop());
    }
  }

  return stacks.map((v) => v.pop()).join('');
};

const partTwo = (input) => {
  const { stacks, instructions } = parse(input);

  for (const [count, from, to] of instructions) {
    stacks[to - 1] = stacks[to - 1].concat(stacks[from - 1].splice(-count));
  }

  return stacks.map((v) => v.pop()).join('');
};

exports.partOne = partOne;
exports.partTwo = partTwo;
