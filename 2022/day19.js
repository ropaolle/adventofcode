const regEx = /([0-9]+)/g;

const parse = (input) =>
  input.split('\n').map((line) => {
    const [, /* blueprint */ ore, clay, obsidianA, obsidianB, geodeA, geodeB] = line.match(regEx);
    return {
      ore: { cost: { ore: Number(ore) }, count: 1 },
      clay: { cost: { ore: Number(clay) }, count: 0 },
      obsidian: { cost: { ore: Number(obsidianA), clay: Number(obsidianB) }, count: 0 },
      geode: { cost: { ore: Number(geodeA), obsidian: Number(geodeB) }, count: 0 },
    };
  });

const partOne = (input) => {
  const blueprints = parse(input);
  console.log('blueprints', blueprints);
  // TODO: How do I transfor this to a graph?

  return 0;
};

const partTwo = (input) => {
  const data = parse(input);

  return 0;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
