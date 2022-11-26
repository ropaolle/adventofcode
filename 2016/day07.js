const regEx = /([a-z]+)|\[([a-z]+)\]/g;

const parse = (input) =>
  input.split('\n').map((line) =>
    line.match(regEx).reduce(
      (acc, seq) => {
        seq.startsWith('[') && seq.endsWith(']')
          ? acc.hypseqs.push(seq.slice(1, -1))
          : acc.seqs.push(seq);
        return acc;
      },
      { seqs: [], hypseqs: [] }
    )
  );

const hasABBA = (seq) => {
  if (seq.length < 4) {
    return;
  }

  for (let i = 0; i < seq.length - 3; i++) {
    if (seq[i] !== seq[i + 1] && seq[i] === seq[i + 3] && seq[i + 1] === seq[i + 2]) {
      return true;
    }
  }
};

const isValidABBA = (sequences) => {
  for (const seq of sequences.hypseqs) {
    if (hasABBA(seq)) {
      return;
    }
  }

  for (const seq of sequences.seqs) {
    if (hasABBA(seq)) {
      return true;
    }
  }
};

const partOne = (input) => {
  const data = parse(input);

  let ips = 0;

  for (const sequences of data) {
    if (isValidABBA(sequences)) {
      ips += 1;
    }
  }

  return ips;
};

const partTwo = (input) => {
  const data = parse(input);

  let ips = 0;

  for (const { seqs, hypseqs } of data) {
    for (const seq of seqs) {
      for (let i = 0; i < seq.length - 2; i++) {
        if (seq[i] !== seq[i + 1] && seq[i] === seq[i + 2]) {
          const reversedABA = seq[i + 1] + seq[i] + seq[i + 1];
          if (hypseqs.some((seq) => seq.indexOf(reversedABA) > -1)) {
            ips += 1;
            break;
          }
        }
      }
    }
  }

  return ips;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
