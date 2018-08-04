import styled from 'styled-components';
import { CssGlare } from './css';

export const StyledWrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.2);
  transition: 200ms ease-in-out;

  z-index: 99;

  &.wrapper-enter {
    opacity: 0;
  }
  &.wrapper-enter-active {
    opacity: 1;
  }
  &.wrapper-exit {
    opacity: 1;
  }
  &.wrapper-exit-active {
    opacity: 0;
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 300px;
  @media (min-width: 500px) {
    width: 480px;
  }

  font-size: 3rem;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);

  &.container-enter {
    opacity: 0;
  }
  &.container-enter-active {
    opacity: 1;
  }
`;

export const StyledButton = styled.button`
  margin: 1em;
  padding: 1em 2em;
  font-size: 0.5em;
  overflow: hidden;
  position: relative;
  outline: none;

  border: 1px solid #000;
  border-radius: 0.5em;
  background-image: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.2)
  );
  cursor: pointer;

  ${CssGlare};
  &:focus,
  &:hover {
    &::before {
      transform: scale(1.2);
    }
  }
`;
