import React, { Component } from 'react';
import EventListener from 'react-event-listener';
import { moveTwoDimensionTilesTo, TileCollection } from './utils';

interface KeyManagerProps {
  tiles: TileCollection[];
  onChange?: (tiles: TileCollection[]) => void;
}

export class KeyManager extends Component<KeyManagerProps> {
  public handleKeyDown = ({ code }: KeyboardEvent) => {
    const { onChange, tiles } = this.props;
    if (typeof onChange !== 'function') {
      return;
    }
    switch (code) {
      case 'ArrowTop':
        return onChange(moveTwoDimensionTilesTo(tiles, 'top'));
      case 'ArrowLeft':
        return onChange(moveTwoDimensionTilesTo(tiles, 'left'));
      case 'ArrowRight':
        return onChange(moveTwoDimensionTilesTo(tiles, 'right'));
      case 'ArrowBottom':
        return onChange(moveTwoDimensionTilesTo(tiles, 'bottom'));
      default:
        return;
    }
  };
  public render() {
    return (
      <EventListener target="document" onKeyDownCapture={this.handleKeyDown} />
    );
  }
}
