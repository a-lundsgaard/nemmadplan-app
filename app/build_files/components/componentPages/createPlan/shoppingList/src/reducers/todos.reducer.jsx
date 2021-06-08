"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/dist/v4"));
const actions_1 = require("../constants/actions");
const reducer = (state, action) => {
    switch (action.type) {
        case actions_1.ADD_TODO:
            let index = 0;
            const duplicate = state.find((obj, i) => {
                if (obj.task === action.task) {
                    index === i;
                    return true;
                }
            });
            if (duplicate) {
                return state;
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
            console.log('Edit reducer got called');
            return state.map(todo => todo.id === action.id ? { ...todo, task: action.task, initiator: action.initiator, img: action.img, unit: action.unit, quantity: action.quantity } : todo);
        case actions_1.ADD_SALES_TO_TODO:
            console.log('Edit reducer got called');
            return state.map(todo => todo.id === action.id ? { ...todo, img: action.img } : todo);
        case actions_1.ADD_INGREDIENT_ARRAY:
            console.log('THE REDUCER WAS CALLED');
            const newIngredientArrayToAdd = action.task.map((ingr, index) => ({
                ...ingr,
                task: `${ingr.name}`,
                unit: ingr.unit && ingr.unit.replace('*', ''),
                completed: false,
            }));
            const ingredientArrayAsObject = state.reduce((a, n) => {
                a[n.task] = n;
                return a;
            }, {});
            newIngredientArrayToAdd.forEach((newIngredient) => {
                const foundDuplicate = ingredientArrayAsObject[newIngredient.task];
                const q2 = newIngredient.quantity || 1;
                if (foundDuplicate) {
                    console.log('Duplicate: ', foundDuplicate);
                    const q1 = foundDuplicate.quantity || 1;
                    ingredientArrayAsObject[newIngredient.task] = { ...foundDuplicate, quantity: q1 + q2 };
                    console.log('New object: ', ingredientArrayAsObject[newIngredient.task]);
                }
                else {
                    ingredientArrayAsObject[newIngredient.task] = newIngredient;
                }
            });
            const newState = Object.keys(ingredientArrayAsObject).map(key => ingredientArrayAsObject[key]);
            return newState;
        case actions_1.UPDATE_AMOUNT_OF_INGREDIENTS:
            return updateAmountOfProvidedIngredients3(action.task, state);
        case actions_1.DELETE_INGREDIENTS:
            return deleteIngredients(action.task, state);
        default:
            return state;
    }
};
exports.default = reducer;
function deleteIngredients(ingredientArrayToDelete, stateArray) {
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
    return deletedIngredientsFilteredOut;
}
function updateAmountOfProvidedIngredients3(ingredientArray, stateArray) {
    const newArr = stateArray.map((oldIngredient) => {
        for (const newIngredient of ingredientArray) {
            if (oldIngredient.id === newIngredient.id) {
                console.log('Fandt duplicate ingrediens der skal opdateres: ' + oldIngredient.name);
                return { ...oldIngredient, quantity: newIngredient.quantity };
            }
        }
        return oldIngredient;
    });
    return newArr;
}
