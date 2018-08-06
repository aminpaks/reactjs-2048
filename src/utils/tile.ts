import { generateKey } from './key';

export type DirectionType = 'top' | 'left' | 'bottom' | 'right';

export type TileValue = number | null;
export interface TileModel {
  id: string;
  value: number;
  index: number;
  merged: boolean;
}
export type TileCollection = TileModel[];
export type PTileModel = TileModel | null;
export type PTileCollection = PTileModel[];

export const getTile = ({
  id = generateKey(),
  index = 0,
  merged = false,
  value = 2,
}: Partial<TileModel> = {}) =>
  Object.freeze<TileModel>({
    id,
    index,
    merged,
    value,
  });

export const sortedCollection = (
  collection: PTileCollection,
  direction: DirectionType,
) => {
  switch (direction) {
    case 'top':
    case 'left':
      return collection;
    case 'right':
    case 'bottom':
    default:
      return collection.reverse();
  }
};

export const filterNulls = (tile: PTileModel): tile is TileModel =>
  Boolean(tile);
export const cleanNulls = (collection: PTileCollection) =>
  collection.filter(filterNulls) as TileCollection;

export const sanitizePair = (
  first: PTileModel,
  second: PTileModel,
): TileModel[] => {
  if (first || second) {
    if (
      first &&
      second &&
      !first.merged &&
      !second.merged &&
      first.value === second.value
    ) {
      return [
        getTile({
          ...second,
          merged: true,
          value: first.value + second.value,
        }),
      ];
    }
    return [...(first ? [first] : []), ...(second ? [second] : [])];
  }
  return [];
};

export const moveTilesToSide = (
  collection: PTileCollection,
  direction: DirectionType,
) => {
  const { length: size } = collection;
  const result = cleanNulls(sortedCollection(collection, direction))
    .reduce<PTileCollection>((acc, tile) => {
      const first = acc.pop() || null;
      const pair = sanitizePair(first, tile);
      return [...acc, ...pair];
    }, [])
    .map(tile => ({ ...tile, merged: false } as TileModel));

  const filledWithNull = [
    ...result,
    ...Array<PTileModel>(size - result.length).fill(null),
  ];

  return sortedCollection(filledWithNull, direction);
};

export const canCombinePairs = (tiles: PTileCollection) => {
  return tiles.filter(filterNulls).reduce(
    (acc, tile) => {
      const { canCombine, collection } = acc;
      if (canCombine) {
        return acc;
      }

      const lastTile = collection.pop();

      return {
        canCombine: lastTile
          ? lastTile && lastTile.value === tile.value
          : false,
        collection: [...collection, tile],
      };

      return acc;
    },
    {
      canCombine: false,
      collection: [],
    } as {
      canCombine: boolean;
      collection: TileCollection;
    },
  ).canCombine;
};
