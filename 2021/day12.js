const parse = (input) => {
  return input.split(/\r?\n/).map((v) => v.split('-'));
};

const next = (links, u) => [
  ...links.filter((link) => link[0] === u).map((link) => link[1]),
  ...links.filter((link) => link[1] === u).map((link) => link[0]),
];

const pushFrontier = (frontier, v, visited, canSkip) => {
  if (visited.includes(v)) {
    if (canSkip && v !== 'start') {
      frontier.push({ u: v, visited, canSkip: false });
    }
  } else {
    frontier.push({ u: v, visited, canSkip });
  }

  return frontier;
};

const paths = (links, { allowOneSmallCave } = {}) => {
  let frontier = [{ u: 'start', visited: [], canSkip: allowOneSmallCave }];
  let p = 0;

  while (frontier.length > 0) {
    let { u, visited, canSkip } = frontier.pop();

    visited = [...visited];
    if (u === u.toLowerCase()) {
      visited.push(u);
    }

    for (const v of next(links, u)) {
      if (v === 'end') {
        p++;
      } else {
        frontier = pushFrontier(frontier, v, visited, canSkip);
      }
    }
  }

  return p;
};

const partOne = (input) => {
  const data = parse(input);
  return paths(data);
};

const partTwo = (input) => {
  const data = parse(input);
  return paths(data, { allowOneSmallCave: true });
};

exports.partOne = partOne;
exports.partTwo = partTwo;
