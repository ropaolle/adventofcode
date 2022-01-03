var fs = require('fs');
var expect = require('chai').expect;

function dailyTest(day, answerOne, answerTwo) {
  context(`Day ${day}`, function () {
    if (day === '15') this.timeout(10000);

    var { partOne, partTwo } = require(`../2020/day${day}.js`);
    var file = fs.readFileSync(`./2020/day${day}.txt`).toString();

    it('part one', function () {
      expect(partOne(file)).to.equal(answerOne);
    });

    it('part two', function () {
      expect(partTwo(file)).to.equal(answerTwo);
    });
  });
}

describe('AOC 2020', function () {
  dailyTest('01', 864864, 281473080);
});
