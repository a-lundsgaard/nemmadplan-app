import React from 'react';
import { TodosProvider } from '../contexts/todos.context';
import TodoForm from './TodoForm';
import TodoList from './TodoList';


function TodoApp({ingredientArray}) {
  return (
    <TodosProvider>
      <TodoForm ingredientArray={ingredientArray} />
      <TodoList />
    </TodosProvider>
  );
}

export default TodoApp;
