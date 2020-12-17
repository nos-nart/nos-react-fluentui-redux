import React from 'react'
import { Stack, IStackTokens } from '@fluentui/react'
import { connect } from 'react-redux'
import { Store } from '../redux/store/index'
import { TodoItem } from './TodoItem'

interface ITodoListProps {
  todo: Store['todo'];
  filter: Store['filter'];
}

const todoListStackTokens: IStackTokens = { childrenGap: 10 }

const TodoList = (props: ITodoListProps) => {
  const { filter, todo } = props;
  const filteredTodos = Object.keys(todo).filter(id => {
    return filter === 'all' ||
      (filter === 'completed' && todo[id].completed) ||
      (filter === 'active' && !todo[id].completed);
  });

  return (
    <Stack tokens={todoListStackTokens}>
      {filteredTodos.map(id => (
        <TodoItem key={id} id={id} />
      ))}
    </Stack>
  )
}

const ConnectedTodoList = connect((state: Store) => ({ ...state }))(TodoList);
export { ConnectedTodoList as TodoList };
