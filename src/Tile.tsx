import React from 'react';
import { StyledTileContainer as Container } from './Tile.styled';
import { TileModel } from './utils';

export const tileWidth = 80;
export const tileMargin = 4;

const getRow = (gridSize: number, index: number) =>
  Math.floor(index / gridSize);

const getColumn = (gridSize: number, index: number) => index % gridSize;

export const Tile = ({
  gridSize,
  tile,
}: {
  gridSize: number;
  tile: TileModel;
}) => (
  <Container
    style={{
      height: tileWidth,
      left: getColumn(gridSize, tile.index) * (tileWidth + tileMargin),
      marginLeft: tileMargin,
      marginTop: tileMargin,
      top: getRow(gridSize, tile.index) * (tileWidth + tileMargin),
      width: tileWidth,
    }}
  >
    <span>{tile.value}</span>
  </Container>
);
