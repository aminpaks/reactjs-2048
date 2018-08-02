import * as React from 'react';
import { StyledAppContainer as Container } from './App.styled';
import { Background } from './Background';
import { Grid } from './Grid';
import { KeyManager } from './KeyManager';
import { tileMargin, tileWidth } from './Tile';
import { getEmptyGrid, TileCollection } from './utils';

const size = 4;

class App extends React.Component {
  public state = { tiles: getEmptyGrid(size) };
  public handleChange = (tiles: TileCollection[]) => this.setState({ tiles });
  public render() {
    const { tiles } = this.state;
    return (
      <Container>
        <KeyManager tiles={tiles} onChange={this.handleChange} />
        <Background size={size} tileWidth={tileWidth} tileMargin={tileMargin} />
        <Grid tiles={tiles} />
      </Container>
    );
  }
}

export default App;
