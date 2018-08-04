import isEqual from 'fast-deep-equal';
import * as React from 'react';
import { StyledAppContainer as Container } from './App.styled';
import { Background } from './Background';
import { Grid } from './Grid';
import { KeyManager } from './KeyManager';
import { tileMargin, tileWidth } from './Tile';
import { fillWithRandomTile, getEmptyGrid, PTileCollection } from './utils';

const size = 4;

class App extends React.Component<
  any,
  { ended: boolean; tiles: PTileCollection[] }
> {
  public state = {
    ended: false,
    tiles: fillWithRandomTile(getEmptyGrid(size))!,
  };
  public handleChange = (updatedTiles: PTileCollection[]) => {
    this.setState(({ tiles: currentTiles }) => {
      if (isEqual(updatedTiles, currentTiles)) {
        return null;
      }

      const filledOneEmptyTile = fillWithRandomTile(updatedTiles);

      if (filledOneEmptyTile) {
        return { tiles: filledOneEmptyTile };
      }

      return { ended: true } as any;
    });
  };
  public render() {
    const { tiles, ended } = this.state;
    (window as any).tiles = tiles;
    return (
      <Container>
        <KeyManager
          tiles={tiles}
          onChange={ended ? undefined : this.handleChange}
        />
        <Background size={size} tileWidth={tileWidth} tileMargin={tileMargin} />
        <Grid gridSize={size} tiles={tiles} />
      </Container>
    );
  }
}

export default App;
