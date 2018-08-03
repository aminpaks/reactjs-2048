import styled, { css } from 'styled-components';

export const CssTile = css`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 4px;
`;

export const StyledTileContainer = styled.div<{
  width: number;
  margin: number;
}>`
  ${CssTile};
  width: ${props => props.width}px;
  height: ${props => props.width}px;
  margin-top: ${props => props.margin}px;
  margin-left: ${props => props.margin}px;
  font-size: 20px;
  background: yellow;
  transition: 130ms ease-out;
  user-select: none;
  cursor: default;
`;
