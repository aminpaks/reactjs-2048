import * as React from 'react';
import { StyledAppContainer as Container } from './App.styled';
import { Background } from './Background';
import { Grid } from './Grid';
import { KeyManager } from './KeyManager';
import { tileMargin, tileWidth } from './Tile';
import { fillWithRandomTile, getEmptyGrid, TileCollection } from './utils';

const size = 4;

class App extends React.Component<
  any,
  { ended: boolean; tiles: TileCollection[] }
> {
  public state = {
    ended: false,
    tiles: fillWithRandomTile(getEmptyGrid(size))!,
  };
  public handleChange = (tiles: TileCollection[]) => {
    const filledOneEmptyTile = fillWithRandomTile(tiles);

    if (filledOneEmptyTile) {
      return this.setState({ tiles: filledOneEmptyTile });
    }

    return this.setState({ ended: true });
  };
  public render() {
    const { tiles, ended } = this.state;
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
