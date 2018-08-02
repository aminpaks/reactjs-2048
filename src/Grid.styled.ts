import styled from 'styled-components';
import { CssTile } from './Tile.styled';

export const StyledGridContainer = styled.div`
  top: 0;
  left: 0;
  display: block;
  position: absolute;
  z-index: 1;
`;

export const StyledGridRow = styled.div`
  position: relative;
`;

export const StyledEmptyTile = styled.div`
  ${CssTile};
`;
