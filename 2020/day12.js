const parse = (input) => {
  const lines = input.split(/\r?\n/);

  return lines.map((v) => ({
    cmd: v[0],
    val: Number(v.substring(1)),
  }));
};

const addDistance = (direction, distance, point) => {
  switch (direction) {
    case 'N':
      point.northSouth += distance;
      break;
    case 'S':
      point.northSouth -= distance;
      break;
    case 'E':
      point.eastWest += distance;
      break;
    case 'W':
      point.eastWest -= distance;
      break;
  }

  return point;
};

const partOne = (input) => {
  const data = parse(input);

  const directions = 'NESW';

  let ship = {
    direction: 1,
    northSouth: 0,
    eastWest: 0,
  };

  // eslint-disable-next-line complexity
  data.forEach(({ cmd, val }) => {
    switch (cmd) {
      case 'F':
        ship = addDistance(directions[ship.direction], val, ship);
        break;
      case 'L':
        // %4 to compensate for negative values
        ship.direction = (ship.direction + 4 - val / 90) % 4;
        break;
      case 'R':
        ship.direction = (ship.direction + val / 90) % 4;
        break;
      case 'N':
      case 'E':
      case 'S':
      case 'W':
        ship = addDistance(cmd, val, ship);
        break;
    }
  });

  return Math.abs(ship.eastWest) + Math.abs(ship.northSouth);
};

/*
NESW
  00:  4 N, 10 E 
 +90:  4 E, 10 S 
+180:  4 S, 10 W 
+270:  4 W, 10 N 
*/

// eslint-disable-next-line complexity
const rotateWaypoint = (waypoint, val, clockwise) => {
  const directions = 'NESW';

  const { eastWest, northSouth } = waypoint;
  const steps = ((clockwise ? 1 : -1) * val) / 90;
  const dirA = ((eastWest > 0 ? 1 : 3) + steps + 4) % 4;
  const dirB = ((northSouth > 0 ? 0 : 2) + steps + 4) % 4;

  switch (directions[dirA]) {
    case 'N':
      waypoint.northSouth = Math.abs(eastWest);
      break;
    case 'S':
      waypoint.northSouth = -Math.abs(eastWest);
      break;
    case 'E':
      waypoint.eastWest = Math.abs(eastWest);
      break;
    case 'W':
      waypoint.eastWest = -Math.abs(eastWest);
      break;
  }

  switch (directions[dirB]) {
    case 'N':
      waypoint.northSouth = Math.abs(northSouth);
      break;
    case 'S':
      waypoint.northSouth = -Math.abs(northSouth);
      break;
    case 'E':
      waypoint.eastWest = Math.abs(northSouth);
      break;
    case 'W':
      waypoint.eastWest = -Math.abs(northSouth);
      break;
  }

  return waypoint;
};

const partTwo = (input) => {
  const data = parse(input);
  const ship = { northSouth: 0, eastWest: 0 };
  let waypoint = { northSouth: 1, eastWest: 10 };

  // eslint-disable-next-line complexity
  data.forEach(({ cmd, val }) => {
    switch (cmd) {
      case 'F':
        ship.northSouth = ship.northSouth + waypoint.northSouth * val;
        ship.eastWest = ship.eastWest + waypoint.eastWest * val;
        break;
      case 'L':
        waypoint = rotateWaypoint(waypoint, val, false);
        break;
      case 'R':
        waypoint = rotateWaypoint(waypoint, val, true);
        break;
      case 'N':
      case 'E':
      case 'S':
      case 'W':
        waypoint = addDistance(cmd, val, waypoint);
        break;
    }
  });

  return Math.abs(ship.eastWest) + Math.abs(ship.northSouth);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
