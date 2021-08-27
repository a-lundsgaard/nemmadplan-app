import React, { useEffect, useReducer } from 'react';
import { TodosProvider } from '../contexts/todos.context';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

import Stepper from './stepper/linearStepper';
import Accordion from './shoppingListContainer/shoppingAccordion'


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
