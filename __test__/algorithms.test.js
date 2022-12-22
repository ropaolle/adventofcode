var {
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
} = require('../algorithms.js');

describe('Algorithms', function () {
  it('findtheSymmetricDifference', function () {
    expect(findtheSymmetricDifference([1, 2, 3, 3], [5, 2, 1, 4])).toStrictEqual([3, 5, 4]);
  });

  it('updateInventory', function () {
    expect(
      updateInventory(
        [
          [21, 'Bowling Ball'],
          [2, 'Dirty Sock'],
          [1, 'Hair Pin'],
          [5, 'Microphone'],
        ],
        [
          [2, 'Hair Pin'],
          [3, 'Half-Eaten Apple'],
          [67, 'Bowling Ball'],
          [7, 'Toothpaste'],
          [5, 'Microphone'],
        ]
      )
    ).toStrictEqual([
      [88, 'Bowling Ball'],
      [2, 'Dirty Sock'],
      [3, 'Hair Pin'],
      [3, 'Half-Eaten Apple'],
      [10, 'Microphone'],
      [7, 'Toothpaste'],
    ]);
  });

  it('noRepeatsPlease', function () {
    expect(noRepeatsPlease('aabb')).toBe(8);
  });

  it('pairwise', function () {
    expect(pairwise([7, 9, 11, 13, 15], 20)).toBe(6);
  });

  it('implementBubbleSort', function () {
    expect(implementBubbleSort([34, 5, 67, 1])).toStrictEqual([1, 5, 34, 67]);
  });

  it('implementSelectionSort', function () {
    expect(implementSelectionSort(0)).toStrictEqual(0);
  });

  it('implementInsertionSort', function () {
    expect(implementInsertionSort(0)).toStrictEqual(0);
  });

  it('implementQuickSort', function () {
    expect(implementQuickSort(0)).toStrictEqual(0);
  });

  it('implementMergeSort', function () {
    expect(implementMergeSort(0)).toStrictEqual(0);
  });

  it('implementBinarySearch', function () {
    expect(implementBinarySearch(0)).toStrictEqual(0);
  });
});
