import styled from 'styled-components';
import { generateCssGlare } from './css';
import { palette } from './utils';

export const StyledButton = styled.button`
  ${generateCssGlare(palette.primary)};

  cursor: pointer;
  outline: none;

  font-size: 1em;
  font-family: inherit;
  padding: 0.6em 1em;
  border: 1px solid ${palette.primary.darken(0.1).hex()};
  border-radius: 0.2em;

  overflow: hidden;
  position: relative;
  transition: 220ms ease;
  text-transform: uppercase;

  color: ${palette.textContrast.hex()};
  background-color: ${palette.primary.hex()};
  box-shadow: 0 0 50px inset
      ${palette.primary
        .alpha(0)
        .rgb()
        .toString()},
    0 2px 20px
      ${palette.primary
        .alpha(0.2)
        .rgb()
        .toString()};

  &::before {
    transition: inherit;
  }
  &:hover {
    border-color: ${palette.primary.darken(0.1).hex()};
    background-color: ${palette.primary.darken(0.1).hex()};
    box-shadow: 0 0 1.6em inset
        ${palette.primary
          .darken(0.6)
          .alpha(0.6)
          .rgb()
          .toString()},
      0 0 20px
        ${palette.primary
          .darken(0.2)
          .alpha(0.1)
          .rgb()
          .toString()};
  }
  &:hover::before {
    transform: scale(1.4) translateX(-4%);
  }
  &:focus {
    border-color: ${palette.primary.darken(0.6).toString()};
    box-shadow: 0 0 2em inset
      ${palette.primary
        .darken(0.9)
        .alpha(0.5)
        .rgb()
        .toString()};
  }
`;
