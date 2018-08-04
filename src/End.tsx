import React from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  StyledButton as Button,
  StyledContainer as Container,
  StyledWrapper as Wrapper,
} from './End.styled';

export const End = ({
  visible,
  onReset,
}: {
  visible: boolean;
  onReset: () => void;
}) => (
  <CSSTransition
    classNames="wrapper"
    in={visible}
    unmountOnExit={true}
    timeout={200}
  >
    <Wrapper>
      <Container>
        <span>End!</span>
        <div>
          <Button onClick={onReset}>Start over</Button>
        </div>
      </Container>
    </Wrapper>
  </CSSTransition>
);
