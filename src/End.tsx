import React from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  StyledButton as Button,
  StyledContainer as Container,
  StyledTitle as Title,
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
        <Title>End!</Title>
        <div>
          <Button onClick={onReset}>Start over</Button>
        </div>
      </Container>
    </Wrapper>
  </CSSTransition>
);
