# Advent of Code

[Advent of Code](https://adventofcode.com/) solutions in JavaScript.

[![Github CI](https://github.com/ropaolle/adventofcode/actions/workflows/codecov.yml/badge.svg)](https://github.com/ropaolle/adventofcode/actions/workflows/codecov.yml)
[![codacy grade](https://img.shields.io/codacy/grade/25a68dd5c77a4b2db7d499f8f8882372?logo=codacy&style=flat)](https://app.codacy.com/gh/ropaolle/adventofcode/dashboard?branch=main)
[![codebeat badge](https://codebeat.co/badges/bf22bb74-c257-4712-95e7-fcdb19808c9b)](https://codebeat.co/projects/github-com-ropaolle-adventofcode-main)
[![codecov](https://codecov.io/gh/ropaolle/adventofcode/branch/main/graph/badge.svg?token=L6A6L78N92)](https://codecov.io/gh/ropaolle/adventofcode)
[![license mit](https://img.shields.io/github/license/ropaolle/adventofcode)](https://opensource.org/licenses/MIT)
[![language](https://img.shields.io/github/languages/top/ropaolle/adventofcode)](https://github.com/ropaolle/adventofcode)
[![Maintainability](https://api.codeclimate.com/v1/badges/a39b07bc89d0cc6c067a/maintainability)](https://codeclimate.com/github/ropaolle/adventofcode/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a39b07bc89d0cc6c067a/test_coverage)](https://codeclimate.com/github/ropaolle/adventofcode/test_coverage)

## Progress

<!--- aoc-progress-start --->

![AoC Progress 2022](https://img.shields.io/static/v1?label=AoC%20Progress%202022&message=64%25%20(16%20of%2025)&color=yellow&logo=github&style=for-the-badge) 
![AoC Progress 2021](https://img.shields.io/static/v1?label=AoC%20Progress%202021&message=64%25%20(16%20of%2025)&color=yellow&logo=github&style=for-the-badge) 
![AoC Progress 2020](https://img.shields.io/static/v1?label=AoC%20Progress%202020&message=68%25%20(17%20of%2025)&color=yellow&logo=github&style=for-the-badge) 
![AoC Progress 2016](https://img.shields.io/static/v1?label=AoC%20Progress%202016&message=48%25%20(12%20of%2025)&color=red&logo=github&style=for-the-badge) 
![AoC Progress 2015](https://img.shields.io/static/v1?label=AoC%20Progress%202015&message=76%25%20(19%20of%2025)&color=yellow&logo=github&style=for-the-badge) 

<!--- aoc-progress-stop --->

## Todo

FIXA: The Jest test seems to accumulate day 1 time into day 2.

## Notes

- Run dev: `npm start -- 2016 01`
- Seed files `npm run seed 2022 01`

### Optimizations

The function `Number()` seems quite exopensive.

## Graph theory

```js
const depthFirstTraverselImperative = (graph, source) => {
  const stack = [source];

  while (stack.length > 0) {
    const current = stack.pop();
    console.log(current);

    for (const neighbor of graph[current]) {
      stack.push(neighbor);
    }
  }
};

const depthFirstTraverselRecursive = (graph, source) => {
  console.log(source);

  for (const neighbor of graph[source]) {
    depthFirstTraverselRecursive(graph, neighbor);
  }
};

const breadthFirstTraversel = (graph, source) => {
  const stack = [source];

  while (stack.length > 0) {
    const current = stack.shift();
    console.log(current);

    for (const neighbor of graph[current]) {
      stack.push(neighbor);
    }
  }
};

const graph = {
  f: ['g', 'i'],
  g: ['h'],
  h: [],
  i: ['g', 'k'],
  j: ['i'],
  k: [],
};

const hasPathDfsImperative = (graph, src, dst) => {
  const queue = [src];

  while (queue.length > 0) {
    const current = queue.shift();

    if (current === dst) {
      return true;
    }

    for (const neighbor of graph[current]) {
      queue.push(neighbor);
    }
  }

  return false;
};

const hasPathDfs = (graph, src, dst) => {
  if (src === dst) {
    return true;
  }

  for (const neighbor of graph[src]) {
    if (hasPathDfs(graph, neighbor, dst)) {
      return true;
    }
  }

  return false;
};
```
