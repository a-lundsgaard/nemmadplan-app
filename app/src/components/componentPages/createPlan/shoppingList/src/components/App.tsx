import React, { useEffect, useContext } from 'react';
import TodoApp from './TodoApp';
import useStyles from '../styles/AppStyles';
import Paper from '@material-ui/core/Paper';
//import Stepper from 'Components/stepper/linearStepper'

import Stepper from './stepper/linearStepper';



function App({ ingredientArray, updateAmountOnIngredients, ingredientsToDelete, defaultItems, ...props }) {
  const classes = useStyles();

  return (

      <div className={classes.App}>
       { !props.excludeTitle && <header className={classes.header}>
          <h1>Min liste</h1>
        </header> 
        }
        <TodoApp ingredientArray={ingredientArray} updateAmountOnIngredients={updateAmountOnIngredients} ingredientsToDelete={ingredientsToDelete} defaultItems={defaultItems} />
      </div>
  );
}

export default App;
