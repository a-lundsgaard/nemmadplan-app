import React, { createContext, useEffect, useReducer } from 'react';
import todosReducer from '../reducers/todos.reducer';

import { ADD_INGREDIENT_ARRAY, EDIT_TODO } from '../constants/actions';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';


const defaultItems = [
  { id: '1', task: 'rugbrød', completed: false, initiator: 'USER', unit: 'stk', quantity: 1 },
  { id: '2', task: 'mælk', completed: false, initiator: 'USER', unit: 'stk', quantity: 1 },
  { id: '3', task: 'æbler', completed: false, initiator: 'USER', unit: 'stk', quantity: 1  }
];

const storeTodosToRedux = sale => {
  window.store.dispatch({type: 'SALES', data: sale})
}

export const TodosContext = createContext();
export const DispatchContext = createContext();


export function TodosProvider(props) {

  const [todos, dispatch] = useReducer(todosReducer, defaultItems)

  // For storing shopping list state in localstorage
 /* const [todos, dispatch] = useLocalStorageReducer(
    'shoppingList',
    todosReducer,
    defaultItems
  )*/

  useEffect(() => {
   // if (!todos.length) {
     // storing shopping list items to redux. The sidebar containing the shoppinglist uses the first sale-image of every item and displays it in the sidebar
    // storeTodosToRedux(defaultItems)
 //   } else {
      storeTodosToRedux(todos)
   // }
  }, [todos])


  // For adding ingredients to shoppinglist when adding dish to meal plan programatically 
  useEffect(() => {
    if (props.ingredientArray) {
      dispatch({ type: ADD_INGREDIENT_ARRAY, task: props.ingredientArray });
    }
  }, [props.ingredientArray?.length])


  return (
    <TodosContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
}
