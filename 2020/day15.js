const parse = (input) => input.split(',').map((num) => Number(num));

const partOne = (input) => {
  let initialNumbers = parse(input);

  const TURNS = 2020;

  const numbers = initialNumbers.reduce(
    (acc, number, i) => [...acc, { number, secondToLastSpoken: null, lastSpoken: i + 1 }],
    [0]
  );

  const lastSpoken = (number) => {
    const num = [...numbers].reverse().find((num) => num.number === number);
    return num ? num.lastSpoken : null;
  };

  for (let i = initialNumbers.length + 1; i <= TURNS; i++) {
    const prev = numbers[i - 1];

    if (!prev.secondToLastSpoken) {
      numbers.push({
        number: 0,
        secondToLastSpoken: lastSpoken(0),
        lastSpoken: i,
      });
    } else {
      const number = prev.lastSpoken - prev.secondToLastSpoken;

      numbers.push({
        number,
        secondToLastSpoken: lastSpoken(number),
        lastSpoken: i,
      });
    }
  }

  return numbers[TURNS].number;
};

const partTwo = (input) => {
  let initialNumbers = parse(input);

  const TURNS = 30000000;

  let prevNumber = initialNumbers[initialNumbers.length - 1];

  const numbers = initialNumbers.reduce(
    (acc, number, i) => acc.set(number, { secondToLastSpoken: null, lastSpoken: i + 1 }),
    new Map()
  );

  const lastSpoken = (number) => (numbers.has(number) ? numbers.get(number).lastSpoken : null);
  const secondToLastSpoken = (number) =>
    numbers.has(number) && numbers.get(number).secondToLastSpoken;

  for (let i = initialNumbers.length + 1; i <= TURNS; i++) {
    if (!secondToLastSpoken(prevNumber)) {
      numbers.set(0, { secondToLastSpoken: lastSpoken(0), lastSpoken: i });
      prevNumber = 0;
    } else {
      const prev = numbers.get(prevNumber);
      const number = prev.lastSpoken - prev.secondToLastSpoken;
      numbers.set(number, { secondToLastSpoken: lastSpoken(number), lastSpoken: i });
      prevNumber = number;
    }
  }

  return prevNumber;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
