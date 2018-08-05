import styled, { css, keyframes } from 'styled-components';
import { CssGlare } from './css';

const aniBounce = keyframes`
  0% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

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
  ${CssGlare};

  font-size: 20px;
  background-image: linear-gradient(45deg, orange, yellow);
  transition: 140ms ease-out, transform 120ms 100ms ease-out;
  user-select: none;
  cursor: default;

  span {
    font-weight: 600;
    position: relative;
    z-index: 1;
  }

  &.tile-enter {
    transform: scale(0);
  }
  &.tile-enter-active {
    transform: scale(1);
    z-index: 2;
  }
  &.tile-merge {
    animation-name: none;
  }
  &.tile-merge-active {
    animation-name: ${aniBounce};
    animation-delay: 220ms;
    animation-duration: 400ms;
    z-index: 2;
  }
  &.tile-merge-done {
    animation-name: none;
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
