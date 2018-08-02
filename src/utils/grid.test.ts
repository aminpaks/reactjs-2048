import {
  fillWithRandomTile,
  moveTwoDimensionTilesTo,
  swapMatrixByDirection,
} from './grid';
import { getTile } from './tile';

describe('Grid utility functions', () => {
  const originalTiles = [
    [getTile({ value: 64 }), null, null, getTile({ value: 8 })],
    [null, getTile(), getTile(), getTile({ value: 4 })],
    [null, null, getTile(), null],
    [null, null, null, getTile({ value: 32 })],
  ];

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

    /**
     * Moves first row to bottom, so it should be all empty
     */
    expect(result[0][0]).toBeNull();
    expect(result[0][1]).toBeNull();
    expect(result[0][2]).toBeNull();
    expect(result[0][3]).toBeNull();
    /**
     * Moves second row to bottom
     * Only last column has value from originalTiles 1x3 and it's 8
     */
    expect(result[1][0]).toBeNull();
    expect(result[1][1]).toBeNull();
    expect(result[1][2]).toBeNull();
    expect(result[1][3]).toEqual(originalTiles[0][3]);
    /**
     * Moves third row to bottom
     * Only one last from right column has value and it's 4 coming form 1x3
     */
    expect(result[2][0]).toBeNull();
    expect(result[2][1]).toBeNull();
    expect(result[2][2]).toBeNull();
    expect(result[2][3]!.value).toBe(4);
    expect(result[2][3]!.id).toBe(originalTiles[1][3]!.id);
    /**
     * Calculating last row
     */
    // First column is from originalTiles 0x0 with value 64
    expect(result[3][0]).toEqual(originalTiles[0][0]);
    // Second column is from originalTiles 1x1 with value 2
    expect(result[3][1]).toEqual(originalTiles[1][1]);
    // Third column is a total from originalTiles 1x2 and 2x2 with value 4
    expect(result[3][2]!.value).toBe(4);
    expect(result[3][2]!.id).toBe(originalTiles[2][2]!.id);
    // Forth column is from originalTiles 3x3
    expect(result[3][3]).toEqual(originalTiles[3][3]);
  });

  describe('test', () => {
    const result = fillWithRandomTile(originalTiles);
    console.log(result);
    expect(true).toBeFalsy();
  });
});
