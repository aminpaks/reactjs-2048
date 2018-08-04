import { canCombinePairs, cleanNulls, getTile, moveTilesToSide } from './tile';

describe('Tile', () => {
  describe('cleanNulls()', () => {
    const result = cleanNulls([
      null,
      null,
      getTile({ value: 2 }),
      getTile({ value: 1 }),
    ]);

    it('filters null values', () => {
      expect(result[0]!.value).toBe(2);
      expect(result[1]!.value).toBe(1);
    });
  });

  describe('moveTilesToSide()', () => {
    it('moves to left', () => {
      const result = moveTilesToSide(
        [getTile({ value: 2 }), null, getTile({ value: 4 }), null],
        'left',
      );

      expect(result[0]!.value).toBe(2);
      expect(result[1]!.value).toBe(4);
      expect(result[2]).toBeNull();
      expect(result[3]).toBeNull();
    });

    it('moves to right', () => {
      const result = moveTilesToSide(
        [getTile({ value: 2 }), null, getTile({ value: 4 }), null],
        'right',
      );

      expect(result[0]).toBeNull();
      expect(result[1]).toBeNull();
      expect(result[2]!.value).toBe(2);
      expect(result[3]!.value).toBe(4);
    });

    it('moves to right and sum up', () => {
      const result = moveTilesToSide(
        [getTile({ value: 4 }), null, getTile({ value: 4 }), null],
        'right',
      );

      expect(result[0]).toBeNull();
      expect(result[1]).toBeNull();
      expect(result[2]).toBeNull();
      expect(result[3]!.value).toBe(8);
    });

    it('moves to bottom and sum up two levels', () => {
      const first = getTile({ value: 4 });
      const second = getTile({ value: 4 });
      const third = getTile({ value: 8 });
      const forth = getTile({ value: 8 });
      const result = moveTilesToSide([first, second, third, forth], 'bottom');

      expect(result[0]).toBeNull();
      expect(result[1]).toBeNull();
      expect(result[2]!.id).toBe(first.id);
      expect(result[2]!.value).toBe(8);
      expect(result[3]!.id).toBe(third.id);
      expect(result[3]!.value).toBe(16);
    });

    it('moves to right and sum up two same levels', () => {
      const first = getTile({ value: 4 });
      const second = getTile({ value: 4 });
      const third = getTile({ value: 4 });
      const forth = getTile({ value: 4 });
      const result = moveTilesToSide([first, second, third, forth], 'right');

      expect(result[0]).toBeNull();
      expect(result[1]).toBeNull();
      expect(result[2]!.id).toEqual(first.id);
      expect(result[2]!.value).toEqual(8);
      expect(result[3]!.id).toBe(third.id);
      expect(result[3]!.value).toBe(8);
    });
  });

  describe('canCombinePairs', () => {
    it('returns true if combining pairs is possible', () => {
      const result = canCombinePairs([getTile(), null, getTile(), null]);

      expect(result).toBe(true);
    });

    it('returns false if cannot combine pairs', () => {
      const result = canCombinePairs([null, null, getTile(), null]);

      expect(result).toBe(false);
    });

    it('returns false if cannot combine pairs #2', () => {
      const result = canCombinePairs([
        getTile({ value: 16 }),
        getTile({ value: 4 }),
        getTile(),
        getTile({ value: 32 }),
      ]);

      expect(result).toBe(false);
    });
  });
});
