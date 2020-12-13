import React, {useEffect, useReducer} from 'react';
import { TodosProvider } from '../contexts/todos.context';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

import Stepper from './stepper/linearStepper';


function TodoApp({ingredientArray}) {

  return (
    <TodosProvider ingredientArray={ingredientArray}>
      <Stepper/>
      <TodoForm/>
      <TodoList/>
    </TodosProvider>
  );
}

export default TodoApp;
