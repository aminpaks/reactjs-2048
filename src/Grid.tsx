import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  StyledGridContainer as Container,
  StyledGridWrapper as Wrapper,
} from './Grid.styled';
import { Tile } from './Tile';
import { TileCollection } from './utils';

export const Grid = ({
  tiles,
  gridSize,
}: {
  gridSize: number;
  tiles: TileCollection;
}) => (
  <Container>
    <Wrapper>
      <TransitionGroup component={null}>
        {tiles.map(tile => (
          <CSSTransition
            key={tile.id}
            classNames="tile"
            timeout={130}
            in={true}
            appear={true}
            unmountOnExit={true}
          >
            <Tile gridSize={gridSize} tile={tile} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Wrapper>
  </Container>
);
