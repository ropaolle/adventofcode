var { aocTest } = require('./helpers/helpers.js');

describe('AOC 2016', function () {
  aocTest('2016', '01', 161, 110);
  aocTest('2016', '02', '48584', '563B6');
  aocTest('2016', '03', 1032, 1838);
  aocTest('2016', '04', 185371, 984);
  aocTest('2016', '05', '801b56a7', '424a0197'); // INFO: Very slow. Takes around 110 seconds.
  aocTest('2016', '06', 'cyxeoccr', 'batwpask');
  aocTest('2016', '07', 115, 231);
  aocTest('2016', '08', 128, 'EOARGPHYAO');
  aocTest('2016', '09', 115118, 11107527530);
  aocTest('2016', '10', 141, 1209);
  aocTest('2016', '11', 37, 61);
  aocTest('2016', '12', 318117, 9227771);
  aocTest('2016', '13', 86, 127);
  // aocTest('2016', '11', 0, 0);
});
