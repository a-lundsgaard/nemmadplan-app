//import uuid from 'uuid/v4';
//import { uuidv4 } from 'uuid';
import uuidv4 from "uuid/dist/v4";
import { useReducer } from "react";


import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  ADD_INGREDIENT_ARRAY
} from '../constants/actions';

const reducer= (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ id: uuidv4(), task: action.task, completed: false, initiator: 'USER' }, ...state];
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case EDIT_TODO:
      //const initiator = action.initiator === 'REPLACEMENT_FROM_SALES' ? action.initiator : null;
      return state.map(todo =>
        todo.id === action.id ? { ...todo, task: action.task, initiator: action.initiator } : todo
      );
    case ADD_INGREDIENT_ARRAY: 
        console.log('THE REDUCER WAS CALLED')
        return [...state, ...action.task.map((ingr, index) => ({id: uuidv4(), task: `${ingr.quantity} ${ingr.unit} ${ingr.name}`, completed: false }) )]
    default:
      return state;
  }
};


export default reducer;
