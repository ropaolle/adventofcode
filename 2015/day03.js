const addHouse = ({ northSouth, eastWest }, dir, houses) => {
  switch (dir) {
    case '>':
      eastWest += 1;
      break;
    case '<':
      eastWest -= 1;
      break;
    case '^':
      northSouth += 1;
      break;
    case 'v':
      northSouth -= 1;
      break;
  }
  houses.add(eastWest + 'x' + northSouth);

  return { northSouth, eastWest };
};

const partOne = (input) => {
  const houses = new Set();
  houses.add('0x0');

  let santa = { northSouth: 0, eastWest: 0 };

  for (let i = 0; i < input.length; i++) {
    santa = addHouse(santa, input[i], houses);
  }

  return houses.size;
};

const partTwo = (input) => {
  const houses = new Set();
  houses.add('0x0');

  let santa = { northSouth: 0, eastWest: 0 };
  let roboSanta = { northSouth: 0, eastWest: 0 };

  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      santa = addHouse(santa, input[i], houses);
    } else {
      roboSanta = addHouse(roboSanta, input[i], houses);
    }
  }

  return houses.size;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
