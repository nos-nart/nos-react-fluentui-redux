import React from 'react'
import { Stack, IStackTokens } from '@fluentui/react'
import { connect } from 'react-redux'
import { IStore } from '../store'
import { TodoItem } from './TodoItem'

interface ITodoListProps {
  todos: IStore['todos'];
  filter: IStore['filter'];
}

const todoListStackTokens: IStackTokens = { childrenGap: 10 }

const TodoList = (props: ITodoListProps) => {
  const { filter, todos } = props;
  const filteredTodos = Object.keys(todos).filter(id => {
    return filter === 'all' ||
      (filter === 'completed' && todos[id].completed) ||
      (filter === 'active' && !todos[id].completed);
  });

  return (
    <Stack tokens={todoListStackTokens}>
      {filteredTodos.map(id => (
        <TodoItem key={id} id={id} />
      ))}
    </Stack>
  )
}

const ConnectedTodoList = connect((state: IStore) => ({ ...state }))(TodoList);
export { ConnectedTodoList as TodoList };
