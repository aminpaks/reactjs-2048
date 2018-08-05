import React, { Component } from 'react';
import { StyledTileContainer as Container } from './Tile.styled';
import { TileModel } from './utils';

export const tileWidth = 80;
export const tileMargin = 4;
export const aniBounceDuration = 620;

type MergeState = 'none' | 'mergeEnter' | 'mergeActive' | 'mergeDone';
interface TileProps {
  tile: TileModel;
  gridSize: number;
}
interface TileState {
  mergeState: MergeState;
}

const getRow = (gridSize: number, index: number) =>
  Math.floor(index / gridSize);

const getColumn = (gridSize: number, index: number) => index % gridSize;

const getMergeClassName = (state: MergeState) => {
  switch (state) {
    case 'mergeEnter':
      return 'tile-merge';
    case 'mergeActive':
      return 'tile-merge tile-merge-active';
    case 'mergeDone':
      return 'tile-merge-done';
    default:
      return '';
  }
};

export class Tile extends Component<TileProps, TileState> {
  public static getDerivedStateFromProps(
    props: TileProps,
    state: TileState,
  ): Partial<TileState> | null {
    if (state.mergeState === 'none' && props.tile.merged === true) {
      return { mergeState: 'mergeEnter' };
    }
    return null;
  }
  public tid: number | undefined;
  public state = { mergeState: 'none' } as TileState;
  public handleMergeState = (prevProps?: TileProps) => {
    if (!prevProps || prevProps.tile.value !== this.props.tile.value) {
      if (this.state.mergeState !== 'none') {
        this.tid = undefined;
        return this.setState({ mergeState: 'none' });
      }
    }
    if (this.state.mergeState === 'mergeEnter') {
      this.setState({ mergeState: 'mergeActive' });
    } else if (this.state.mergeState === 'mergeActive' && !this.tid) {
      this.tid = window.setTimeout(
        () =>
          this.setState(({ mergeState }) => {
            this.tid = undefined;
            if (mergeState === 'mergeActive') {
              return { mergeState: 'mergeDone' };
            }
            return null;
          }),
        aniBounceDuration,
      );
    }
  };
  public componentDidMount() {
    this.handleMergeState();
  }
  public componentDidUpdate(prevProps: TileProps) {
    this.handleMergeState(prevProps);
  }
  public componentWillUnmount() {
    window.clearTimeout(this.tid);
  }
  public render() {
    const { mergeState } = this.state;
    const { tile, gridSize } = this.props;
    return (
      <Container
        className={getMergeClassName(mergeState)}
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
  }
}
