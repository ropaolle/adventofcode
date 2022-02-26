const parse = (input) => input.split('\n').map((line) => Number(line));

// Too hard for me. Used solution from https://github.com/MaxArt2501/advent-of-code-2015/tree/master/day-17.

const EGGNOD = 150;

const partOne = (input) => {
  const data = parse(input);

  var ways = (remaining, sizes) =>
    remaining
      ? sizes.reduce(
          (tot, size, i) =>
            remaining >= size ? tot + ways(remaining - size, sizes.slice(i + 1)) : tot,
          0
        )
      : 1;

  return ways(EGGNOD, data);
};

const partTwo = (input) => {
  const data = parse(input);

  // Time to keep track of the lowest amount of containers
  let minCounter = Infinity;
  let totalCounter = 0;

  // This function isn't a one-liner anymore, and now it looks way clearer.
  const ways = (count, remaining, sizes) => {
    if (remaining) {
      // If there's still eggnog, but we already have a better solution, we're outta here
      if (count >= minCounter) {
        return;
      }

      // Else, we cycle through the remaining containers and call the function again.
      sizes.forEach((size, i) => {
        if (remaining >= size) {
          ways(count + 1, remaining - size, sizes.slice(i + 1));
        }
      });
    } else if (count < minCounter) {
      minCounter = count;
      totalCounter = 1;
    } else {
      totalCounter++;
    }
  };

  ways(0, EGGNOD, data);

  return totalCounter;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
