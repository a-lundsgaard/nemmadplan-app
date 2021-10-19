//import uuid from 'uuid/v4';
//import { uuidv4 } from 'uuid';
import uuidv4 from "uuid/dist/v4";

import {
  NewIngredient,
  StateIngredient,
  IngredientHash
} from "./types"

import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  ADD_INGREDIENT_ARRAY,
  COMPLETE_TODO,
  UNCOMPLETE_TODO,
  ADD_SALES_TO_TODO,
  UPDATE_AMOUNT_OF_INGREDIENTS,
  DELETE_INGREDIENTS
} from '../constants/actions';



const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      let index = 0;
      const duplicate = state.find((obj, i) => {
        if (obj.task === action.task) {
          index === i;
          return true
        }
      })
      if (duplicate) {
        return state;
      } else {
        return [{ id: uuidv4(), task: action.task, quantity: action.quantity || 1, unit: 'stk', completed: false, initiator: 'USER' }, ...state];
      }

    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: true } : todo
      );

    case UNCOMPLETE_TODO:
      console.log('THE REDUCER WAS CALLED')

      return state.map(todo =>
        ({ ...todo, completed: false })
      );
    case EDIT_TODO:
      //const initiator = action.initiator === 'REPLACEMENT_FROM_SALES' ? action.initiator : null;
      console.log('Edit reducer got called')
      return state.map(todo =>
        todo.id === action.id ? { ...todo, task: action.task, initiator: action.initiator, img: action.img, unit: action.unit, quantity: action.quantity } : todo
      );

    case ADD_SALES_TO_TODO:
      //const initiator = action.initiator === 'REPLACEMENT_FROM_SALES' ? action.initiator : null;
      console.log('Edit reducer got called')
      return state.map(todo =>
        todo.id === action.id ? { ...todo, img: action.img } : todo
      );

    case ADD_INGREDIENT_ARRAY:
      return addIngredientArray(action, state)
    case UPDATE_AMOUNT_OF_INGREDIENTS:
      return updateAmountOfProvidedIngredients3(action.task, state);

    case DELETE_INGREDIENTS:
      //console.log('Delete reducer was called')
      return deleteIngredients(action.task, state);

    default:
      return state;
  }
};

export default reducer;




function deleteIngredients(ingredientArrayToDelete, stateArray) {
  /*   console.log('Items to delete', ingredientArrayToDelete);
    console.log('Items to delete2', stateArray); */
  const deletedIngredientsFilteredOut = [];

  stateArray.forEach((oldIngredient) => {
    console.log('Item to delete old', oldIngredient.task);

    const ingredientToDelete = ingredientArrayToDelete.find(ingredient => ingredient.name === oldIngredient.name);
    if (ingredientToDelete) {
      const minusQ = ingredientToDelete.currentQuantity ? ingredientToDelete.currentQuantity : ingredientToDelete.quantity;
      const quantity = oldIngredient.quantity - minusQ;
      if (quantity <= 0 || !oldIngredient.quantity || !ingredientToDelete.quantity) {
        return;
      }
      deletedIngredientsFilteredOut.push({ ...oldIngredient, quantity: quantity });
    } else {
      deletedIngredientsFilteredOut.push(oldIngredient);
    }

  });
  return deletedIngredientsFilteredOut;
}



function updateAmountOfProvidedIngredients3(ingredientArray, stateArray) {
  //console.error('Fandt duplicate ingrediens der skal opdateres: ', stateArray)
  //alert('reducer called')
  const newArr = stateArray.map((oldIngredient) => {
    for (const newIngredient of ingredientArray) {
      console.log('Fandt samme id: ', oldIngredient.name === newIngredient.name, oldIngredient.name)
      //console.log('Fandt samme name: ', oldIngredient.name === newIngredient.name)
      console.log('Fandt sammenligning: ', oldIngredient.task, newIngredient.task)

      if (oldIngredient.task === newIngredient.task) {
        console.log('Fandt duplicate ingrediens der skal opdateres: ', oldIngredient, newIngredient)
        return { ...oldIngredient, quantity: oldIngredient.quantity + newIngredient.diff }
      }
    }
    return oldIngredient;
  });
  return newArr;
}


function addIngredientArray(action: any, state: StateIngredient[]) {
  const originalArray = state;
  const newIngredientArrayToAdd: Array<NewIngredient> = action.task;
  const stateArrayHash = originalArray.reduce((a, n, i) => {
    a[n.task] = { task: n.task, index: i }
    return a;
  }, {} as IngredientHash);
  newIngredientArrayToAdd.forEach((newIngredient) => {
    const foundDuplicate = stateArrayHash[newIngredient.name];
    if (foundDuplicate) {
      const duplicateIndex = foundDuplicate.index;
      const duplicateInStateArray = originalArray[duplicateIndex];
      const q1 = duplicateInStateArray.quantity || 1; // if no quantity assigns one as quantity, so the quantity also increases when a duplicate is found
      const q2 = newIngredient.quantity || 1;
      originalArray[duplicateIndex] = { ...duplicateInStateArray, quantity: q1 + q2 }
    } else {
      originalArray.push({
        ...newIngredient, // id, quantity etc.
        task: newIngredient.name,
        unit: newIngredient.unit && newIngredient.unit.replace('*', ''),
        completed: false,
      })
    }
  })
  return originalArray;
}