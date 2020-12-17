export type FilterTypes = 'all' | 'active' | 'completed';

export interface Task {
  label: string;
  completed: boolean;
}

export interface Store {
  todo: {
    [id: string]: Task;
  };

  filter: FilterTypes;
}
