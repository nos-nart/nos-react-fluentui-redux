import { v4 as uuidv4 } from 'uuid';
import { TYPES } from '../constants/todo';

export const todoActions = {
  add: (label: string) => ({ type: TYPES.ADD, id: uuidv4(), label }),
  remove: (id: string) => ({ type: TYPES.REMOVE, id }),
  complete: (id: string) => ({ type: TYPES.COMPLETE, id }),
  clear: () => ({ type: TYPES.CLEAR }),
  setFilter: (filter: string) => ({ type: TYPES.SET_FILTER, filter }),
  edit: (id: string, label: string) => ({ type: TYPES.EDIT, id, label })
};
