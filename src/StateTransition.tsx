import { Component } from 'react';

export type TransitionStateType =
  | 'none'
  | 'idle'
  | 'delay'
  | 'enter'
  | 'active'
  | 'done'
  | 'reset';

interface RenderPropParams {
  state: TransitionStateType;
  onChange: (updateState: TransitionStateType) => void;
  [key: string]: any;
}

type RenderProp = (props: RenderPropParams) => JSX.Element | null;

interface StateTransitionProps {
  children?: RenderProp;
  delay?: number;
  duration: number;
  in?: boolean;
  render?: RenderProp;
  value?: any;
  [key: string]: any;
}
interface StateTransitionState {
  current: TransitionStateType;
  prevValue: any;
  isResetting: boolean;
}

export class StateTransition extends Component<
  StateTransitionProps,
  StateTransitionState
> {
  public static getDerivedStateFromProps(
    props: StateTransitionProps,
    state: StateTransitionState,
  ): Partial<StateTransitionState> | null {
    const { in: inPropValue, value } = props;
    const { current, prevValue } = state;
    if (Boolean(inPropValue) && value !== prevValue) {
      if (current === 'none' || current === 'done') {
        return { current: 'idle', prevValue: value };
      }
      return { current: 'reset', prevValue: value };
    }
    return null;
  }
  public state: StateTransitionState = {
    current: 'none',
    isResetting: false,
    prevValue: null,
  };
  private durationTID: number | undefined;
  private delayTID: number | undefined;
  public componentDidUpdate() {
    const { current, isResetting } = this.state;
    const { delay = 0 } = this.props;

    switch (current) {
      case 'idle':
        this.clearTimeout();
        this.setState({ current: 'delay' });
        break;

      case 'delay':
        if (!this.delayTID) {
          this.delayTID = window.setTimeout(
            () =>
              this.setState(({ current: currentState }) => {
                if (currentState === 'delay') {
                  this.delayTID = undefined;
                  return { current: 'enter' };
                }
                return null;
              }),
            delay,
          );
        }
        break;

      case 'reset':
        this.setState({ current: 'done', isResetting: true });
        break;

      case 'enter':
        this.setState({ current: 'active' });
        break;

      case 'active':
        if (!this.durationTID) {
          this.durationTID = window.setTimeout(
            () =>
              this.setState(({ current: currentState }) => {
                if (currentState === 'active') {
                  this.durationTID = undefined;
                  return { current: 'done' };
                }
                return null;
              }),
            this.props.duration,
          );
        }
        break;

      case 'done':
        if (isResetting) {
          this.setState(({ isResetting: isCurrentResetting }) => {
            if (isCurrentResetting) {
              return { current: 'enter', isResetting: false };
            }

            return null as any;
          });
        }
        break;
    }
    return;
  }
  public componentWillUnmount() {
    this.clearTimeout();
  }
  public handleChange = (current: TransitionStateType) => {
    this.setState({ current });
  };
  public render() {
    const { current } = this.state;
    const { render = this.props.children, ...rest } = this.props;
    if (typeof render === 'function') {
      return render({ ...rest, state: current, onChange: this.handleChange });
    }
    return null;
  }
  private clearTimeout() {
    if (this.delayTID) {
      window.clearTimeout(this.delayTID);
      this.delayTID = undefined;
    }
    if (this.durationTID) {
      window.clearTimeout(this.durationTID);
      this.durationTID = undefined;
    }
  }
}
