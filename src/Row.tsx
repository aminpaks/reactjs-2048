import React from 'react';
import {
  StyledHeaderColumn as Column,
  StyledHeaderContainer as Container,
} from './Row.styled';

export const Row = ({ children }) => {
  return (
    <Container>
      {React.Children.map(children, child => <Column>{child}</Column>)}
    </Container>
  );
};
