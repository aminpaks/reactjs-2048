import React from 'react';
import {
  StyledBackgroundContainer as Container,
  StyledBackgroundRow as BackgroundRow,
  StyledBackgroundTile as BackgroundTile,
} from './Background.styled';
import { tileMargin, tileWidth } from './Tile';
import { buildArray } from './utils';

export const Background = ({
  size,
}: {
  size: number;
  tileWidth: number;
  tileMargin: number;
}) => (
  <Container size={size}>
    {buildArray(size).map((row, index) => (
      <BackgroundRow key={String(index)}>
        {buildArray(size).map((column, columnIndex) => (
          <BackgroundTile
            key={String(columnIndex)}
            width={tileWidth}
            margin={tileMargin}
          />
        ))}
      </BackgroundRow>
    ))}
  </Container>
);
