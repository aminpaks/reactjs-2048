import { buildArray } from './arrays';
import { getEmptyRandomIndex } from './random';
import {
  DirectionType,
  getTile,
  moveTilesToSide,
  PTileCollection,
  PTileModel,
  TileCollection,
  TileModel,
} from './tile';

export const getGridSize = (tiles: PTileCollection[]) => {
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

export const swapMatrixByDirection = (
  size: number,
  direction: DirectionType,
  tiles: PTileCollection[],
): ReadonlyArray<PTileCollection> => {
  switch (direction) {
    case 'left':
    case 'right':
      return tiles;
    case 'top':
    case 'bottom':
    default:
      const result: PTileCollection[] = getEmptyGrid(size);
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          result[j][i] = tiles[i][j]
            ? ({ ...tiles[i][j] } as PTileModel)
            : null;
        }
      }
      return result;
  }
};

export const moveTwoDimensionTilesTo = (
  tiles: PTileCollection[],
  direction: DirectionType,
): PTileCollection[] => {
  const rowLength = getGridSize(tiles).row;
  // Partial application of swapMatrixByDirection
  const swapMatrixByDirectionCurried = swapMatrixByDirection.bind(
    null,
    rowLength,
    direction,
  ) as (tiles: PTileCollection[]) => PTileCollection[];

  const movedTiles = swapMatrixByDirectionCurried(tiles).map(row => {
    return moveTilesToSide(row, direction);
  });

  return swapMatrixByDirectionCurried(movedTiles);
};

export const turnGridToFlatArray = (tiles: PTileCollection[]) =>
  tiles.reduce<TileCollection>(
    (acc, row, rowIndex) => [
      ...acc,
      ...(row
        .map(
          (tile, columnIndex) =>
            tile && {
              ...tile,
              index: rowIndex * 4 + columnIndex,
            },
        )
        .filter(tile => tile) as TileModel[]),
    ],
    [],
  );

export const turnFlatArrayToGrid = (
  dimensionSize: number,
  tiles: TileCollection,
) => {
  const result = getEmptyGrid(dimensionSize);
  for (let i = 0; i < dimensionSize; i++) {
    for (let j = 0; j < dimensionSize; j++) {
      const tile =
        tiles.find(pTile => pTile.index === i * dimensionSize + j) || null;
      result[i][j] = tile;
    }
  }
  return result;
};

export const fillFirstAvailableEmptyTile = (tiles: PTileCollection) =>
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
    } as { filled: boolean; collection: PTileCollection },
  );

export const fillWithRandomTile = (gridSize: number, tiles: TileCollection) => {
  const indexes = tiles.map(tile => tile.index);
  const newIndex = getEmptyRandomIndex(indexes, gridSize);

  if (typeof newIndex === 'number') {
    return [...tiles, getTile({ index: newIndex })];
  }

  return null;
};
