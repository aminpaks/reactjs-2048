import React from 'react';
import { Spring } from 'react-spring';
import { Easing, TimingAnimation } from 'react-spring/dist/addons';
import { StateTransition, TransitionStateType } from './StateTransition';
import {
  StyledTileContainer as Container,
  StyledTileGrowInner as TileGrowInner,
  StyledTileValue as TileValue,
} from './Tile.styled';
import { TileModel } from './utils';

export const tileWidth = 80;
export const tileMargin = 4;
export const aniBounceDuration = 620;

const getRow = (gridSize: number, index: number) =>
  Math.floor(index / gridSize);

const getColumn = (gridSize: number, index: number) => index % gridSize;

const getStateClassName = (
  state: TransitionStateType,
  prefix: string,
  extra: string = '',
) => {
  const classNames = extra.split(' ');
  switch (state) {
    case 'enter':
      return classNames.concat(`${prefix}-enter`).join(' ');
    case 'active':
      return classNames.concat(`${prefix}-enter`, `${prefix}-active`).join(' ');
    case 'done':
    case 'reset':
      return classNames.concat(`${prefix}-done`).join(' ');
    default:
      return '';
  }
};

export const Tile = ({
  tile,
  gridSize,
  extraStyles,
}: {
  tile: TileModel;
  gridSize: number;
  extraStyles: any;
}) => (
  <StateTransition
    delay={130}
    duration={200}
    in={tile.merged}
    tile={tile}
    value={tile.index}
  >
    {({ state }) => (
      <Spring
        to={{
          left: getColumn(gridSize, tile.index) * (tileWidth + tileMargin),
          top: getRow(gridSize, tile.index) * (tileWidth + tileMargin),
        }}
        impl={TimingAnimation}
        config={{ duration: 120, easing: Easing.sin }}
      >
        {({ top, left }) => (
          <Container
            style={{
              ...extraStyles,
              height: tileWidth,
              left,
              marginLeft: tileMargin,
              marginTop: tileMargin,
              top,
              width: tileWidth,
            }}
          >
            <TileValue className={getStateClassName(state, 'tile-value')}>
              {tile.value}
            </TileValue>
            <TileGrowInner className={getStateClassName(state, 'tile-grow')} />
          </Container>
        )}
      </Spring>
    )}
  </StateTransition>
);
