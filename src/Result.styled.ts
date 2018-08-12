import styled from 'styled-components';
import { palette } from './utils';

export const StyledResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledResultTitle = styled.h3`
  font-size: 2em;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 2em;

  color: ${palette.primary.hex()};
`;
