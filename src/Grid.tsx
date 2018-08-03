import React from 'react';
import {
  StyledGridContainer as Container,
  StyledGridWrapper as Wrapper,
} from './Grid.styled';
import { Tile } from './Tile';
import { TileCollection, turnGridToFlatArray } from './utils';

export const Grid = ({
  tiles,
  gridSize,
}: {
  gridSize: number;
  tiles: TileCollection[];
}) => (
  <Container>
    <Wrapper>
      {turnGridToFlatArray(tiles).map(
        (tile, tileIndex) =>
          tile && (
            <Tile
              key={tile.id}
              index={tileIndex}
              gridSize={gridSize}
              tile={tile}
            />
          ),
      )}
    </Wrapper>
  </Container>
);
