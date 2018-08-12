import styled from 'styled-components';
import { palette } from './utils';

export const StyledScoreContainer = styled.div`
  display: flex;
  flex: 0 1 auto;
  min-width: 50px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.16em;
  padding: 0.2em 1em;
  background-image: linear-gradient(
    45deg,
    ${palette.primary.hex()},
    ${palette.primary.darken(0.2).hex()},
    ${palette.primary.hex()}
  );
  background-size: 120% 120%;
  border: 1px solid ${palette.primary.darken(0.2).hex()};
`;

export const StyledScoreTitle = styled.div`
  display: block;
  font-size: 0.6em;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  color: ${palette.textContrast.darken(0.05).hex()};
`;

export const StyledScoreValue = styled.div`
  display: block;
  color: #fff;
  font-size: 1.2em;
`;
