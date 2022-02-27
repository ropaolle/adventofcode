const parse = (input) =>
  input.split('\n').map((line) => {
    const [, name, speed, travelTime, restTime] = line.match(
      /^(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/
    );

    return {
      name,
      speed: Number(speed),
      travelTime: Number(travelTime),
      restTime: Number(restTime),
    };
  });

const getDistances = (data, duration) =>
  data.map((horse) => {
    const { name, speed, travelTime, restTime } = horse;

    const period = travelTime + restTime;
    const cycle = Math.floor(duration / period);
    const rest = duration % period;

    return { name, distance: (cycle * travelTime + Math.min(rest, travelTime)) * speed };
  });

const partOne = (input) => {
  const data = parse(input);
  const distances = getDistances(data, 2503);

  return Math.max(...distances.map(({ distance }) => distance));
};

const partTwo = (input) => {
  const data = parse(input);
  const horses = data.reduce((acc, horse) => ({ ...acc, [horse.name]: 0 }), {});

  for (let i = 1; i <= 2503; i++) {
    const distances = getDistances(data, i);
    const max = Math.max(...distances.map(({ distance }) => distance));
    distances.forEach(({ name, distance }) => {
      if (distance === max) {
        horses[name] += 1;
      }
    });
  }

  return Object.values(horses).reduce((acc, val) => Math.max(acc, val), 0);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
