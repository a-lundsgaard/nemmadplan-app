"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import uuid from 'uuid/v4';
//import { uuidv4 } from 'uuid';
const v4_1 = __importDefault(require("uuid/dist/v4"));
const actions_1 = require("../constants/actions");
const reducer = (state, action) => {
    switch (action.type) {
        case actions_1.ADD_TODO:
            /*let index = 0;
              const duplicate = state.find((obj, i) => {
                if (obj.task === action.task) {
                  index === i;
                  return true
                }
              }) || 0;
        
              
              if (duplicate) {
                //alert(JSON.stringify(duplicate));
                const duplicateObject = state[index];
                state[index] =  {...duplicateObject, quantity: 2 }
                return state;
              } */
            //const duplicate = state.find((obj, i) => obj.task === action.task);
            let index = 0;
            const duplicate = state.find((obj, i) => {
                if (obj.task === action.task) {
                    index === i;
                    return true;
                }
            });
            if (duplicate) {
                //const newArr = state;
                //const duplicateObject = newArr[index];
                //state.splice(index, 1, { ...duplicate, quantity: 2 })
                //newArr[index] = { ...duplicateObject, quantity: 2 }
                return state;
                //return state
            }
            else {
                return [{ id: v4_1.default(), task: action.task, quantity: action.quantity || 1, unit: 'stk', completed: false, initiator: 'USER' }, ...state];
            }
        case actions_1.REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id);
        case actions_1.TOGGLE_TODO:
            return state.map(todo => todo.id === action.id ? { ...todo, completed: !todo.completed } : todo);
        case actions_1.COMPLETE_TODO:
            return state.map(todo => todo.id === action.id ? { ...todo, completed: true } : todo);
        case actions_1.UNCOMPLETE_TODO:
            console.log('THE REDUCER WAS CALLED');
            return state.map(todo => ({ ...todo, completed: false }));
        case actions_1.EDIT_TODO:
            //const initiator = action.initiator === 'REPLACEMENT_FROM_SALES' ? action.initiator : null;
            console.log('Edit reducer got called');
            return state.map(todo => todo.id === action.id ? { ...todo, task: action.task, initiator: action.initiator, img: action.img, unit: action.unit, quantity: action.quantity } : todo);
        case actions_1.ADD_SALES_TO_TODO:
            //const initiator = action.initiator === 'REPLACEMENT_FROM_SALES' ? action.initiator : null;
            console.log('Edit reducer got called');
            return state.map(todo => todo.id === action.id ? { ...todo, img: action.img } : todo);
        case actions_1.ADD_INGREDIENT_ARRAY:
            console.log('THE REDUCER WAS CALLED');
            //return handleDuplicatesAndAddIngredients2(action.task, state);
            // the array of new objects added from a meal
            const newIngredientArrayToAdd = action.task.map((ingr, index) => ({
                ...ingr,
                task: `${ingr.name}`,
                unit: ingr.unit && ingr.unit.replace('*', ''),
                completed: false,
            }));
            //return [...state, ...newIngredientArrayToAdd ]
            // makes an object from the state to make duplicate lookups
            const ingredientArrayAsObject = state.reduce((a, n) => {
                a[n.task] = n;
                return a;
            }, {});
            // make duplicate lookups in the master object and adds quantity to duplicate item object, or adds the item to the master object if no duplicate
            newIngredientArrayToAdd.forEach((newIngredient) => {
                const foundDuplicate = ingredientArrayAsObject[newIngredient.task];
                const q2 = newIngredient.quantity || 1;
                if (foundDuplicate) {
                    console.log('Duplicate: ', foundDuplicate);
                    const q1 = foundDuplicate.quantity || 1; // if no quantity assigns one as quantity, so the quantity also increases when a duplicate is found
                    ingredientArrayAsObject[newIngredient.task] = { ...foundDuplicate, quantity: q1 + q2 };
                    console.log('New object: ', ingredientArrayAsObject[newIngredient.task]);
                }
                else {
                    ingredientArrayAsObject[newIngredient.task] = newIngredient;
                }
            });
            // changes the object back to an array again and returns it
            const newState = Object.keys(ingredientArrayAsObject).map(key => ingredientArrayAsObject[key]);
            return newState;
        case actions_1.UPDATE_AMOUNT_OF_INGREDIENTS:
            return updateAmountOfProvidedIngredients3(action.task, state);
        case actions_1.DELETE_INGREDIENTS:
            //console.log('Delete reducer was called')
            return deleteIngredients(action.task, state);
        default:
            return state;
    }
};
exports.default = reducer;
function deleteIngredients(ingredientArrayToDelete, stateArray) {
    /*   console.log('Items to delete', ingredientArrayToDelete);
      console.log('Items to delete2', stateArray); */
    const deletedIngredientsFilteredOut = [];
    stateArray.forEach((oldIngredient) => {
        console.log('Item to delete old', oldIngredient.task);
        const ingredientToDelete = ingredientArrayToDelete.find(ingredient => ingredient.name === oldIngredient.name);
        if (ingredientToDelete) {
            const quantity = oldIngredient.quantity - ingredientToDelete.quantity;
            if (quantity <= 0 || !oldIngredient.quantity || !ingredientToDelete.quantity) {
                return;
            }
            deletedIngredientsFilteredOut.push({ ...oldIngredient, quantity: quantity });
        }
        else {
            deletedIngredientsFilteredOut.push(oldIngredient);
        }
    });
    //console.log('Fandt filter: ', deletedIngredientsFilteredOut)
    return deletedIngredientsFilteredOut;
}
function updateAmountOfProvidedIngredients3(ingredientArray, stateArray) {
    console.error('REDUCER CALLED');
    //alert('reducer called')
    const newArr = stateArray.map((oldIngredient) => {
        for (const newIngredient of ingredientArray) {
            if (oldIngredient.id === newIngredient.id) {
                return { ...oldIngredient, quantity: newIngredient.quantity };
            }
        }
        return oldIngredient;
    });
    return newArr;
}
