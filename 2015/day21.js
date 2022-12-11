// https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sets/combinations/combineWithoutRepetitions.js
const combineWithoutRepetitions = (comboOptions, comboLength) => {
  // If the length of the combination is 1 then each element of the original array
  // is a combination itself.
  if (comboLength === 1) {
    return comboOptions.map((comboOption) => [comboOption]);
  }

  // Init combinations array.
  const combos = [];

  // Extract characters one by one and concatenate them to combinations of smaller lengths.
  // We need to extract them because we don't want to have repetitions after concatenation.
  comboOptions.forEach((currentOption, optionIndex) => {
    // Generate combinations of smaller size.
    const smallerCombos = combineWithoutRepetitions(
      comboOptions.slice(optionIndex + 1),
      comboLength - 1
    );

    // Concatenate currentOption with all combinations of smaller size.
    smallerCombos.forEach((smallerCombo) => {
      combos.push([currentOption].concat(smallerCombo));
    });
  });

  return combos;
};

// const regEx = /([a-z-]+)|([0-9]+)/g;
// const regEx = /((Hit Points|Damage|Armor): (\d+))+/gm;
const regEx = /(\d+)+/gm;

// const parse = (input) => input.split('\n').map((line) => line.match(regEx));
const parse = (input) => input.match(regEx).map(Number);

/* 

- The player (you) always goes first. Each attack reduces the opponent's hit points by at least 1. 
- The first character at or below 0 hit points loses.
- Damage dealt by an attacker each turn is equal to the attacker's damage score minus the defender's armor score. 
- An attacker always does at least 1 damage. 
  - So, if the attacker has a damage score of 8, and the defender has an armor score of 3, the defender loses 5 hit points. 
  - If the defender had an armor score of 300, the defender would still lose 1 hit point.
- Your damage score and armor score both start at zero. 
- They can be increased by buying items in exchange for gold. 
- You start with no items and have as much gold as you need. 
- Your total damage or armor is equal to the sum of those stats from all of your items. You have 100 hit points.  

*/

const shop = {
  weapons: [
    { type: 'Dagger', cost: 8, damage: 4, armor: 0 },
    { type: 'Shortsword', cost: 10, damage: 5, armor: 0 },
    { type: 'Warhammer', cost: 25, damage: 6, armor: 0 },
    { type: 'Longsword', cost: 40, damage: 7, armor: 0 },
    { type: 'Greataxe', cost: 74, damage: 8, armor: 0 },
  ],
  armors: [
    { type: 'Paper', cost: 0, damage: 0, armor: 0 },
    { type: 'Leather', cost: 13, damage: 0, armor: 1 },
    { type: 'Chainmail', cost: 31, damage: 0, armor: 2 },
    { type: 'Splintmail', cost: 53, damage: 0, armor: 3 },
    { type: 'Bandedmail', cost: 75, damage: 0, armor: 4 },
    { type: 'Platemail', cost: 102, damage: 0, armor: 5 },
  ],
  rings: [
    { type: 'Damage 0', cost: 0, damage: 0, armor: 0 }, // Emulate zero rings
    { type: 'Damage +1', cost: 25, damage: 1, armor: 0 },
    { type: 'Damage +2', cost: 50, damage: 2, armor: 0 },
    { type: 'Damage +3', cost: 100, damage: 3, armor: 0 },
    { type: 'Defense +1', cost: 20, damage: 0, armor: 1 },
    { type: 'Defense +2', cost: 40, damage: 0, armor: 2 },
    { type: 'Defense +3', cost: 80, damage: 0, armor: 3 },
  ],
};

const partOne = (input) => {
  const [hitPoints, damage, armor] = parse(input);
  const boss = { hitPoints, damage, armor };

  // const me = { hitPoints: 100, damage: 0, armor: 0 }; // Real
  const me = { hitPoints: 8, damage: 5, armor: 5 }; // Test

  console.log('Boss', boss);
  console.log('Me', me);

  // const t1 = combineWithoutRepetitions([1, 2, 3, 4, 5, 6], 2);
  // console.log('t1', t1);

  const sets = [];

  // Get all sets with 1 weapon, 0 or 1 armor and 0 or 1 ring
  for (const weapon of shop.weapons) {
    for (const armor of shop.armors) {
      for (const ring of shop.rings) {
        sets.push([weapon, armor, ring]);
      }
    }
  }

  // Second ring sets
  const secondRing = [];
  for (const ring of shop.rings) {
    secondRing.push([ring]);
  }

  console.log('sets', sets.length * 15);
};

const partTwo = (input) => {
  const data = parse(input);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
