import * as React from 'react';
import { StyledAppContainer as Container } from './App.styled';
import { Background } from './Background';
import { End } from './End';
import { Grid } from './Grid';
import { KeyManager } from './KeyManager';
import { tileMargin, tileWidth } from './Tile';
import {
  canCombineGridTiles,
  fillWithRandomTile,
  isCollectionSame,
  TileCollection,
} from './utils';

const size = 4;
const gridSize = size ** 2;

class App extends React.Component<
  any,
  { end: boolean; tiles: TileCollection }
> {
  public state = {
    end: false,
    tiles: fillWithRandomTile(gridSize, [] as TileCollection)!,
  };

  public handleReset = () =>
    this.setState({
      end: false,
      tiles: fillWithRandomTile(gridSize, [] as TileCollection)!,
    });

  public handleChange = (updatedTiles: TileCollection) => {
    this.setState(({ tiles: currentTiles }) => {
      if (isCollectionSame(updatedTiles, currentTiles)) {
        return null;
      }

      const filledOneEmptyTile = fillWithRandomTile(gridSize, updatedTiles);

      if (filledOneEmptyTile) {
        return {
          end: !canCombineGridTiles(size, filledOneEmptyTile),
          tiles: filledOneEmptyTile.sort((a, b) => Number(a.id < b.id)),
        };
      }

      return { ended: true } as any;
    });
  };
  public render() {
    const { tiles, end } = this.state;
    (window as any).tiles = tiles;
    return (
      <Container>
        <KeyManager
          tiles={tiles}
          dimensionSize={size}
          onChange={end ? undefined : this.handleChange}
        />
        <Background size={size} tileWidth={tileWidth} tileMargin={tileMargin} />
        <Grid gridSize={size} tiles={tiles} />
        <End visible={end} onReset={this.handleReset} />
      </Container>
    );
  }
}

export default App;
