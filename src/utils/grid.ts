import { buildArray } from './arrays';
import { getRandom } from './random';
import {
  DirectionType,
  getTile,
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

export const turnGridToFlatArray = (tiles: TileCollection[]) =>
  tiles.reduce<TileCollection>((acc, row) => [...acc, ...row], []);

export const turnFlatArrayToGrid = (rowLength: number, tiles: TileCollection) =>
  tiles.reduce(
    (acc, tile) => {
      const { collection, row: currentRowIndex } = acc;
      const currentRowLength = collection[currentRowIndex].length;
      const currentRow = currentRowLength >= rowLength ? [] : collection.pop()!;

      return {
        collection: [...collection, [...currentRow, tile]],
        row:
          currentRowLength >= rowLength ? currentRowIndex + 1 : currentRowIndex,
      };
    },
    { row: 0, collection: [[]] } as {
      row: number;
      collection: TileCollection[];
    },
  ).collection;

export const fillFirstAvailableEmptyTile = (tiles: TileCollection) =>
  tiles.reduce(
    (acc, tile) => {
      if (acc.filled || tile) {
        return { ...acc, collection: [...acc.collection, tile] };
      }
      return {
        collection: [...acc.collection, getTile()],
        filled: true,
      };
    },
    {
      collection: [],
      filled: false,
    } as { filled: boolean; collection: TileCollection },
  );

export const fillWithRandomTile = (tiles: TileCollection[]) => {
  const { row: rowLength, column: columnLength } = getGridSize(tiles);
  const fullLength = rowLength * columnLength;

  const startPoint = getRandom(0, fullLength - 1);

  const flatten = turnGridToFlatArray(tiles);
  const firstPart = flatten.slice(0, startPoint);
  const secondPart = flatten.slice(startPoint);

  const potentialFilledSecondPart = fillFirstAvailableEmptyTile(secondPart);

  if (potentialFilledSecondPart.filled) {
    return turnFlatArrayToGrid(rowLength, [
      ...firstPart,
      ...potentialFilledSecondPart.collection,
    ]);
  }

  const potentialFilledFirstPart = fillFirstAvailableEmptyTile(firstPart);

  if (potentialFilledFirstPart.filled) {
    return turnFlatArrayToGrid(rowLength, [
      ...potentialFilledFirstPart.collection,
      ...secondPart,
    ]);
  }

  return null;
};
