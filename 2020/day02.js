function parse(input) {
  const lines = input.split(/\r?\n/);

  return lines.map((line) => {
    const val = line.split(' ');
    const [start, stop] = val[0].split('-');
    return { start, stop, chr: val[1].slice(0, -1), password: val[2] };
  });
}

const partOne = (input) => {
  const data = parse(input);
  return data.filter(({ start, stop, chr, password }) => {
    const count = password.split(chr).length - 1;
    return count >= start && count <= stop;
  }).length;
};

const partTwo = (input) => {
  const data = parse(input);
  return data.filter(({ start, stop, chr, password }) => {
    const pos1 = password[start - 1] === chr;
    const pos2 = password[stop - 1] === chr;
    return pos1 ? !pos2 : pos2;
  }).length;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
