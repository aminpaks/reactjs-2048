export const buildArray = <T>(size: number, initial?: T): T[] =>
  Array(size).fill(initial || null);
