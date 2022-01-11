const parse = (input) => {
  const lines = input.split(/\r?\n/);
  return lines.map((v) => v.slice(0, -1));
};

const bagsThatCanContainOtherBags = (data) =>
  data
    .map((v) => {
      const parts = v.split(' bags contain ');
      return { type: parts[0], data: parts[1] };
    })
    .filter(({ data }) => data !== 'no other bags');

const bagsIndirectly = (bagsThatCanContainOtherBags, canContainGoldBags) =>
  bagsThatCanContainOtherBags
    .filter(({ data }) => canContainGoldBags.some((v) => data.indexOf(v) !== -1))
    .map((v) => v.type);

const partOne = (input) => {
  const data = parse(input);

  let canContainGoldBagsDirectly = bagsThatCanContainOtherBags(data)
    .filter(({ data }) => data.indexOf('shiny gold bag') !== -1)
    .map((v) => v.type);

  const set = new Set(canContainGoldBagsDirectly);
  let before = 0;
  do {
    before = set.size;
    canContainGoldBagsDirectly = bagsIndirectly(
      bagsThatCanContainOtherBags(data),
      canContainGoldBagsDirectly
    );
    canContainGoldBagsDirectly.forEach((item) => set.add(item));
  } while (set.size > before);

  return set.size;
};

const getContent = (bagType, data, multiplicator) =>
  bagsThatCanContainOtherBags(data)
    .filter(({ type }) => type === bagType)
    .reduce((acc, { data }) => {
      return acc.concat(data.split(', '));
    }, [])
    .map((v) => {
      const splitted = v.split(' ');
      return {
        count: Number(splitted[0]) * multiplicator,
        type: splitted[1] + ' ' + splitted[2],
      };
    });

const partTwo = (input) => {
  const data = parse(input);

  let bags = getContent('shiny gold', data, 1);
  let sum = 0;
  let prevSum = 0;

  do {
    prevSum = sum;
    bags = bags.reduce((acc, v) => {
      const { count } = v;
      sum += count;
      return [...acc, ...getContent(v.type, data, count)];
    }, []);
  } while (sum > prevSum);

  return sum;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
