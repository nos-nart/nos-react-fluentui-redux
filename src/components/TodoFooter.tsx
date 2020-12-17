import React from 'react';
import { actions } from '../actions';
import { connect } from 'react-redux';
import { IStore } from '../store';
import { Stack, DefaultButton, Text } from '@fluentui/react';

interface TodoFooterProps {
  todos: IStore['todos'];
  clear: () => void;
}

const TodoFooter = (props: TodoFooterProps) => {
  const { todos, clear } = props;

  const itemCount = Object.keys(todos).filter(id => !todos[id].completed).length;

  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
      <Text>{itemCount} item{itemCount === 1 ? '' : 's'} left</Text>
      <DefaultButton onClick={() => clear()}>Clear Completed</DefaultButton>
    </Stack>
  );
};

const ConnectedTodoFooter = connect(
  (state: IStore) => ({
    todos: state.todos
  }),
  dispatch => ({
    clear: () => dispatch(actions.clear())
  })
)(TodoFooter);

export { ConnectedTodoFooter as TodoFooter };
