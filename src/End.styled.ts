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
  font-size: 3rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-shadow: 0 0 10px #fff;
`;

export const StyledButton = styled.button`
  padding: 1em 2em;
  font-size: 0.5em;
  overflow: hidden;
  position: relative;
  border: 1px solid transparent;
  border-radius: 0.5em;
  transition: 220ms ease;
  background-color: rgba(255, 255, 255, 0.8);
  background-image: linear-gradient(
    55deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.2)
  );
  box-shadow: 0 0 50px 0 inset rgba(0, 0, 0, 0), 0 4px 30px rgba(0, 0, 0, 0.3);
  outline: none;
  cursor: pointer;

  ${CssGlare};
  &::before {
    transition: 220ms ease;
  }
  &:focus,
  &:hover {
    border-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 50px 0 inset rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 0, 0, 0.3);

    &::before {
      transform: scale(1.4);
    }
  }
  &:focus {
    box-shadow: 0 0 50px 0 inset rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.3);
  }
`;

export const StyledTitle = styled.h3`
  margin-top: 0;
`;
