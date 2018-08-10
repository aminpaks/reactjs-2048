export const getRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const getRandomIndex = (indexes: number[], size: number) => {
  const maxIndex = size - 1;
  let counter = 0;
  let startIndex = getRandom(0, maxIndex);
  while (true) {
    if (indexes.indexOf(startIndex) < 0) {
      return startIndex;
    } else {
      if (startIndex >= maxIndex) {
        startIndex = 0;
      } else {
        startIndex += 1;
      }
    }

    if (counter >= maxIndex) {
      return null;
    }
    counter += 1;
  }
};
