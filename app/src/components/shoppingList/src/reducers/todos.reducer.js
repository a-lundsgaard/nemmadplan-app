//import uuid from 'uuid/v4';
//import { uuidv4 } from 'uuid';
import uuidv4 from "uuid/dist/v4";

import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  ADD_INGREDIENT_ARRAY
} from '../constants/actions';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ id: uuidv4(), task: action.task, completed: false }, ...state];
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, task: action.task } : todo
      );
    case ADD_INGREDIENT_ARRAY: 
        return [...action.task.map(ingr => ({id: uuidv4(), task: ingr.name, completed: false }) ), ...state]
    default:
      return state;
  }
};

export default reducer;
