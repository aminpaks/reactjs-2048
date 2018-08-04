export const getRandom = (min: number, max: number) =>
  Math.round(Math.random() * (max - min)) + min;

export const getEmptyRandomIndex = (indexes: number[], size: number) => {
  let counter = 0;
  let startIndex = getRandom(0, size - 1);
  while (true) {
    if (indexes.indexOf(startIndex) < 0) {
      return startIndex;
    } else {
      if (startIndex >= size - 1) {
        startIndex = 0;
      } else {
        startIndex += 1;
      }
    }

    if (counter >= size - 1) {
      return null;
    }
    counter += 1;
  }
};
