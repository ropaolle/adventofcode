const parse = (input) => input.split('\n\n').map((group) => group.split('\n').map(JSON.parse));

const compare = (l, r) => {
  // console.log('l,r', l, r);
  if (typeof l === 'number') {
    l = [l];
  }
  if (typeof r === 'number') {
    r = [r];
  }

  if (l.length === 0) {
    return true;
  }

  let x = false;
  for (let i = 0; i < l.length; i++) {
    if (i < r.length) {
      const status = compare(l[i], r[i]);
      if (status) {
      }
      console.log('x', x);
    }
  }

  return x;
};

const partOne = (input) => {
  const data = parse(input);
  // console.log('data', data);

  let t = 0;

  for (let [l, r] of data) {
    compare(l, r);

    // console.log('a', l);
  }
};

const partTwo = (input) => {
  const data = parse(input);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
