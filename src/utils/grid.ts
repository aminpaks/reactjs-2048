import { buildArray } from './arrays';
import { getRandom } from './random';
import {
  DirectionType,
  moveTilesToSide,
  PTileModel,
  TileCollection,
} from './tile';

export const getGridSize = (tiles: TileCollection[]) => {
  const { length: row } = tiles;
  const { length: column } = tiles[0];
  return {
    column,
    row,
  };
};

export const getEmptyGrid = (size: number) => {
  return buildArray<PTileModel>(size).map(row => buildArray<PTileModel>(size));
};

export const getTilesBy = (tiles: TileCollection[]) => tiles;

export const swapMatrixByDirection = (
  size: number,
  direction: DirectionType,
  tiles: TileCollection[],
) => {
  switch (direction) {
    case 'left':
    case 'right':
      return tiles;
    case 'top':
    case 'bottom':
    default:
      const result: TileCollection[] = getEmptyGrid(size);
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          result[j][i] = tiles[i][j];
        }
      }
      return result;
  }
};

export const moveTwoDimensionTilesTo = (
  tiles: TileCollection[],
  direction: DirectionType,
): TileCollection[] => {
  const rowLength = getGridSize(tiles).row;
  // Partial application of swapMatrixByDirection
  const swapMatrixByDirectionCurried = swapMatrixByDirection.bind(
    null,
    rowLength,
    direction,
  ) as (tiles: TileCollection[]) => TileCollection[];

  const movedTiles = swapMatrixByDirectionCurried(tiles).map(row =>
    moveTilesToSide(row, direction),
  );

  return swapMatrixByDirectionCurried(movedTiles);
};

export const fillWithRandomTile = (tiles: TileCollection[]) => {
  const { row: rowLength, column: columnLength } = getGridSize(tiles);
  const fullLength = rowLength * columnLength;

  const startPoint = getRandom(0, fullLength);
  // tslint:disable-next-line:no-console
  console.log(fullLength, startPoint);
  // tslint:disable-next-line:no-console
  console.log('ok 2 2');

  // do {
  //   for (let i = start)
  // } while (true);
};
