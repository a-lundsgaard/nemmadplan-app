import React, { useEffect, useReducer } from 'react';
import { TodosProvider } from '../contexts/todos.context.jsx';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList.jsx';

import Stepper from './stepper/linearStepper.jsx';
import Accordion from './shoppingListContainer/shoppingAccordion.jsx'


function TodoApp({ ingredientArray, updateAmountOnIngredients, ingredientsToDelete, defaultItems}) {

  return (
    <TodosProvider ingredientArray={ingredientArray} updateAmountOnIngredients={updateAmountOnIngredients} ingredientsToDelete={ingredientsToDelete} defaultItems={defaultItems} >

      <div style={{
        width: '80%',
        margin: '15px 0 30px 0'
      }}>
        <Accordion>
          <Stepper />
        </Accordion>
      </div>

      <TodoForm />
      <TodoList />
    </TodosProvider>
  );
}

export default TodoApp;
