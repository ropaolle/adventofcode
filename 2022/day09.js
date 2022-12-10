const parse = (input) =>
  input
    .split('\n')
    .map((line) => line.split(' '))
    .map(([dir, len]) => [dir, Number(len)]);

/*

// 6270 too high

 let size = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
 size = {
      minX: Math.min(x, size.minX),
      maxX: Math.max(x, size.maxX),
      minY: Math.min(y, size.minY),
      maxY: Math.max(y, size.maxY),
    };
 // console.log('x,y', x, y, size);   

x,y 2 -2 { minX: 0, maxX: 5, minY: -4, maxY: 0 }
x,y -44 242 { minX: -126, maxX: 69, minY: -22, maxY: 289 }

*/

const moves = {
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
  U: { x: 0, y: 1 },
  D: { x: 0, y: -1 },
};

const getSteps = ({ x, y }, dir, len) => {
  let steps = [];

  for (let i = 0; i < len; i++) {
    x += moves[dir].x;
    y += moves[dir].y;
    steps.push({ x, y });
  }

  return steps;
};

const isTailTouching = ({ x: hx, y: hy }, { x: tx, y: ty }) =>
  tx >= hx - 1 && tx <= hx + 1 && ty >= hy - 1 && ty <= hy + 1;

const moveAgainstHead = ({ x: hx, y: hy }, { x: tx, y: ty }) => {
  if (hx > tx) {
    tx++;
  } else if (hx < tx) {
    tx--;
  }

  if (hy > ty) {
    ty++;
  } else if (hy < ty) {
    ty--;
  }

  return { x: tx, y: ty };
};

const distinctTailPositions = (steps, knots = 1) => {
  let head = { x: 0, y: 0 };
  let tails = new Array(knots).fill(0).map(() => ({ x: 0, y: 0 }));
  let tailSteps = new Set(['0y0']);

  for (const [dir, len] of steps) {
    const steps = getSteps(head, dir, len);

    for (let step of steps) {
      for (let i = 0; i < knots; i++) {
        if (!isTailTouching(step, tails[i])) {
          tails[i] = moveAgainstHead(step, tails[i]);
          if (i === knots - 1) {
            tailSteps.add(`${tails[i].x}y${tails[i].y}`);
          }
        }
        step = tails[i];
      }
    }

    head = steps.pop();
  }

  return tailSteps.size;
};

const partOne = (input) => distinctTailPositions(parse(input));

const partTwo = (input) => distinctTailPositions(parse(input), 9);

exports.partOne = partOne;
exports.partTwo = partTwo;
