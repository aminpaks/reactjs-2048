export const getRandom = (min: number, max: number) =>
  Math.round(Math.random() * min * 10) + (max - min);
