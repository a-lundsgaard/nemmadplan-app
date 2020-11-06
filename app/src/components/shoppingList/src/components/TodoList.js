import React, { useContext } from 'react';
import { TodosContext, DispatchContext } from '../contexts/todos.context';
import Todo from './Todo';

function TodoList({ingredientArray, onChange}) {


  const todos = useContext(TodosContext);


  //items(todos)

  console.log(todos)

  return (
    <ul style={{ paddingLeft: 10, width: "95%" }}>
      {todos.map(todo => (
        <Todo key={todo.id} {...todo} />
      ))}
    </ul>
  );
}

export default TodoList;
