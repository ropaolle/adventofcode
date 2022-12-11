const regEx = /(Monkey|Starting|Operation|Test|true|false)|(old)|([+*])|(\d+)+/g;

const parse = (input) =>
  input.split('\n').reduce((acc, line) => {
    const [param, ...rest] = line.match(regEx) || [];
    let current = acc[acc.length - 1];

    if (param === 'Monkey') {
      acc.push({
        /* monkey: Number(rest) */
      });
    }

    switch (param) {
      case 'Starting':
        current.items = rest.map(Number);
        break;
      case 'Operation':
        current.operations = rest.map((v) => (isNaN(+v) ? v : +v));
        break;
      case 'Test':
        current.test = Number(rest.pop());
        break;
      case 'true':
        current.trueDest = Number(rest.pop());
        break;
      case 'false':
        current.falseDest = Number(rest.pop());
        break;
    }

    return acc;
  }, []);

/*

After each monkey inspects an item but before it tests your worry level,
your worry level to be divided by three and rounded down to the nearest integer.


  'Monkey 0:',
  '  Starting items: 79, 98',
  '  Operation: new = old * 19',
  '  Test: divisible by 23',
  '    If true: throw to monkey 2',
  '    If false: throw to monkey 3',
*/

const partOne = (input) => {
  const data = parse(input);

  console.log('data', data);
};

const partTwo = (input) => {
  const data = parse(input);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
