const parse = (input) => input.split('\n').map((line) => [line[0], line[2]]);

const outcomes = {
  RR: 'draw',
  RP: 'won',
  RS: 'lost',
  PR: 'lost',
  PP: 'draw',
  PS: 'won',
  SR: 'won',
  SP: 'lost',
  SS: 'draw',
};

const scores = { lost: 0, draw: 3, won: 6, R: 1, P: 2, S: 3 };

const opponentHands = { A: 'R', B: 'P', C: 'S' };

const partOne = (input) => {
  const rounds = parse(input);

  const myHands = { X: 'R', Y: 'P', Z: 'S' };

  let score = 0;

  for (const [opponent, me] of rounds) {
    const opponentHand = opponentHands[opponent];
    const myHand = myHands[me];
    score += scores[myHand] + scores[outcomes[opponentHand + myHand]];
  }

  return score;
};

const partTwo = (input) => {
  const rounds = parse(input);

  const opponentHands = { A: 'R', B: 'P', C: 'S' };
  const expectedOutcomes = { X: 'lost', Y: 'draw', Z: 'won' };

  let score = 0;

  for (const [opponent, me] of rounds) {
    const opponentHand = opponentHands[opponent];
    const expectedOutcome = expectedOutcomes[me];
    const expectedHand = Object.entries(outcomes)
      .find(([game, outcome]) => game[0] === opponentHand && outcome === expectedOutcome)
      .shift()[1];
    score += scores[expectedHand] + scores[expectedOutcome];
  }

  return score;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
