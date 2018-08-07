import React from 'react';
import { config, Transition } from 'react-spring';
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
      <Transition
        keys={tiles.map(tile => tile.id)}
        from={{ opacity: 0, transform: 'scale(0)' }}
        enter={{ opacity: 1, transform: 'scale(1)' }}
        leave={{ opacity: 0, transform: 'scale(0)' }}
        config={config.gentle}
      >
        {tiles.map(tile => (styles: any) => (
          <Tile
            key={tile.id}
            gridSize={gridSize}
            tile={tile}
            extraStyles={styles}
          />
        ))}
      </Transition>
    </Wrapper>
  </Container>
);
