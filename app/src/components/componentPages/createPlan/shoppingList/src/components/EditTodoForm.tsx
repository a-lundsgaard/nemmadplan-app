import React, { useContext, useEffect } from 'react';
import { DispatchContext } from '../contexts/todos.context.jsx';
import useInputState from '../hooks/useInputState.jsx';
import useStyles from '../styles/EditTodoFormStyles.js';
import { EDIT_TODO } from '../constants/actions';
import TextField from '@material-ui/core/TextField';


import useToggleState from '../hooks/useToggleState.jsx';

function EditTodoForm({ id, task, toggleEditForm, restOfTask: restOfProperties }) {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const [value, handleChange, clearValue] = useInputState(task);

  const [isEditing, toggle] = useToggleState(false);

/*   useEffect(()=> {
    console.log(restOfTask)
  }, [restOfTask]) */


  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch({ type: EDIT_TODO, ...restOfProperties, id, task: value, initiator: 'USER' });
        toggleEditForm();
        clearValue();
      }}
      className={classes.EditTodoForm}
    >
      <TextField
      variant={'standard'}
        autoFocus
        value={value}
        onChange={handleChange}
        onClick={e => e.stopPropagation()}
        className={classes.input}
      />
    </form>
  );
}

export default EditTodoForm;
