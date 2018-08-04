import {
  canCombineGridTiles,
  fillWithRandomTile,
  moveTwoDimensionTilesTo,
  swapMatrixByDirection,
  turnFlatArrayToGrid,
  turnGridToFlatArray,
} from './grid';
import { cleanNulls, getTile, PTileCollection } from './tile';

describe('Grid utility functions', () => {
  const originalTiles = [
    [
      getTile({ value: 64, index: 0 }),
      null,
      null,
      getTile({ value: 8, index: 3 }),
    ],
    [
      null,
      getTile({ index: 5 }),
      getTile({ index: 6 }),
      getTile({ value: 4, index: 7 }),
    ],
    [null, null, getTile({ index: 10 }), null],
    [null, null, null, getTile({ value: 32, index: 15 })],
  ] as PTileCollection[];

  describe('swapMatrixByDirection()', () => {
    it('swaps rows to columns', () => {
      const result = swapMatrixByDirection(4, 'top', originalTiles);

      /**
       * Let's swap rows to columns
       * Original:
       * [
       *   [64,   null, null, 8   ],
       *   [null, 2,    2,    4   ],
       *   [null, null, 2,    null],
       *   [null, null, null, 32  ],
       * ]
       * to:
       * [
       *   [64,   null, null, null],
       *   [null, 2,    null, null],
       *   [null, 2,    2,    null],
       *   [8,    4,    null, 32  ],
       * ]
       */
      // First column
      expect(result[0][0]).toEqual(originalTiles[0][0]);
      expect(result[0][1]).toBeNull();
      expect(result[0][2]).toBeNull();
      expect(result[0][3]).toBeNull();
      // Second column
      expect(result[1][0]).toBeNull();
      expect(result[1][1]).toEqual(originalTiles[1][1]);
      expect(result[1][2]).toBeNull();
      expect(result[1][3]).toBeNull();
      // Third column
      expect(result[2][0]).toBeNull();
      expect(result[2][1]).toEqual(originalTiles[1][2]);
      expect(result[2][2]).toEqual(originalTiles[2][2]);
      expect(result[2][3]).toBeNull();
      // Forth column
      expect(result[3][0]).toEqual(originalTiles[0][3]);
      expect(result[3][1]).toEqual(originalTiles[1][3]);
      expect(result[3][2]).toBeNull();
      expect(result[3][3]).toEqual(originalTiles[3][3]);
    });

    it('ignores swapping rows to columns', () => {
      const result = swapMatrixByDirection(4, 'right', originalTiles);

      // Must be the same thing
      expect(result).toEqual(originalTiles);
    });
  });

  describe('moveTwoDimensionTilesTo()', () => {
    const result = moveTwoDimensionTilesTo(originalTiles, 'bottom');

    it('moves first row to bottom', () => {
      /**
       * Moves first row to bottom, so it should be all empty
       */
      expect(result[0][0]).toBeNull();
      expect(result[0][1]).toBeNull();
      expect(result[0][2]).toBeNull();
      expect(result[0][3]).toBeNull();
    });

    it('moves second row to bottom', () => {
      /**
       * Moves second row to bottom
       * Only last column has value from originalTiles 1x3 and it's 8
       */
      expect(result[1][0]).toBeNull();
      expect(result[1][1]).toBeNull();
      expect(result[1][2]).toBeNull();
      expect(result[1][3]).toEqual(originalTiles[0][3]);
    });

    it('moves third row to bottom', () => {
      /**
       * Moves third row to bottom
       * Only one last from right column has value and it's 4 coming form 1x3
       */
      expect(result[2][0]).toBeNull();
      expect(result[2][1]).toBeNull();
      expect(result[2][2]).toBeNull();
      expect(result[2][3]!.value).toBe(4);
      expect(result[2][3]!.id).toBe(originalTiles[1][3]!.id);
    });

    it('calculates the last row', () => {
      /**
       * Calculating last row
       */
      // First column is from originalTiles 0x0 with value 64
      expect(result[3][0]).toEqual(originalTiles[0][0]);
      // Second column is from originalTiles 1x1 with value 2
      expect(result[3][1]).toEqual(originalTiles[1][1]);
      // Third column is a total from originalTiles 1x2 and 2x2 with value 4
      expect(result[3][2]!.value).toBe(4);
      expect(result[3][2]!.id).toBe(originalTiles[1][2]!.id);
      // Forth column is from originalTiles 3x3
      expect(result[3][3]).toEqual(originalTiles[3][3]);
    });
  });

  describe('turnGridToFlatArray()', () => {
    const flat = turnGridToFlatArray(originalTiles);

    it('flattens a two dimension array of tiles', () => {
      expect(flat).toEqual(
        cleanNulls([
          ...originalTiles[0],
          ...originalTiles[1],
          ...originalTiles[2],
          ...originalTiles[3],
        ]),
      );
    });
  });

  describe('turnFlatArrayToGrid()', () => {
    const result = turnFlatArrayToGrid(
      4,
      cleanNulls([
        ...originalTiles[0],
        ...originalTiles[1],
        ...originalTiles[2],
        ...originalTiles[3],
      ]),
    );

    it('restructures a grid from a flatten array of tiles', () => {
      expect(originalTiles).toEqual(result);
    });
  });

  describe('fillWithRandomTile()', () => {
    const flatten = turnGridToFlatArray(originalTiles);
    const result = fillWithRandomTile(16, flatten);

    it('fills a random empty tile and return a new instance', () => {
      expect(result).not.toEqual(flatten);
      expect(result!.length).toBeGreaterThan(flatten.length);
    });
  });

  describe('fillWithRandomTile()', () => {
    const flatten = turnGridToFlatArray(originalTiles);
    const result = fillWithRandomTile(16, flatten);

    it('fills a random empty tile and return a new instance', () => {
      expect(result).not.toEqual(flatten);
      expect(result!.length).toBeGreaterThan(flatten.length);
    });
  });

  describe('canCombineGridTiles()', () => {
    it('returns true if the collection has empty slots', () => {
      const result = canCombineGridTiles(4, turnGridToFlatArray(originalTiles));
      expect(result).toBe(true);
    });

    it('returns true if collection is full but combination is possible', () => {
      const result = canCombineGridTiles(
        4,
        turnGridToFlatArray([
          [getTile(), getTile({ value: 4 }), getTile(), getTile({ value: 4 })],
          [getTile(), getTile({ value: 4 }), getTile(), getTile({ value: 4 })],
          [getTile(), getTile({ value: 4 }), getTile(), getTile({ value: 4 })],
          [getTile(), getTile({ value: 4 }), getTile(), getTile({ value: 4 })],
        ]),
      );
      expect(result).toBe(true);
    });

    it('returns false if collection is full and there is no possible combination horizontally or vertically', () => {
      const result = canCombineGridTiles(
        4,
        turnGridToFlatArray([
          [
            getTile({ value: 2 }),
            getTile({ value: 4 }),
            getTile({ value: 8 }),
            getTile({ value: 16 }),
          ],
          [
            getTile({ value: 4 }),
            getTile({ value: 8 }),
            getTile({ value: 16 }),
            getTile({ value: 32 }),
          ],
          [
            getTile({ value: 8 }),
            getTile({ value: 16 }),
            getTile({ value: 32 }),
            getTile({ value: 64 }),
          ],
          [
            getTile({ value: 16 }),
            getTile({ value: 32 }),
            getTile({ value: 64 }),
            getTile({ value: 128 }),
          ],
        ]),
      );
      expect(result).toBe(false);
    });
  });
});
