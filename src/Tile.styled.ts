import styled, { css } from 'styled-components';

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

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    background-image: linear-gradient(
      55deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 41%,
      rgba(255, 255, 255, 0.1) 85%
    );
    box-shadow: 0 0 20px 1px inset #fff;
  }
`;
