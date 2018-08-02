import React from 'react';
import { StyledTileContainer as Container } from './Tile.styled';
import { TileModel } from './utils';

export const tileWidth = 80;
export const tileMargin = 4;

export const Tile = ({ index, tile }: { index: number; tile: TileModel }) => (
  <Container
    width={tileWidth}
    margin={tileMargin}
    style={{
      left: index * (tileWidth + tileMargin),
    }}
  >
    {tile.value}
  </Container>
);
