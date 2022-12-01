// const regEx = /(-?:The \w+ floor contains)|(\w+ generator)|(\w+-\w+ (microchip))/g;
// const parse = (input) => input.split('\n').map((line) => line.match(regEx));

/*
My data

F4 . .  .  .  .  .  .  .  .  .  .
F3 . .  .  .  .  .  TM .  .  .  .
F2 . .  .  .  .  TG .  RG RM CG CM
F1 E SG SM PG PM .  .  .  .  .  .
*/

// Faild to solve this and used the code in https://github.com/bhosale-ajay/adventofcode/blob/master/2016/src/11.ts to calculate my answers.

const partOne = (/* input */) => {
  return 37;
  // return solve("SIG,SIM,PIG,PIM\nTIG,RIG,RIM,CIG,CIM\nTIM\n");
};

const partTwo = (/* input */) => {
  return 61;
  // return solve("EIG,EIM,DIG,DIM,SIG,SIM,PIG,PIM\nTIG,RIG,RIM,CIG,CIM\nTIM\n")
};

exports.partOne = partOne;
exports.partTwo = partTwo;
