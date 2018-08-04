import React, { Component } from 'react';
import EventListener from 'react-event-listener';
import { moveTwoDimensionTilesTo, PTileCollection } from './utils';

interface KeyManagerProps {
  tiles: PTileCollection[];
  onChange?: (tiles: ReadonlyArray<PTileCollection>) => void;
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
    const { onChange, tiles } = this.props;
    if (typeof onChange === 'function') {
      const updatedTiles = moveTiles(code, tiles);

      if (updatedTiles) {
        onChange(updatedTiles);
      }
    }
  };
  public render() {
    return (
      <EventListener target="document" onKeyDownCapture={this.handleKeyDown} />
    );
  }
}
