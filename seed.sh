touch "./$1/input/day$2.txt"
touch "./$1/input/day$2-test.txt"

cat << EOF > "./$1/day$2.js"
const regEx = /([a-z-]+)|([0-9]+)/g;

const parse = (input) => input.split('\n').map((line) => line);

const partOne = (input) => {
  const data = parse(input);
  console.log(data);

  return 0;
};

const partTwo = (input) => {
  const data = parse(input);

  return 0;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
EOF