import React from 'react';
import WebFont from 'webfontloader';
import {
  StyledLayoutContainer as Container,
  StyledLayoutHeader as Header,
  StyledLayoutMain as Main,
  StyledLayoutMainContainer as MainContainer,
  StyledLayoutTitle as Title,
} from './Layout.styled';

WebFont.load({
  google: {
    families: ['Fira+Sans:400,600'],
  },
});

export const Layout = ({
  header,
  main,
  footer,
}: {
  header: JSX.Element;
  main: JSX.Element;
  footer: JSX.Element;
}) => (
  <Container>
    <Title>2048</Title>
    <Header>{header}</Header>
    <Main>
      <MainContainer>{main}</MainContainer>
    </Main>
    {footer}
  </Container>
);
