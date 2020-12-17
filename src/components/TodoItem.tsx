import React from 'react'
import { Store } from '../redux/store/index'
import { connect } from 'react-redux'
import { Stack, Checkbox, IconButton, TextField, DefaultButton } from '@fluentui/react';
import { todoActions } from '../redux/actions/todo';

interface ITodoItemProps {
  id: string;
  todo: Store['todo'];
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

  private onEdit = () => {
    const { id, todo } = this.props;
    const { label } = todo[id];

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
  
  render() {
    const { id, todo, complete, remove } = this.props;

    const item = todo[id];

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
}

const ConnectedTodoListItem = connect(
  (state: Store) => ({ todo: state.todo }),
  dispatch => ({
    complete: (id: any) => dispatch(todoActions.complete(id)),
    remove: (id: any) => dispatch(todoActions.remove(id)),
    edit: (id: any, label: any) => dispatch(todoActions.edit(id, label))
  })
)(TodoItem);

export { ConnectedTodoListItem as TodoItem };
