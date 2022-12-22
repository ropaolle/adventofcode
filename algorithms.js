// https://www.freecodecamp.org/learn/coding-interview-prep/algorithms

console.clear();

const findtheSymmetricDifference = (...args) => {
  const symetric = new Set();

  for (let i = 0; i < args.length; i++) {
    const set = new Set(args[i]);

    for (const val of set.values()) {
      if (!symetric.has(val)) {
        symetric.add(val);
      } else {
        symetric.delete(val);
      }
    }
  }

  return Array.from(symetric);
};

const updateInventory = (arr1, arr2) => {
  const stringSort = (a, b) => {
    if (a[1] > b[1]) {
      return 1;
    }

    if (a[1] < b[1]) {
      return -1;
    }

    return 0;
  };

  for (const [count, name] of arr2) {
    const index = arr1.findIndex((v) => v[1] === name);
    if (index > -1) {
      arr1[index][0] += count;
    } else {
      arr1.push([count, name]);
    }
  }

  return arr1.sort(stringSort);
};

const noRepeatsPlease = (str) => {
  const swap = (arr, i1, i2) => {
    const temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
  };

  const getPermutations = (pos, arr, permutations = []) => {
    if (pos === 1) {
      permutations.push(arr.join(''));
    } else {
      getPermutations(pos - 1, arr, permutations);
      for (let i = 0; i < pos - 1; i++) {
        if (pos % 2 === 0) {
          swap(arr, i, pos - 1);
        } else {
          swap(arr, 0, pos - 1);
        }
        getPermutations(pos - 1, arr, permutations);
      }
    }

    return permutations;
  };

  const permutations = getPermutations(str.length, str.split(''));
  const noRepeatedCharacters = permutations.filter((str) => str.search(/(.)\1/) === -1);

  return noRepeatedCharacters.length;
};

const pairwise = (arr, arg) => {
  const hasPairwise = (arr, arg, start) => {
    for (let i = start + 1; i < arr.length; i++) {
      if (arr[start] !== -1 && arr[i] !== -1 && arr[start] + arr[i] === arg) {
        arr[start] = -1;
        arr[i] = -1;
        return start + i;
      }
    }

    return 0;
  };

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += hasPairwise(arr, arg, i);
  }

  return sum;
};

const implementBubbleSort = (arr) => {
  const sorted = arr.sort((a, b) => a - b);

  return sorted;
};

const implementSelectionSort = () => {
  return 0;
};

const implementInsertionSort = () => {
  return 0;
};

const implementQuickSort = () => {
  return 0;
};

const implementMergeSort = () => {
  return 0;
};

const implementBinarySearch = () => {
  return 0;
};

module.exports = {
  findtheSymmetricDifference,
  updateInventory,
  noRepeatsPlease,
  pairwise,
  implementBubbleSort,
  implementSelectionSort,
  implementInsertionSort,
  implementQuickSort,
  implementMergeSort,
  implementBinarySearch,
};
