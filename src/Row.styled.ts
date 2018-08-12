import styled from 'styled-components';

export const StyledHeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const StyledHeaderColumn = styled.div`
  flex: 0 0 auto;

  &:not(:empty) {
    margin-top: 0.4em;
    margin-bottom: 0.4em;
  }

  &:not(:first-of-type) {
    margin-left: 0.6em;
  }
  &:not(:last-of-type) {
    margin-right: 0.6em;
  }
`;
