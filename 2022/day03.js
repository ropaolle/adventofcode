const parse = (input) => input.split('\n').map((line) => line);

const getPriority = (item) => {
  const code = item.charCodeAt(0);
  return code < 97 ? code - 38 : code - 96;
};

const partOne = (input) => {
  const data = parse(input);

  let sum = 0;

  for (const rucksack of data) {
    const compartementA = rucksack.slice(0, rucksack.length / 2);
    const compartementB = rucksack.slice(-rucksack.length / 2);

    const items = new Set();
    for (const item of compartementA.split('')) {
      if (compartementB.split('').includes(item)) {
        items.add(getPriority(item));
      }
    }
    sum += [...items].reduce((acc, val) => acc + val);
  }

  return sum;
};

const partTwo = (input) => {
  const data = parse(input).reduce((acc, rucksack, i) => {
    if (i % 3 === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(rucksack);
    return acc;
  }, []);

  let sum = 0;

  for (const [rucksackA, rucksackB, rucksackC] of data) {
    for (const item of rucksackA.split('')) {
      if (rucksackB.split('').includes(item) && rucksackC.split('').includes(item)) {
        sum += getPriority(item);
        break;
      }
    }
  }

  return sum;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
