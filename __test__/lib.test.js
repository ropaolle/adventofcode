describe('Lib tests', function () {
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
});
