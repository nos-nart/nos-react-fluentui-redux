export type FilterTypes = 'all' | 'active' | 'completed';

export interface ITask {
  label: string;
  completed: boolean;
}

export interface IStore {
  todos: {
    [id: string]: ITask;
  };

  filter: FilterTypes;
}
