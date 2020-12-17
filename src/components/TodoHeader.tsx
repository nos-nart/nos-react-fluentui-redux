import React from 'react'
import { FilterTypes } from '../store';
import { Stack, Text, TextField, PrimaryButton, Pivot, PivotItem, IStackTokens } from '@fluentui/react';
import { connect } from 'react-redux';
import { actions } from '../actions';

interface ITodoHeaderProps {
  add: (label: string) => void;
  setFilter: (filter: FilterTypes) => void;
}

interface ITodoHeaderState {
  labelInput: string;
}

const todoHeaderStackTokens: IStackTokens = { childrenGap: 10 }

class TodoHeader extends React.Component<ITodoHeaderProps, ITodoHeaderState> {
  constructor(props: ITodoHeaderProps) {
    super(props);
    this.state = { labelInput: '' };
  }

  render() {
    return (
      <Stack tokens={todoHeaderStackTokens}>
        <Stack horizontal horizontalAlign="center">
          <Text variant="xLarge">Redux toolkit + Fluent UI
            <span role="img" aria-label="sparkle">🔮</span>
          </Text>
        </Stack>
        <Stack horizontal tokens={todoHeaderStackTokens}>
          <Stack.Item grow>
            <TextField
              placeholder="What needs to be done?"
              value={this.state.labelInput}
              onChange={this.onChange}
              styles={props => ({
                ...(props.focused && {
                  field: {
                    backgroundColor: '#c7e0f4'
                  }
                })
              })}
            />
          </Stack.Item>
          <PrimaryButton onClick={this.onAdd}>Add</PrimaryButton>
        </Stack>
        <Pivot onLinkClick={this.onFilter}>
          <PivotItem headerText="all" />
          <PivotItem headerText="active" />
          <PivotItem headerText="completed" />
        </Pivot>
      </Stack>
    )
  }

  private onAdd = () => {
    this.props.add(this.state.labelInput);
    this.setState({ labelInput: '' });
  };

  private onChange = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    this.setState({ labelInput: newValue! });
  };

  private onFilter = (item?: PivotItem) => {
    this.props.setFilter(item?.props.headerText as FilterTypes);
  };
}

const ConnectedTodoHeader = connect(
  state => ({}),
  dispatch => ({
    add: (label: string) => dispatch(actions.add(label)),
    setFilter: (filter: string) => dispatch(actions.setFilter(filter))
  })
)(TodoHeader);

export { ConnectedTodoHeader as TodoHeader };
