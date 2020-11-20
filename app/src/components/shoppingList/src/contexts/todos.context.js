import React, { createContext, useEffect, useReducer } from 'react';
import todosReducer from '../reducers/todos.reducer';

import { ADD_INGREDIENT_ARRAY } from '../constants/actions';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';


const defaultItems = [
  { id: '1', task: 'rugbrød', completed: false },
  { id: '2', task: 'mælk', completed: false },
  { id: '3', task: 'æbler', completed: false }
];

export const TodosContext = createContext();
export const DispatchContext = createContext();

export function TodosProvider(props) {

  const [todos, dispatch] = useReducer(todosReducer, defaultItems)

 /* const [todos, dispatch] = useLocalStorageReducer(
    'shoppingList',
    todosReducer,
    defaultItems
  )*/

  useEffect(() => {
    if (props.ingredientArray) {
      dispatch({ type: ADD_INGREDIENT_ARRAY, task: props.ingredientArray });
    }
  }, [props.ingredientArray])


  return (
    <TodosContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
}
