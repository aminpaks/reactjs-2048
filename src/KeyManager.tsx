import React, { Component } from 'react';
import EventListener from 'react-event-listener';
import {
  moveTwoDimensionTilesTo,
  PTileCollection,
  TileCollection,
  turnFlatArrayToGrid,
  turnGridToFlatArray,
} from './utils';

interface KeyManagerProps {
  dimensionSize: number;
  tiles: TileCollection;
  onChange?: (tiles: TileCollection) => void;
}

export const moveTiles = (code: string, tiles: PTileCollection[]) => {
  switch (code) {
    case 'ArrowUp':
      return moveTwoDimensionTilesTo(tiles, 'top');
    case 'ArrowLeft':
      return moveTwoDimensionTilesTo(tiles, 'left');
    case 'ArrowRight':
      return moveTwoDimensionTilesTo(tiles, 'right');
    case 'ArrowDown':
      return moveTwoDimensionTilesTo(tiles, 'bottom');
    default:
      return null;
  }
};

export class KeyManager extends Component<KeyManagerProps> {
  public handleKeyDown = ({ code }: KeyboardEvent) => {
    const { onChange, tiles, dimensionSize } = this.props;
    if (typeof onChange === 'function') {
      const gridTiles = turnFlatArrayToGrid(dimensionSize, tiles);
      const updatedTiles = moveTiles(code, gridTiles);

      if (updatedTiles) {
        const flattenList = turnGridToFlatArray(updatedTiles);
        onChange(flattenList);
      }
    }
  };
  public render() {
    return (
      <EventListener target="document" onKeyDownCapture={this.handleKeyDown} />
    );
  }
}
