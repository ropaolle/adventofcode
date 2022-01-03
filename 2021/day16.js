const testInput = `
D2FE28
38006F45291200
EE00D40C823060
8A004A801A8002F478
620080001611562C8802118E34
C0015000016115A2E0802F182340
A0016C880162017C3686B18A3D4780



C200B40A82
04005AC33890
880086C3E88112
CE00C43D881120
D8005AC2A8F0
F600BC2D8F
9C005AC2F8F0
9C0141080250320F1802104A08
`;

function parse(input) {
  return input.split(/\r?\n/).filter((line) => line.length !== 0); // Ignore empty lines in the test input
}

function hex2bin(hex) {
  /* c8 ignore next 3 */
  if (typeof hex !== 'string' || hex.length > 8) {
    throw 'Invalid hex input! Should be a string with max length 8.';
  }
  return parseInt(hex, 16).toString(2).padStart(8, '0');
}

function hextString2bin(str) {
  let binStr = '';
  for (let i = 0; i < Math.ceil(str.length / 2); i++) {
    binStr += hex2bin(str.substring(i * 2, i * 2 + 2));
  }
  return binStr;
}

function getLiteral(data) {
  let values = '';
  while (data.length > 4) {
    values += data.substring(1, 5);
    if (data[0] === '0') {
      break;
    }
    data = data.substring(5);
  }
  const literal = parseInt(values, 2);
  /* c8 ignore next 3 */
  if (literal > Number.MAX_SAFE_INTEGER) {
    throw `Literal ${literal} exceeds MAX_SAFE_INTEGER .`;
  }
  return [literal, data.substring(5)];
}

let subPackets = [];
let versionSum = 0;

function decodePacket(bin) {
  const version = parseInt(bin.substring(0, 3), 2);
  const typeId = parseInt(bin.substring(3, 6), 2);
  let literal;
  let reminder;

  if (typeId === 4) {
    [literal, reminder] = getLiteral(bin.substring(6));
  } else {
    reminder = bin.substring(bin[6] === '0' ? 22 : 18);
  }

  subPackets.push({ version, typeId, literal });
  versionSum += version;

  if (reminder.length < 6) {
    return;
  } else {
    decodePacket(reminder);
  }

  return versionSum;
}

function partOne(input) {
  const data = parse(input);
  let bin = hextString2bin(data[0]);
  return decodePacket(bin);
}

// https://github.com/vendash/AoC/blob/98a8b7bdac2019229126eadb7fdce2740532eb5b/Day_16/2021_16_01.js
// https://github.com/ethsgo/aoc
// https://raw.githubusercontent.com/tymscar/Advent-Of-Code/master/2021/javascript/day16/part2.js

function getPacket(bin) {
  const packet = {};
  packet.version = parseInt(bin.substr(0, 3), 2);
  packet.type = parseInt(bin.substr(3, 3), 2);
  if (packet.type === 4) {
    const bitsRead = [];
    let readPos = 6;
    while (bin.substr(readPos, 1) !== '0') {
      bitsRead.push(bin.substr(readPos + 1, 4));
      readPos += 5;
    }
    bitsRead.push(bin.substr(readPos + 1, 4));
    readPos += 5;
    packet.data = parseInt(bitsRead.join(''), 2);
    packet.bitAfterLast = readPos;
  } else {
    let subPackets = [];
    let lengthSubPackets;
    let subStart;
    const fifteenBitter = bin.substr(6, 1) === '0';
    if (fifteenBitter) {
      lengthSubPackets = parseInt(bin.substr(7, 15), 2);
      subStart = 22;
    } else {
      lengthSubPackets = parseInt(bin.substr(7, 11), 2);
      subStart = 18;
    }

    while (lengthSubPackets > 0) {
      const subPack = getPacket(bin.substr(subStart));
      subStart += subPack.bitAfterLast;
      subPackets.push(subPack);
      if (fifteenBitter) {
        lengthSubPackets -= subPack.bitAfterLast;
      } else {
        lengthSubPackets--;
      }
    }
    packet.bitAfterLast = subStart;

    switch (packet.type.toString()) {
      case '0':
        packet.data = subPackets.reduce((total, curr) => total + curr.data, 0);
        break;
      case '1':
        packet.data = subPackets.reduce((total, curr) => total * curr.data, 1);
        break;
      case '2':
        packet.data = Math.min(...subPackets.map((pack) => pack.data));
        break;
      case '3':
        packet.data = Math.max(...subPackets.map((pack) => pack.data));
        break;
      case '5':
        packet.data = subPackets[0].data > subPackets[1].data ? 1 : 0;
        break;
      case '6':
        packet.data = subPackets[0].data < subPackets[1].data ? 1 : 0;
        break;
      case '7':
        packet.data = subPackets[0].data === subPackets[1].data ? 1 : 0;
        break;
    }
  }

  return packet;
}

function partTwo(input) {
  const data = parse(input);
  return getPacket(hextString2bin(data[0])).data;
}

/* c8 ignore next 4 */
if (process.env.ROPAOLLE === 'DEV') {
  console.info(`${__filename} - Part one:`, partOne(testInput));
  console.info(`${__filename} - Part two:`, partTwo(testInput));
}

exports.partOne = partOne;
exports.partTwo = partTwo;
