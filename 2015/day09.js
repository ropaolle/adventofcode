const parse = (input) =>
  input.split(/\r?\n/).map((line) => line.replace(' to ', ',').replace(' = ', ',').split(','));

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

const getNodes = (data) => {
  const nodes = new Map();
  for (const [nodeB, nodeA, dist] of data) {
    if (!nodes.has(nodeA)) {
      nodes.set(nodeA, new Map());
    }
    if (!nodes.has(nodeB)) {
      nodes.set(nodeB, new Map());
    }

    const nA = nodes.get(nodeA);
    if (!nA.has(nodeB)) {
      nA.set(nodeB, Number(dist));
    }

    const nB = nodes.get(nodeB);
    if (!nB.has(nodeA)) {
      nB.set(nodeA, Number(dist));
    }
  }

  return nodes;
};

const getDist = (path, nodes, keys) => {
  let totalDist = 0;

  for (let i = 0; i < path.length - 1; i++) {
    const keyA = keys[Number(path[i])];
    const keyB = keys[Number(path[i + 1])];
    const node = nodes.get(keyA);
    totalDist += node.get(keyB);
  }

  return totalDist;
};

const getMaxOrMinDist = (input, maxDist = true) => {
  let dist = maxDist ? 0 : Infinity;

  const data = parse(input);
  const nodes = getNodes(data);
  const keys = Array.from(nodes.keys());

  // Get all uniqe combinations
  const permutationPattern = keys.reduce((acc, _, i) => acc + i, '');
  const permutations = findPermutations(permutationPattern);

  for (const p of permutations) {
    dist = maxDist
      ? Math.max(dist, getDist(p, nodes, keys))
      : Math.min(dist, getDist(p, nodes, keys));
  }

  return dist;
};

const partOne = (input) => getMaxOrMinDist(input, false);

const partTwo = (input) => getMaxOrMinDist(input, true);

exports.partOne = partOne;
exports.partTwo = partTwo;
