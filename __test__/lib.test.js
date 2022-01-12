describe('Lib tests', function () {
  describe('Numeric sort', function () {
    const { numericSort } = require('../lib/extras');
    it('should return diff', function () {
      expect(numericSort(10, 20)).toBe(-10);
    });
  });

  describe('Flip bits', function () {
    const { flipBits } = require('../lib/extras');
    it('flip empty string', function () {
      expect(flipBits('')).toBe('');
    });
    it('flip 0000 to 1111', function () {
      expect(flipBits('0000')).toBe('1111');
    });
    it('flip 101010 to 010101', function () {
      expect(flipBits('101010')).toBe('010101');
    });
    it('flip 010101010101010101', function () {
      expect(flipBits('010101010101010101')).toBe('101010101010101010');
    });
  });

  describe('isCapital', function () {
    const { isCapital } = require('../lib/extras');
    it('capital = true, ABCDEFGHIJKLMANOPQRSTUVXYZ', function () {
      expect(isCapital('ABCDEFGHIJKLMANOPQRSTUVXYZ')).toBe(true);
    });
    it('capital = false, abcdefgh', function () {
      expect(isCapital('abcdefgh')).toBe(false);
    });
    it('capital = false, {one space}', function () {
      expect(isCapital(' ')).toBe(false);
    });
  });

  describe('ord', function () {
    const { ord } = require('../lib/extras');
    it('a = 97', function () {
      expect(ord('a')).toBe(97);
    });
    it('Ö = 214', function () {
      expect(ord('Ö')).toBe(214);
    });
  });

  describe('removeItem', function () {
    const { removeItem } = require('../lib/extras');
    it("should remove the first b in ['a', 'b', 'b', 'c']", function () {
      expect(removeItem(['a', 'b', 'b', 'c'], 'b')).toEqual(['a', 'b', 'c']);
    });
    it("should not remove anything ['a', 'b', 'b', 'c']", function () {
      expect(removeItem(['a', 'b', 'b', 'c'], 'x')).toEqual(['a', 'b', 'b', 'c']);
    });
  });

  describe('removeAllItems', function () {
    const { removeAllItems } = require('../lib/extras');
    it("should remove both b's in ['a', 'b', 'b', 'c']", function () {
      expect(removeAllItems(['a', 'b', 'b', 'c'], 'b')).toEqual(['a', 'c']);
    });
  });

  describe('findPatterns', function () {
    const { findPatterns } = require('../lib/extras');
    it('bb in abbba should return [1, 2]', function () {
      expect(findPatterns('bb', 'abbba')).toEqual([1, 2]);
    });
  });

  describe('getIndicesOf', function () {
    const { getIndicesOf } = require('../lib/extras');
    it('bb in abbba should returns [1]', function () {
      expect(getIndicesOf('bb', 'abbba')).toEqual([1]);
    });
    it('bB in abbba should returns [1]', function () {
      expect(getIndicesOf('bb', 'abbBa', false)).toEqual([1]);
    });
    it('bb in abbba should returns [2]', function () {
      expect(getIndicesOf('bB', 'abbBa')).toEqual([2]);
    });
    it('empty search string returns []', function () {
      expect(getIndicesOf('', 'abbBa', true)).toEqual([]);
    });
  });
});
