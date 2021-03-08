import React, { useContext, useEffect } from 'react';
import { DispatchContext } from '../contexts/todos.context.jsx';
import useInputState from '../hooks/useInputState.jsx';
import useStyles from '../styles/TodoFormStyles';
import { ADD_TODO, ADD_INGREDIENT_ARRAY } from '../constants/actions';
import TextField from '@material-ui/core/TextField';


function TodoForm() {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const [value, handleChange, clearValue] = useInputState('');

  
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch({ type: ADD_TODO, task: value, quantity: 1 });
        clearValue();
      }}
      className={classes.TodoForm}
    >
      <TextField
        placeholder="Tilføj varer..."
        value={value}
        onChange={handleChange}
        className={classes.input}
      />
    </form>
  );
}

export default TodoForm;
