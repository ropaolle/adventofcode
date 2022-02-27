const parse = (input) =>
  input
    .split('\n')
    .map((line) =>
      line
        .slice(0, -1)
        .replace(' would ', ',')
        .replace(' happiness units by sitting next to ', ',')
        .replace(' ', ',')
        .split(',')
    );

// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sets/permutations
const permutateWithoutRepetitions = (permutationOptions) => {
  if (permutationOptions.length === 1) {
    return [permutationOptions];
  }

  // Init permutations array.
  const permutations = [];

  // Get all permutations for permutationOptions excluding the first element.
  const smallerPermutations = permutateWithoutRepetitions(permutationOptions.slice(1));

  // Insert first option into every possible position of every smaller permutation.
  const firstOption = permutationOptions[0];

  for (let permIndex = 0; permIndex < smallerPermutations.length; permIndex += 1) {
    const smallerPermutation = smallerPermutations[permIndex];

    // Insert first option into every possible position of smallerPermutation.
    for (let positionIndex = 0; positionIndex <= smallerPermutation.length; positionIndex += 1) {
      const permutationPrefix = smallerPermutation.slice(0, positionIndex);
      const permutationSuffix = smallerPermutation.slice(positionIndex);
      permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));
    }
  }

  return permutations;
};

const permutateWithoutRepetitionsAndSameOrder = (permutationPattern) => {
  // Remove the first character, get all permutations for the remaining pattern and
  // then prefix all strings with 0.
  const basePattern = permutationPattern.slice(1);
  const basePermutations = permutateWithoutRepetitions(basePattern);

  return basePermutations.map((v) => permutationPattern[0] + v);
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

  // Get all uniqe combinations, without repetition.
  // As this is a circular permutation we can also ignore all combinations that are in the semr order,
  // i.e. ABCD is equal to BCDA. This can be done by consider the first element as "fixed" and freely
  // permutate the other.
  const permutationPattern = keys.reduce((acc, _, i) => acc + i, '');
  const permutations = permutateWithoutRepetitionsAndSameOrder(permutationPattern);

  for (const p of permutations) {
    happiness = Math.max(happiness, getHappiness(p, nodes, keys));
  }

  return happiness;
};

const partOne = (input) => happinessChange(parse(input));

const partTwo = (input) => happinessChange(parse(input), true);

exports.partOne = partOne;
exports.partTwo = partTwo;
