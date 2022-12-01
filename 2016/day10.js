const parse = (input) =>
  input.split('\n').reduce(
    (acc, line) => {
      if (line.startsWith('value')) {
        const [, value, bot] = line.match(/value (\d+) goes to bot (\d+)/);
        acc.values.push({ value: Number(value), bot: Number(bot) });
      } else if (line.startsWith('bot')) {
        const [, id, lowType, lowId, highType, highId] = line.match(
          /bot (\d+) gives low to (\w+) (\d+) and high to (\w+) (\d+)/
        );
        acc.instructions[id] = {
          id: Number(id),
          values: [],
          low: { type: lowType, id: Number(lowId) },
          high: { type: highType, id: Number(highId) },
        };
      }
      return acc;
    },
    { values: [], instructions: [] }
  );

const getBotId = (bot, bots) => {
  const { values, low, high } = bot;

  if (bot.values.length < 2) {
    return;
  }

  if (bot.values.includes(61) && bot.values.includes(17)) {
    return bot.id;
  }

  let hit;

  if (low.type === 'bot') {
    const dest = bots[low.id];
    dest.values.push(Math.min(...values));
    if ((hit = getBotId(dest, bots))) {
      return hit;
    }
  }

  if (high.type === 'bot') {
    const dest = bots[high.id];
    dest.values.push(Math.max(...values));
    if ((hit = getBotId(dest, bots))) {
      return hit;
    }
  }
};

const partOne = (input) => {
  const data = parse(input);

  let bots = {};

  for (const instruction of data.instructions) {
    const bot = instruction;
    bots[bot.id] = bot;
  }

  let hit;

  for (const { value, bot } of data.values) {
    bots[bot].values.push(Number(value));
    if ((hit = getBotId(bots[bot], bots))) {
      return hit;
    }
  }
};

const getOutputValues = (bot, bots, outputs) => {
  const { values, low, high } = bot;

  if (bot.values.length < 2) {
    return outputs;
  }

  if (low.type === 'bot') {
    const dest = bots[low.id];
    dest.values.push(Math.min(...values));
    getOutputValues(dest, bots, outputs);
  } else if (outputs && [0, 1, 2].includes(bot.low.id)) {
    outputs.push(Math.min(...values));
  }

  if (high.type === 'bot') {
    const dest = bots[high.id];
    dest.values.push(Math.max(...values));
    getOutputValues(dest, bots, outputs);
  }

  if (outputs.length === 3) {
    return outputs.reduce((acc, val) => acc * val, 1);
  }
};

const partTwo = (input) => {
  const data = parse(input);

  let bots = {};
  let outputs = [];

  for (const instruction of data.instructions) {
    const bot = instruction;
    bots[bot.id] = bot;
  }

  for (const { value, bot } of data.values) {
    bots[bot].values.push(Number(value));
    outputs = getOutputValues(bots[bot], bots, []);
    if (typeof outputs === 'number') {
      return outputs;
    }
  }
};

exports.partOne = partOne;
exports.partTwo = partTwo;
