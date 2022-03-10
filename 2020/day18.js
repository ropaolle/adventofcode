const parse = (input) => input.split('\n');

const calc1 = (str, len) => {
  let result;
  let action;

  const values = str.split(' ').filter(Boolean);

  for (const val of values) {
    if (isNaN(val)) {
      action = val;
    } else {
      const num = Number(val);
      if (!result) {
        result = num;
      } else {
        result = action === '*' ? result * num : result + num;
      }
    }
  }

  return String(result).padEnd(len);
};

const calc2 = (str, len) => {
  let result;

  const values = str
    .split(' ')
    .filter(Boolean)
    .map((v) => (isNaN(v) ? v : Number(v)));

  for (let i = 1; i < values.length; i += 2) {
    if (values[i] === '+') {
      values[i + 1] = values[i - 1] + values[i + 1];
      values[i - 1] = '';
      values[i] = '';
    }
  }

  for (const val of values.filter(Boolean)) {
    if (val !== '*') {
      if (!result) {
        result = val;
      } else {
        result *= val;
      }
    }
  }

  return String(result).padEnd(len);
};

const evulateExpression = (str, calcFunc) => {
  const pos = [];

  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === '(') {
      pos.push(i);
    } else if (str.charAt(i) === ')') {
      const p = pos.pop();
      const sub = str.substring(p + 1, i);
      if (sub.indexOf('(') === -1) {
        const p1 = str.substring(0, p);
        const p2 = str.substring(i + 1);
        str = p1 + calcFunc(sub, sub.length + 2) + p2;
      }
    }
  }

  return Number(calcFunc(str));
};

const partOne = (input) => {
  const data = parse(input);
  return data.reduce((acc, expression) => acc + evulateExpression(expression, calc1), 0);
};

const partTwo = (input) => {
  const data = parse(input);
  return data.reduce((acc, expression) => acc + evulateExpression(expression, calc2), 0);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
