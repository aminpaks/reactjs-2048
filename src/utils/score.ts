import { TileCollection } from './tile';

export const getUpdatedScores = (
  currentScore: number,
  currentTiles: TileCollection,
) =>
  currentTiles
    .filter(tile => tile.merged)
    .reduce((result, tile) => result + tile.value, currentScore);
