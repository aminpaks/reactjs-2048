import styled, { css } from 'styled-components';
import { CssGlare } from './css';

export const CssTile = css`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
`;

export const StyledTileContainer = styled.div`
  ${CssTile};
  font-size: 20px;
  background-image: linear-gradient(45deg, orange, yellow);
  transition: 130ms ease-out;
  user-select: none;
  cursor: default;

  span {
    position: relative;
    z-index: 1;
  }

  ${CssGlare};

  &.tile-enter {
    transform: scale(0);
  }
  &.tile-enter-active {
    transform: scale(1);
    z-index: 2;
  }
  &.tile-exit {
    opacity: 1;
    transform: scale(1);
  }
  &.tile-exit-active {
    opacity: 0;
    transform: scale(0);
  }
`;
