const parse = (input) => {
  let [rules, messages] = input.split('\n\n').map((val) => val.split('\n'));

  rules = rules.reduce(
    (acc, msg) => {
      let [rule, vals] = msg.split(': ');

      if (vals[0] === '"') {
        // vals = { type: 'value', data: vals[1] };
        acc.values.set(vals[1], Number(rule));
      } else if (vals.indexOf('|') !== -1) {
        // vals = { type: 'or', data: vals.split(' | ').map((v) => v.split(' ').map(Number)) };
        vals = vals.split(' | ').map((v) => v.split(' ').map(Number));
        acc.rules.set(rule, vals);
      } else {
        // vals = { type: 'rules', data: vals.split(' ').map(Number) };
        vals = vals.split(' ').map(Number);
        acc.rules.set(rule, vals);
      }

      return acc;
    },
    { rules: new Map(), values: new Map() }
  );

  return { ...rules, messages };
};

const partOne = (input) => {
  const data = parse(input);
  console.log('data', data);
  console.log('data', data.rules);

  const va = data.values.get('a');
  const vb = data.values.get('b');

  data.rules.forEach((value, key) => {
    value = value.map((v) => {
      if (Array.isArray(v)) {
        return v.map((w) => (w === va ? 'X' : w === vb ? 'Y' : w));
        // return v.map((w) => (w === va ? 'X' : w));
      } else {
        return v === va ? 'X' : v === vb ? 'Y' : v;
      }
    });
    data.rules.set(key, value);
  });

  for (const rule of data.rules) {
    if (rule[1].flat().includes('X')) {
      console.log('rule', rule);
    }
  }
};

const partTwo = (input) => {
  const data = parse(input);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
