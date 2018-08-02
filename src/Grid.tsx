import React from 'react';
import {
  StyledGridContainer as Container,
  StyledGridRow as Row,
} from './Grid.styled';
import { Tile, tileMargin, tileWidth } from './Tile';
import { TileCollection } from './utils';

export const Grid = ({ tiles }: { tiles: TileCollection[] }) => (
  <Container>
    {tiles.map((row, rowIndex) => (
      <Row
        key={String(rowIndex)}
        style={{ height: rowIndex * (tileWidth + tileMargin) }}
      >
        {row.map(
          (tile, columnIndex) =>
            tile && <Tile key={tile.id} index={columnIndex} tile={tile} />,
        )}
      </Row>
    ))}
  </Container>
);
