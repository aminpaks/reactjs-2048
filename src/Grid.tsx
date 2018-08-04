import React from 'react';
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
      {tiles.map(
        tile => tile && <Tile key={tile.id} gridSize={gridSize} tile={tile} />,
      )}
    </Wrapper>
  </Container>
);
