import React, {useEffect, useReducer} from 'react';
import { TodosProvider } from '../contexts/todos.context';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoApp({ingredientArray}) {

  return (
    <TodosProvider ingredientArray={ingredientArray}>
      <TodoForm/>
      <TodoList/>
    </TodosProvider>
  );
}

export default TodoApp;
