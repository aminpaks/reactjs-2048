import React, { Component } from 'react';
import { config, Transition } from 'react-spring';
import {
  StyledResultContainer as Container,
  StyledResultTitle as Title,
} from './Result.styled';

type ChildrenType = 'game-over';
interface ResultProps {
  isOver: boolean;
}
interface ResultState {
  items: ChildrenType[];
  prevProps: ResultProps;
}

export class Result extends Component<ResultProps, ResultState> {
  public static getDerivedStateFromProps(
    props: ResultProps,
    state: ResultState,
  ): Partial<ResultState> | null {
    if (props.isOver !== state.prevProps.isOver) {
      if (props.isOver) {
        return {
          items: ['game-over'],
          prevProps: props,
        };
      }
      return {
        items: [],
        prevProps: props,
      };
    }
    return {
      prevProps: props,
    };
  }
  public state: ResultState = { items: [], prevProps: { isOver: false } };
  public render() {
    const { items } = this.state;

    return (
      <Container>
        <Transition
          keys={items}
          from={{ opacity: 0, height: 0 }}
          enter={{ opacity: 1, height: 'auto' }}
          leave={{ opacity: 0, height: 0 }}
          config={config.wobbly}
        >
          {items.map(item => (styles: any) => {
            switch (item) {
              case 'game-over':
                return <Title style={{ ...styles }}>Game over!</Title>;
            }
            return null;
          })}
        </Transition>
      </Container>
    );
  }
}
