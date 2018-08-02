import { generateKey } from './key';

export type DirectionType = 'top' | 'left' | 'bottom' | 'right';

export type TileValue = number | null;
export interface TileModel {
  id: string;
  value: number;
}
export type PTileModel = TileModel | null;
export type TileCollection = PTileModel[];

export const getTile = ({
  id = generateKey(),
  value = 2,
}: Partial<TileModel> = {}): TileModel => ({
  id,
  value,
});

export const sortedCollection = (
  collection: TileCollection,
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

export const cleanNulls = (collection: TileCollection) =>
  collection.filter(tile => Boolean(tile));

export const sanitizePair = (
  first: PTileModel,
  second: PTileModel,
): TileModel[] => {
  if (first || second) {
    if (first && second && first.value === second.value) {
      return [getTile({ ...first, value: first.value + second.value })];
    }
    return [...(first ? [first] : []), ...(second ? [second] : [])];
  }
  return [];
};

export const moveTilesToSide = (
  collection: TileCollection,
  direction: DirectionType,
) => {
  const { length: size } = collection;
  const result = cleanNulls(sortedCollection(collection, direction)).reduce<
    TileCollection
  >((acc, tile) => {
    const first = acc.pop() || null;
    const pair = sanitizePair(first, tile);
    return [...acc, ...pair];
  }, []);

  const filledWithNull = [
    ...result,
    ...Array<PTileModel>(size - result.length).fill(null),
  ];

  return sortedCollection(filledWithNull, direction);
};
