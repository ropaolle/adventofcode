const parse = (input) => {
  const INGREDIENT_PATTERN =
    /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/;

  return input.split('\n').reduce((map, line) => {
    const [, name, capacity, durability, flavor, texture, calories] =
      line.match(INGREDIENT_PATTERN);

    map.set(name, {
      capacity: +capacity,
      durability: +durability,
      flavor: +flavor,
      texture: +texture,
      calories: +calories,
    });

    return map;
  }, new Map());
};

const ingredientScore = (ingredinets, amounts, calories) => {
  const score = {
    capacity: 0,
    durability: 0,
    flavor: 0,
    texture: 0,
    calories: 0,
  };

  Object.entries(amounts).forEach(([ingredient, amount]) => {
    const { capacity, durability, flavor, texture, calories } = ingredinets.get(ingredient);
    score.capacity += amount * capacity;
    score.durability += amount * durability;
    score.flavor += amount * flavor;
    score.texture += amount * texture;
    score.calories += amount * calories;
  });

  if (Math.min(score.capacity, score.durability, score.flavor, score.texture) > 0) {
    if (calories && score.calories !== calories) {
      return;
    }
    return score.capacity * score.durability * score.flavor * score.texture;
  }
};

const maxScore = (data, calories) => {
  var TEASPOONS = 100;
  let maxScore = 0;

  for (var sprinkles = 0; sprinkles <= TEASPOONS; sprinkles++) {
    for (var peanutButter = TEASPOONS - sprinkles; peanutButter >= 0; peanutButter--) {
      for (var frosting = TEASPOONS - sprinkles - peanutButter; frosting >= 0; frosting--) {
        var sugar = TEASPOONS - sprinkles - peanutButter - frosting;
        if (Math.min(sugar, sprinkles, peanutButter, frosting) > 0) {
          const score = ingredientScore(
            data,
            { sugar, sprinkles, peanutButter, frosting },
            calories
          );
          if (score > maxScore) {
            maxScore = score;
          }
        }
      }
    }
  }

  return maxScore;
};

const partOne = (input) => maxScore(parse(input));

const partTwo = (input) => maxScore(parse(input), 500);

exports.partOne = partOne;
exports.partTwo = partTwo;
