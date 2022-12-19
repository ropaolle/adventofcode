const regEx = /([A-Z]{2})|([0-9]+)/g;

const parse = (input) =>
  input.split('\n').reduce((acc, line) => {
    const [valve, flow, ...valves] = line.match(regEx);
    // const id = valve[0].charCodeAt(0) - 65;
    acc.push({ valve, flow: Number(flow), valves, open: false });
    return acc;
  }, []);
// const parse = (input) =>
//   input.split('\n').reduce((acc, line) => {
//     const [valve, flow, ...valves] = line.match(regEx);
//     // const id = valve[0].charCodeAt(0) - 65;
//     acc[valve] = { valve, flow: Number(flow), valves, open: false };
//     return acc;
//   }, {});

// https://github.com/TheAlgorithms/JavaScript/blob/master/Graphs/FloydWarshall.js
// https://www.programiz.com/dsa/floyd-warshall-algorithm
const FloydWarshall = (dist) => {
  // Input:- dist: 2D Array where dist[i][j] = edge weight b/w i and j
  // Output:- dist: 2D Array where dist[i][j] = shortest dist b/w i and j
  const n = dist.length;
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          // dist from i to j via k is lesser than the current distance
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
};

// const maxFlow = (data, valve) => {
//   // console.log('valves', valves);
//   return data[valve].valves.reduce((acc, valve) => Math.max(acc, data[valve].flow));
// };

const partOne = (input) => {
  const data = parse(input);

  const ids = {};
  const q = [];
  q.push({ valve: 0, level: 0 });
  // q.push({ valve: 1, level: 0 });
  // q.push({ valve: 2, level: 0 });
  // q.push({ valve: 3, level: 0 });
  // q.push({ valve: 4, level: 0 });
  // q.push({ valve: 5, level: 0 });
  // q.push({ valve: 6, level: 0 });
  // q.push({ valve: 7, level: 0 });
  // q.push({ valve: 8, level: 0 });
  // q.push({ valve: 9, level: 0 });
  const graph = Array(data.length)
    .fill(0)
    .map(() => Array(data.length).fill('-'));

  for (let i = 0; i < data.length; i++) {
    ids[data[i].valve] = i;
  }

  for (let i = 0; i < data.length; i++) {
    data[i].valves = data[i].valves.map((valve) => ids[valve]);
  }

  console.log(data);

  let i = 0;
  while (q.length > 0 && i < 116900) {
    // console.log('q.shift', q.shift());
    const { valve, level } = q.shift();

    // console.log('valve,level', valve, level);
    // if (level === 0) {
    for (const v of data[valve].valves) {
      if (graph[valve][v] === '-') {
        q.push({ valve: v, level: level + 1 });
        // console.log('v', v);
        // console.log('v', v, valve);
        if (valve === v) {
          graph[valve][v] = 0;
        } else {
          graph[valve][v] = level + 1;
          graph[v][valve] = level + 1;
        }
      }
    }
    // }

    i++;
  }

  console.log('q', q, i);
  graph.forEach((v) => console.log(v.join('')));

  // let step = 0;
  // for (let i = 0; i < 30; i++) {}

  return 0;
};

const partTwo = (input) => {
  const data = parse(input);

  return 0;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
