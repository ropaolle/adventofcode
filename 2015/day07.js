// INFO: Got stuck att part one, used solution from https://medium.com/@ghaiklor/advent-of-code-2015-explanation-aa9932db6d6f#05ab.

const parse = (input) => input.split('\n');

const COMMAND_REGEX = /[A-Z]+/g;
const ARGUMENTS_REGEX = /[a-z0-9]+/g;

// Our parsed wires in format {wire: value} or {wire: instruction}
const WIRES = new Map();

const BITWISE_METHODS = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  NOT: (a) => ~a,
  LSHIFT: (a, b) => a << b,
  RSHIFT: (a, b) => a >> b,
};

// Parse instruction from input and return object with command, arguments and destination wire
const parseInstruction = (instruction) => {
  const command = instruction.match(COMMAND_REGEX);
  const args = instruction.match(ARGUMENTS_REGEX);
  const destination = args.pop();

  return {
    command: command && command[0],
    args: args.map((arg) => (isNaN(Number(arg)) ? arg : Number(arg))),
    destination: destination,
  };
};

// Calculate value for one of the wires (recursively)
const calculateWire = (wireName) => {
  const wire = WIRES.get(wireName);

  // If wire already calculated, return value
  if (typeof wireName === 'number') {
    return wireName;
  }
  if (typeof wire === 'number') {
    return wire;
  }
  if (typeof wire === 'undefined') {
    return undefined;
  }

  if (!wire.command) {
    WIRES.set(wireName, calculateWire(wire.args[0]));
  } else {
    WIRES.set(
      wireName,
      BITWISE_METHODS[wire.command](calculateWire(wire.args[0]), calculateWire(wire.args[1]))
    );
  }

  return WIRES.get(wireName);
};

const partOne = (input) => {
  const data = parse(input);

  data.forEach((instruction) => {
    const parsedInstruction = parseInstruction(instruction);
    WIRES.set(parsedInstruction.destination, {
      command: parsedInstruction.command,
      args: parsedInstruction.args,
    });
  });

  return calculateWire('a');
};

const partTwo = (input) => {
  const data = parse(input);

  data.forEach((instruction) => {
    const parsedInstruction = parseInstruction(instruction);
    WIRES.set(parsedInstruction.destination, {
      command: parsedInstruction.command,
      args: parsedInstruction.args,
    });
  });

  // Set already known value to specific wire
  WIRES.set('b', 16076);

  return calculateWire('a');
};

exports.partOne = partOne;
exports.partTwo = partTwo;
