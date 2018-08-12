import React from 'react';
import {
  StyledScoreContainer as Container,
  StyledScoreTitle as Title,
  StyledScoreValue as Value,
} from './Score.styled';

export const Score = ({ score }: { score: number }) => (
  <Container>
    <Title>Score</Title>
    <Value>{score}</Value>
  </Container>
);
