const regEx = /^\$ (ls)|(cd (.*))|dir (.*)|(^\d+) (.*)/;

const parse = (input) => {
  const tree = { parent: null, type: 'folder', name: '/', data: [] };
  let current;

  return input.split('\n').reduce((tree, line) => {
    const [, ls, , cd, dir, size, filename] = line.match(regEx);

    if (ls) {
      // Do nothing?
    } else if (cd) {
      if (cd === '/') {
        current = tree;
      } else if (cd === '..') {
        current = current.parent;
      } else {
        current = current.data.find((data) => data.type === 'folder' && data.name === cd);
      }
    } else if (dir) {
      current.data.push({ parent: current, type: 'folder', name: dir, data: [] });
    } /* else if (size && filename) */ else {
      current.data.push({ parent: current, type: 'file', name: filename, size: Number(size) });
    }

    return tree;
  }, tree);
};

const readTree = (tree, path, folderSizes = []) => {
  let folderSize = 0;

  for (const current of tree.data) {
    const { type, name, size } = current;
    if (type === 'file') {
      folderSize += size;
    } /* else if (type === 'folder') */ else {
      folderSizes = readTree(current, path + '/' + name, folderSizes);
      folderSize += current.size;
    }
  }

  tree.size = folderSize;
  folderSizes.push(folderSize);

  return folderSizes;
};

const partOne = (input) => {
  const data = parse(input);
  const folderSizes = readTree(data);

  return folderSizes.filter((val) => val < 100000).reduce((acc, v) => acc + v, 0);
};

const partTwo = (input) => {
  const data = parse(input);
  const totalSize = 70000000;
  const updateSize = 30000000;
  const folderSizes = readTree(data).sort((a, b) => a - b);
  const freeSize = totalSize - folderSizes.pop();

  return folderSizes.find((size) => freeSize + size > updateSize);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
