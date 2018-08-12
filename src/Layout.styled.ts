import styled from 'styled-components';
import { palette } from './utils';

export const StyledLayoutTitle = styled.h1`
  display: block;
  font-size: 4em;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.1em;
  user-select: none;

  color: ${palette.shade.toString()};
  text-shadow: 0.01em 0.03em ${palette.shade.darken(0.4).hex()},
    0 0 0.1em
      ${palette.shade
        .darken(0.5)
        .alpha(0.3)
        .rgb()
        .toString()};
`;

export const StyledLayoutContainer = styled.div`
  font-family: 'Fira Sans', sans-serif;
  display: flex;
  font-size: 20px;
  margin: 60px auto;
  flex-direction: column;
  cursor: default;
`;

export const StyledLayoutHeader = styled.div`
  display: block;
  margin-bottom: 40px;
`;

export const StyledLayoutMain = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledLayoutMainContainer = styled.div`
  position: relative;
`;
