import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducers/todo';

export const store = configureStore({
  reducer,
})
