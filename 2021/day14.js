const parse = (input) => input.split('\n').map((v) => v.split(' -> '));

const numSort = (a, b) => a - b;

const ord = (str) => str.charCodeAt(0);

const findPatterns = (pattern, str) => {
  const result = [];
  let i = str.indexOf(pattern, 0);
  while (i >= 0) {
    result.push(i);
    i = str.indexOf(pattern, i + 1);
  }

  return result;
};

// eslint-disable-next-line complexity
const partOne = (input) => {
  const data = parse(input);

  let [template, rules] = data.reduce(
    (acc, v) => {
      if (v.length === 1 && v[0].length > 0) {
        acc[0] = v[0];
      } else if (v.length === 2) {
        acc[1].push(v);
      }

      return acc;
    },
    [[], []]
  );

  for (let i = 0; i < 10; i++) {
    let t = [...template];
    let inserts = [];

    for (const [pattern, insert] of rules) {
      const hits = findPatterns(pattern, template);
      for (const hit of hits) {
        inserts[hit] = insert;
      }
    }

    while (inserts.length > 0) {
      const pos = inserts.length;
      const insert = inserts.pop();
      t.splice(pos, 0, insert);
    }

    template = t.join('');
  }

  const charCounts = template
    .split('')
    .reduce((acc, ch) => {
      const i = ord(ch);
      if (!acc[i]) {
        acc[i] = 0;
      }
      acc[i] += 1;
      return acc;
    }, [])
    .filter((v) => v)
    .sort(numSort);

  return charCounts[charCounts.length - 1] - charCounts[0];
};

// https://github.com/ethsgo/aoc/blob/main/js/_14.js
const partTwo = (input) => {
  const data = parse(input);

  let [template, rulesKV] = data.reduce(
    (acc, v) => {
      if (v.length === 1 && v[0].length > 0) {
        acc[0] = v[0].split('');
      } else if (v.length === 2) {
        acc[1].push(v);
      }

      return acc;
    },
    [[], []]
  );

  const rules = new Map(rulesKV);

  const count = (xs) => xs.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map());

  const pairs = (xs) => [...Array(xs.length - 1)].map((_, i) => [xs[i], xs[i + 1]].join(''));

  const incr = (m, k, d) => m.set(k, (m.get(k) ?? 0) + d);
  const minMax = (xs) => [Math.min(...xs), Math.max(...xs)];

  const sim = ({ template, rules }, steps) => {
    let c1 = count(template);
    let c2 = count(pairs(template));
    for (; steps > 0; steps--) {
      const kv = [...c2.entries()].filter((e) => e[1] > 0);
      for (let [p, v] of kv) {
        const n = rules.get(p);
        incr(c1, n, v);
        incr(c2, p, -v);
        incr(c2, [p[0], n].join(''), v);
        incr(c2, [n, p[1]].join(''), v);
      }
    }
    const [min, max] = minMax([...c1.values()]);
    return max - min;
  };

  return sim({ template, rules }, 40);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
