import React, { MouseEventHandler } from 'react';
import { StyledButton } from './Button.styled';

export const Button = ({
  text,
  onClick,
}: {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <StyledButton type="button" onClick={onClick}>
    {text}
  </StyledButton>
);
