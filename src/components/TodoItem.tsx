import React from 'react'
import { IStore } from '../store'
import { connect } from 'react-redux'
import { Stack, Checkbox, IconButton, TextField, DefaultButton } from '@fluentui/react';
import { actions } from '../actions';

interface ITodoItemProps {
  id: string;
  todos: IStore['todos'];
  complete: (id: string) => void;
  remove: (id: string) => void;
  edit: (id: string, label: string | undefined) => void;
}

interface ITodoItemState {
  editing: boolean;
  editLabel: string | undefined;
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props: ITodoItemProps) {
    super(props);
    this.state = { editing: false, editLabel: '' };
  }
  
  render() {
    const { id, todos, complete, remove } = this.props;

    const item = todos[id];

    return (
      <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
        {!this.state.editing && (
          <>
            <Checkbox label={item.label} checked={item.completed} onChange={() => complete(id)} />
            <div>
              <IconButton iconProps={{ iconName: 'Edit' }} onClick={this.onEdit} />
              <IconButton iconProps={{ iconName: 'Cancel' }} onClick={() => remove(id)} />
            </div>
          </>
        )}

        {this.state.editing && (
          <Stack.Item grow>
            <Stack horizontal gap={10}>
              <Stack.Item grow>
                <TextField value={this.state.editLabel} onChange={this.onChange} />
              </Stack.Item>
              <DefaultButton onClick={this.onDoneEdit}>Save</DefaultButton>
            </Stack>
          </Stack.Item>
        )}
      </Stack>
    );
  }

  private onEdit = () => {
    const { id, todos } = this.props;
    const { label } = todos[id];

    this.setState({
      editing: true,
      editLabel: this.state.editLabel || label
    });
  };

  private onDoneEdit = () => {
    this.props.edit(this.props.id, this.state.editLabel);
    this.setState({
      editing: false,
      editLabel: ''
    });
  };

  private onChange = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => {
    this.setState({ editLabel: newValue });
  };
}

const ConnectedTodoListItem = connect(
  (state: IStore) => ({ todos: state.todos }),
  dispatch => ({
    complete: (id: any) => dispatch(actions.complete(id)),
    remove: (id: any) => dispatch(actions.remove(id)),
    edit: (id: any, label: any) => dispatch(actions.edit(id, label))
  })
)(TodoItem);

export { ConnectedTodoListItem as TodoItem };
