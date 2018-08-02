import styled from 'styled-components';
import { tileMargin, tileWidth } from './Tile';
import { CssTile } from './Tile.styled';

export const StyledBackgroundContainer = styled.div<{ size: number }>`
  width: ${props => tileMargin + props.size * (tileWidth + tileMargin)}px;
  height: ${props => tileMargin + props.size * (tileWidth + tileMargin)}px;
  border-radius: 4px;
  background-image: linear-gradient(45deg, #777 0%, #999 50%, #777 100%);
`;

export const StyledBackgroundRow = styled.div`
  display: flex;
`;

export const StyledBackgroundTile = styled.div<{
  width: number;
  margin: number;
}>`
  ${CssTile};
  width: ${props => props.width}px;
  height: ${props => props.width}px;
  margin-top: ${props => props.margin}px;
  margin-left: ${props => props.margin}px;
  position: relative;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 80%
  );
`;
