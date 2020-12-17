import React from 'react';
import { Stack, IStackTokens } from '@fluentui/react';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';
import { TodoFooter } from './TodoFooter';

const todoStackTokens: IStackTokens = { childrenGap: 10 };

export const TodoApp = () => {
  return (
    <Stack horizontalAlign="center">
      <Stack style={{ width: 400 }} tokens={todoStackTokens}>
        <TodoHeader/>
        <TodoList />
        <TodoFooter />
      </Stack>
    </Stack>
  )
}
