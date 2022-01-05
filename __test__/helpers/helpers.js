var fs = require('fs');

function aocTest(year, day, answerOne, answerTwo) {
  describe(`Day ${day}`, function () {
    var { partOne, partTwo } = require(`../../${year}/day${day}.js`);
    var file = fs.readFileSync(`./${year}/input/day${day}.txt`).toString();

    it('part one', function () {
      expect(partOne(file)).toBe(answerOne);
    });

    it('part two', function () {
      expect(partTwo(file)).toBe(answerTwo);
    });
  });
}

exports.aocTest = aocTest;
