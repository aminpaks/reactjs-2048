import React, { Fragment } from 'react';
import { Background } from './Background';
import { Button } from './Button';
import { Grid } from './Grid';
import { KeyManager } from './KeyManager';
import { Layout } from './Layout';
import { Result } from './Result';
import { Row } from './Row';
import { Score } from './Score';
import { tileMargin, tileWidth } from './Tile';
import {
  canCombineGridTiles,
  fillWithRandomTile,
  getUpdatedScores,
  isCollectionSame,
  TileCollection,
} from './utils';

interface AppState {
  isOver: boolean;
  tiles: TileCollection;
  score: number;
}

const size = 4;
const gridSize = size ** 2;

const initialState: AppState = {
  isOver: false,
  score: 0,
  tiles: fillWithRandomTile(gridSize, [] as TileCollection)!,
};

class App extends React.Component<any, AppState> {
  public state = initialState;

  public handleResetClick = () => this.setState(initialState);

  public handleChange = (updatedTiles: TileCollection) => {
    this.setState(({ tiles: currentTiles, score: currentScore }) => {
      if (isCollectionSame(updatedTiles, currentTiles)) {
        return null;
      }

      const filledOneEmptyTile = fillWithRandomTile(gridSize, updatedTiles);

      if (filledOneEmptyTile) {
        return {
          isOver: !canCombineGridTiles(size, filledOneEmptyTile),
          score: getUpdatedScores(currentScore, updatedTiles),
          tiles: filledOneEmptyTile.sort((a, b) => Number(a.id < b.id)),
        };
      }

      return { isOver: true } as any;
    });
  };

  public render() {
    const { tiles, score, isOver } = this.state;
    return (
      <Layout
        header={
          <Fragment>
            <Row>
              <Result isOver={isOver} />
            </Row>
            <Row>
              <Button text="Restart" onClick={this.handleResetClick} />
              <Score score={score} />
            </Row>
          </Fragment>
        }
        main={
          <Fragment>
            <Background
              size={size}
              tileWidth={tileWidth}
              tileMargin={tileMargin}
            />
            <Grid gridSize={size} tiles={tiles} />
          </Fragment>
        }
        footer={
          <Fragment>
            <KeyManager
              tiles={tiles}
              dimensionSize={size}
              onChange={isOver ? undefined : this.handleChange}
            />
          </Fragment>
        }
      />
    );
  }
}

export default App;
