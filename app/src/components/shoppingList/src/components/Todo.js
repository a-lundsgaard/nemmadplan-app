import React, { useContext, memo } from 'react';
import { DispatchContext } from '../contexts/todos.context';
import EditTodoForm from './EditTodoForm';
import useToggleState from '../hooks/useToggleState';
import useStyles from '../styles/TodoStyles.js';
import { REMOVE_TODO, TOGGLE_TODO } from '../constants/actions';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import IconButton from '@material-ui/core/IconButton';



function Todo({ id, task, completed }) {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const [isEditing, toggle] = useToggleState(false);

  if (isEditing) {
    return (
      <li
        className={classes.Todo}
        style={{ overflowY: 'hidden' }}
        onClick={() => toggle()}
        onBlur={()=> toggle()}
      >
        <EditTodoForm id={id} task={task} toggleEditForm={toggle} />
      </li>
    );
  }

  return (
    <li
      className={classes.Todo}
      onClick={() => {
        //dispatch({ type: TOGGLE_TODO, id }); // til udstregning af ingrediens
        toggle()
      }}
    >
      <span
        style={{
          textDecoration: completed ? 'line-through' : '',
          color: completed ? '#bdc3c7' : '#34495e'
        }}

      >
        {task}
      </span>
      <div className={classes.icons}>
        <DeleteIcon
          style={{ color: '#c0392b' }}
          className="fas fa-trash"
          onClick={e => {
            e.stopPropagation();
            dispatch({ type: REMOVE_TODO, id });
          }}
        />
        <EditIcon
          style={{ color: '#58b2dc' }}
          className="fas fa-pen"
          onClick={e => {
            e.stopPropagation();
            toggle();
          }}
        />
      </div>
    </li>
  );
}

export default memo(Todo);
