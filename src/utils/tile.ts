import { generateKey } from './key';

export type DirectionType = 'top' | 'left' | 'bottom' | 'right';

export type TileValue = number | null;
export interface TileModel {
  id: string;
  value: number;
  updated: number;
  index: number;
}
export type TileCollection = TileModel[];
export type PTileModel = TileModel | null;
export type PTileCollection = PTileModel[];

export const getTile = ({
  id = generateKey(),
  value = 2,
}: Partial<TileModel> = {}) =>
  Object.freeze<TileModel>({
    id,
    index: 0,
    updated: Date.now(),
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

export const cleanNulls = (collection: PTileCollection) =>
  collection.filter(tile => Boolean(tile));

export const sanitizePair = (
  first: PTileModel,
  second: PTileModel,
  direction: DirectionType,
): TileModel[] => {
  if (first || second) {
    if (first && second && first.value === second.value) {
      return [
        getTile({
          ...(['right', 'bottom'].indexOf(direction) >= 0 ? first : second),
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
  const result = cleanNulls(sortedCollection(collection, direction)).reduce<
    PTileCollection
  >((acc, tile) => {
    const first = acc.pop() || null;
    const pair = sanitizePair(first, tile, direction);
    return [...acc, ...pair];
  }, []);

  const filledWithNull = [
    ...result,
    ...Array<PTileModel>(size - result.length).fill(null),
  ];

  return sortedCollection(filledWithNull, direction);
};
