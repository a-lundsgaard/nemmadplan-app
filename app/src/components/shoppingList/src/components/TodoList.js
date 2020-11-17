import zIndex from '@material-ui/core/styles/zIndex';
import React, { useContext, useEffect, useState } from 'react';
import { TodosContext, DispatchContext } from '../contexts/todos.context';
import Todo from './Todo';



function TodoList() {

  const todos = useContext(TodosContext);
  console.log(todos)

  return (
    <ul style={{ paddingLeft: 10, width: "95%" }}>
      {todos.map((todo, index )=> (
        <Todo key={todo.id} {...todo} />
      ))}
    </ul>
  );
}

export default TodoList;
