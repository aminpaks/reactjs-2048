import React from 'react';
import { StyledTileContainer as Container } from './Tile.styled';
import { TileModel } from './utils';

export const tileWidth = 80;
export const tileMargin = 4;

const getRow = (gridSize: number, index: number) =>
  Math.floor(index / gridSize);

const getColumn = (gridSize: number, index: number) => index % gridSize;

export const Tile = ({
  index,
  gridSize,
  tile,
}: {
  index: number;
  gridSize: number;
  tile: TileModel;
}) => (
  <Container
    width={tileWidth}
    margin={tileMargin}
    style={{
      left: getColumn(gridSize, index) * (tileWidth + tileMargin),
      top: getRow(gridSize, index) * (tileWidth + tileMargin),
    }}
  >
    {tile.value}
  </Container>
);
