import React from 'react';
import { todoActions } from '../redux/actions/todo';
import { connect } from 'react-redux';
import { Store } from '../redux/store';
import { Stack, DefaultButton, Text } from '@fluentui/react';

interface TodoFooterProps {
  todo: Store['todo'];
  clear: () => void;
}

const TodoFooter = (props: TodoFooterProps) => {
  const { todo, clear } = props;

  const itemCount = Object.keys(todo).filter(id => !todo[id].completed).length;

  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
      <Text>{itemCount} item{itemCount === 1 ? '' : 's'} left</Text>
      <DefaultButton onClick={() => clear()}>Clear Completed</DefaultButton>
    </Stack>
  );
};

const ConnectedTodoFooter = connect(
  (state: Store) => ({
    todo: state.todo
  }),
  dispatch => ({
    clear: () => dispatch(todoActions.clear())
  })
)(TodoFooter);

export { ConnectedTodoFooter as TodoFooter };
