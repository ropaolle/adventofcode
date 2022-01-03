const testInput = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

function parse(input) {
  return input
    .split(/\r?\n/)
    .filter((line) => line.length !== 0) // Ignore empty lines in the test input
    .map((v) => v.split('-'));
}

function paths(links, { allowOneSmallCave } = {}) {
  const next = (u) => [
    ...links.filter((link) => link[0] === u).map((link) => link[1]),
    ...links.filter((link) => link[1] === u).map((link) => link[0]),
  ];

  let frontier = [{ u: 'start', visited: [], canSkip: allowOneSmallCave }];
  let p = 0;

  while (frontier.length > 0) {
    let { u, visited, canSkip } = frontier.pop();

    visited = [...visited];
    if (u === u.toLowerCase()) visited.push(u);

    for (const v of next(u)) {
      if (v === 'end') {
        p++;
      } else {
        if (visited.includes(v)) {
          if (canSkip && v !== 'start') {
            frontier.push({ u: v, visited, canSkip: false });
          }
        } else {
          frontier.push({ u: v, visited, canSkip });
        }
      }
    }
  }

  return p;
}

function partOne(input) {
  const data = parse(input);
  return paths(data);
}

function partTwo(input) {
  const data = parse(input);
  return paths(data, { allowOneSmallCave: true });
}

/* c8 ignore next 4 */
if (process.env.ROPAOLLE === 'DEV') {
  console.log(`${__filename} - Part one:`, partOne(testInput));
  console.log(`${__filename} - Part two:`, partTwo(testInput));
}

exports.partOne = partOne;
exports.partTwo = partTwo;
