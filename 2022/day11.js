const regEx = /(Monkey|Starting|Operation|Test|true|false)|(old)|([+*])|(\d+)+/g;

const parse = (input) =>
  input.split('\n').reduce((acc, line) => {
    const [param, ...rest] = line.match(regEx) || [];
    let current = acc[acc.length - 1];

    if (param === 'Monkey') {
      acc.push({
        monkey: Number(rest),
        inspectedItems: 0,
      });
    }

    switch (param) {
      case 'Starting':
        current.items = rest.map(Number);
        break;
      case 'Operation':
        current.operations = [Number(rest[0]), rest[1], Number(rest[2])];
        break;
      case 'Test':
        current.test = Number(rest.pop());
        break;
      case 'true':
        current.trueDest = Number(rest.pop());
        break;
      case 'false':
        current.falseDest = Number(rest.pop());
        break;
    }

    return acc;
  }, []);

const getWorryLevel = (old, operation, divider) => {
  const [valueA, operator, valueB] = operation;
  const a = valueA || old;
  const b = valueB || old;

  if (!divider) {
    return operator === '+' ? a + b : a * b;
  }

  return Math.floor((operator === '+' ? a + b : a * b) / divider);
};

const monkeyBusiness = (data, rounds, divider) => {
  const monkeys = data.length;
  let item;
  let i = 0;

  const decreaser = data.reduce((acc, { test }) => acc * test, 1);

  while (i < rounds * monkeys) {
    const monkey = i % monkeys;
    const { items, operations, test, trueDest, falseDest } = data[monkey];

    data[monkey].inspectedItems += items.length;

    while ((item = items.shift())) {
      const next = getWorryLevel(item, operations, divider);
      const monkeyDest = next % test === 0 ? trueDest : falseDest;
      data[monkeyDest].items.push(next % decreaser);
    }

    i++;
  }

  return data
    .sort((a, b) => a.inspectedItems - b.inspectedItems)
    .slice(-2)
    .reduce((acc, { inspectedItems }) => acc * inspectedItems, 1);
};

const partOne = (input) => monkeyBusiness(parse(input), 20, 3);

const partTwo = (input) => monkeyBusiness(parse(input), 10000);

exports.partOne = partOne;
exports.partTwo = partTwo;
