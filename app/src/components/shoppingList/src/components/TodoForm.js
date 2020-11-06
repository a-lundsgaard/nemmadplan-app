import React, { useContext, useEffect } from 'react';
import { DispatchContext } from '../contexts/todos.context';
import useInputState from '../hooks/useInputState';
import useStyles from '../styles/TodoFormStyles';
import { ADD_TODO, ADD_INGREDIENT_ARRAY } from '../constants/actions';
import TextField from '@material-ui/core/TextField';


function TodoForm({ingredientArray}) {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const [value, handleChange, clearValue] = useInputState('');

 // import { ADD_INGREDIENT_ARRAY } from '../constants/actions';


  console.log(dispatch)

  // const dispatch = useContext(DispatchContext);
 
   useEffect(()=>{
    // dispatch(ingredientArray)
    //dispatch({ type: EDIT_TODO, id, task: value });
 
     dispatch({ type: ADD_INGREDIENT_ARRAY, task: ingredientArray });
 
     console.log(ingredientArray);
   }, [ingredientArray])
   

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch({ type: ADD_TODO, task: value });
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
