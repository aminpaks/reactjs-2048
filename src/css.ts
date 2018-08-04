import { css } from 'styled-components';

export const CssGlare = css`
  &::before {
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    transition: 120ms ease-in-out;
    background-image: linear-gradient(
      55deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 41%,
      rgba(255, 255, 255, 0.1) 85%
    );
    box-shadow: 0 0 20px 1px inset #fff;
  }
`;
