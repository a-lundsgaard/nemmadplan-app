import React, {useEffect, useContext} from 'react';
import TodoApp from './TodoApp';
import useStyles from '../styles/AppStyles';

import Paper from '@material-ui/core/Paper';
import { DispatchContext } from '../contexts/todos.context';

import { ADD_INGREDIENT_ARRAY } from '../constants/actions';



function App({ingredientArray}) {
  const classes = useStyles();
  /*const dispatch = useContext(DispatchContext);

  console.log(dispatch)

 // const dispatch = useContext(DispatchContext);

  useEffect(()=>{
   // dispatch(ingredientArray)
   //dispatch({ type: EDIT_TODO, id, task: value });

    dispatch({ type: ADD_INGREDIENT_ARRAY, task: [{name: 'test'}] });

    console.log(ingredientArray);
  }, [ingredientArray])*/
  
  

  return (

    <Paper className={classes.paper} elevation={3}>
      <div className={classes.App}>
        <header className={classes.header}>
          <h1>
            Indkøbsliste
        </h1>
        </header>
        <TodoApp ingredientArray={ingredientArray} />
      </div>
    </Paper>
  );
}

export default App;
