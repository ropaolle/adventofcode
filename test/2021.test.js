var fs = require('fs');
var expect = require('chai').expect;

function dailyTest(day, answerOne, answerTwo) {
  context(`Day ${day}`, function () {
    if (day === '15') this.timeout(10000);

    var { partOne, partTwo } = require(`../2021/day${day}.js`);
    var file = fs.readFileSync(`./2021/day${day}.txt`).toString();

    it('part one', function () {
      expect(partOne(file)).to.equal(answerOne);
    });

    it('part two', function () {
      expect(partTwo(file)).to.equal(answerTwo);
    });
  });
}

describe('AOC 2021', function () {
  dailyTest('01', 1624, 1653);
  dailyTest('02', 1693300, 1857958050);
  dailyTest('03', 3320834, 4481199);
  dailyTest('04', 71708, 34726);
  dailyTest('05', 3990, 21305);
  dailyTest('06', 391888, 1754597645339);
  dailyTest('07', 323647, 87640209);
  dailyTest('08', 342, 1068933);
  dailyTest('09', 575, 1019700);
  dailyTest('10', 392097, 4263222782);
  dailyTest('11', 1642, 320);
  dailyTest('12', 3887, 104834);
  dailyTest('13', 666, 'CJHAZHKU');
  dailyTest('14', 3306, 3760312702877);
  dailyTest('15', 553, 2858);
  dailyTest('16', 986, 18234816469452);
  // dailyTest('17', 0, 0);
  // dailyTest('18', 0, 0);
  // dailyTest('19', 0, 0);
  // dailyTest('20', 0, 0);
  // dailyTest('21', 0, 0);
  // dailyTest('22', 0, 0);
  // dailyTest('23', 0, 0);
  // dailyTest('24', 0, 0);
  // dailyTest('25', 0, 0);
});
