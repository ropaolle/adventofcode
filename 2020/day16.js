const parse = (input) => {
  const [numberData, ticketData, nearbyTicketsData] = input.split('\n\n');

  const numbers = numberData.split('\n').map((v) => {
    const [, name, a1, a2, b1, b2] = v.match(/(.+): (\d+)-(\d+) or (\d+)-(\d+)/);
    return [name, +a1, +a2, +b1, +b2];
  });

  const myTicket = ticketData.split('\n')[1].split(',').map(Number);

  const nearbyTickets = nearbyTicketsData
    .split('\n')
    .filter((v) => v.indexOf(':') === -1)
    .map((v) => v.split(',').map(Number));

  return { numbers, myTicket, nearbyTickets };
};

const partOne = (input) => {
  let { numbers, nearbyTickets } = parse(input);
  const validNumbers = new Set();

  for (const [, a1, a2, b1, b2] of numbers) {
    for (let i = a1; i <= a2; i++) {
      validNumbers.add(i);
    }
    for (let j = b1; j <= b2; j++) {
      validNumbers.add(j);
    }
  }

  const invalidNumbers = nearbyTickets.flat().filter((num) => !validNumbers.has(num));
  const sum = invalidNumbers.reduce((acc, n) => acc + n, 0);

  return sum;
};

const transposeArray = (a) => a[0].map((_, c) => a.map((r) => r[c]));

const inRange = (num, [, a1, a2, b1, b2]) => (num >= a1 && num <= a2) || (num >= b1 && num <= b2);

const partTwo = (input) => {
  let { numbers, nearbyTickets, myTicket } = parse(input);

  const validNearbyTickets = nearbyTickets.filter((ticket) =>
    ticket.every((num) => numbers.some((field) => inRange(num, field)))
  );
  const validTickets = [myTicket, ...validNearbyTickets];
  const validTicketsByRow = transposeArray(validTickets);

  let result = 1;

  while (numbers.length > 0) {
    for (const row of validTicketsByRow) {
      const fields = [...numbers].filter((field) => {
        return row.every((num) => inRange(num, field));
      });

      if (fields.length === 1) {
        const fieldName = fields[0][0];
        numbers = numbers.filter(([name]) => name !== fieldName);
        if (fieldName.indexOf('departure') !== -1) {
          result *= row[0];
        }
      }
    }
  }

  return result;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
