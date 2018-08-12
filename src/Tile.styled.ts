import styled, { css, keyframes } from 'styled-components';
import { CssGlare } from './css';

const aniBounce = keyframes`
  0% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

const aniFadeOut = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  70% {
    opacity: 1;
    transform: scale(0.5);
  }
  100% {
    opacity: 0;
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

  font-size: 24px;
  background-image: linear-gradient(45deg, orange, yellow);
  user-select: none;
  cursor: default;
`;

export const StyledTileValue = styled.span`
  font-weight: 600;
  position: relative;
  z-index: 3;

  &.tile-value-enter,
  &.tile-value-done {
    animation-name: none;
  }
  &.tile-value-active {
    animation-name: ${aniBounce};
    animation-duration: 200ms;
    animation-iteration-count: infinite;
  }
`;

export const StyledTileGrowInner = styled.span`
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  display: block;
  overflow: hidden;
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  background-color: transparent;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0)
  );
  z-index: 1;

  &.tile-grow-enter,
  &.tile-grow-done {
    animation-name: none;
  }
  &.tile-grow-active {
    animation: ${aniFadeOut} 200ms infinite;
  }
`;
