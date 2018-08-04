import { getEmptyRandomIndex, getRandom } from './random';

describe('Random utility functions', () => {
  describe('getRandom()', () => {
    it('returns a random number in range of 7 to 10', () => {
      const result = getRandom(7, 10)!;

      expect([7, 8, 9, 10].indexOf(result) >= 0).toBeTruthy();
    });
  });

  describe('getFirstEmptyIndex()', () => {
    it('returns a unique index', () => {
      const indexes = [0, 1, 3, 4, 5, 6, 8];
      const result = getEmptyRandomIndex(indexes, 10)!;

      expect(result).not.toContain(indexes);
      expect([2, 7, 9].indexOf(result) >= 0).toBeTruthy();
    });

    it('returns a unique index', () => {
      const indexes = [0, 1];
      const result = getEmptyRandomIndex(indexes, 2);

      expect(result).toBeNull();
    });

    it('returns index no 2', () => {
      const indexes = [0, 1];
      const result = getEmptyRandomIndex(indexes, 3);

      expect(result).toBe(2);
    });
  });
});
