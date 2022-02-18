const parse = (input) =>
  input
    .split(/\r?\n/)
    .map((line) =>
      line
        .slice(0, -1)
        .replace(' would ', ',')
        .replace(' happiness units by sitting next to ', ',')
        .replace(' ', ',')
        .split(',')
    );

// https://levelup.gitconnected.com/find-all-permutations-of-a-string-in-javascript-af41bfe072d2
let findPermutations = (string) => {
  if (string.length < 2) {
    return string;
  }

  let permutationsArray = [];

  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length);
    for (let permutation of findPermutations(remainingChars)) {
      permutationsArray.push(char + permutation);
    }
  }
  return permutationsArray;
};

// eslint-disable-next-line complexity
const getNodes = (data, addMyself) => {
  const nodes = new Map();

  for (const [nodeA, action, value, nodeB] of data) {
    const happiness = (action === 'gain' ? 1 : -1) * Number(value);

    if (!nodes.has(nodeA)) {
      nodes.set(nodeA, new Map());
    }

    const nA = nodes.get(nodeA);
    nA.set(nodeB, happiness);
  }

  if (addMyself) {
    const keys = new Map();
    for (const [key, map] of nodes) {
      map.set('me', 0);
      keys.set(key, 0);
    }
    nodes.set('me', keys);
  }

  return nodes;
};

const getHappiness = (path, nodes, keys) => {
  let happiness = 0;
  const wrappedPath = path[path.length - 1] + path + path[0];

  for (let i = 1; i < wrappedPath.length - 1; i++) {
    const leftNeighbour = keys[Number(wrappedPath[i - 1])];
    const member = keys[Number(wrappedPath[i])];
    const rightNeighbour = keys[Number(wrappedPath[i + 1])];
    const node = nodes.get(member);
    happiness += node.get(leftNeighbour) + node.get(rightNeighbour);
  }

  return happiness;
};

const happinessChange = (data, addMyself = false) => {
  let happiness = 0;

  const nodes = getNodes(data, addMyself);
  const keys = Array.from(nodes.keys());

  // Get all uniqe combinations, without repetition
  const permutationPattern = keys.reduce((acc, _, i) => acc + i, '');
  // As this is a circular permutation we can also ignore all combinations that are in the semr order,
  // i.e. ABCD is equal to BCDA. This can be done by consider the first element as "fixed" and freely
  // permutate the other.

  // Remove the first 0, get all permutations for the remaining pattern and then prefix all strings with 0.
  const permutations = findPermutations(permutationPattern.slice(1)).map((v) => '0' + v);

  for (const p of permutations) {
    happiness = Math.max(happiness, getHappiness(p, nodes, keys));
  }

  return happiness;
};

const partOne = (input) => {
  const data = parse(input);
  return happinessChange(data);
};

const partTwo = (input) => {
  const data = parse(input);
  return happinessChange(data, true);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
