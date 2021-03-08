"use strict";
/* const obj = { name: 'salt', data: {unit: 'stk', quantity: 2} }

const obj2 = { name: 'peber', data: {unit: 'stk', quantity: 2} }

const obj3 = { name: 'blommer', data: {unit: 'gram', quantity: 500} } */
const obj = { name: 'salt', unit: 'stk', quantity: 2 };
const obj2 = { name: 'peber', unit: 'stk', quantity: 2 };
const obj3 = { name: 'blommer', unit: 'gram', quantity: 500 };
const taskArray = [obj, obj2, obj3];
const newObj1 = { name: 'mælk', unit: 'stk', quantity: 2 };
const newObj2 = { name: 'peber', unit: 'stk', quantity: 2 };
const newObj3 = { name: 'blommer', unit: 'gram', quantity: 500 };
const newTaskArrayToAdd = [newObj2, newObj3, newObj1];
const ingredientArrayMasterObject = taskArray.reduce((a, n) => {
    a[n.name] = n;
    return a;
}, {});
console.log(ingredientArrayMasterObject);
/* const findIndexToChange = (keyToFind, masterObj, arr, objToInsert) =>  {
    const index = Object.keys(masterObj).indexOf(keyToFind);
    return arr.splice(index, 1, objToInsert)
} */
newTaskArrayToAdd.forEach((newIngredient) => {
    let foundDuplicate = ingredientArrayMasterObject[newIngredient.name];
    if (foundDuplicate) {
        ingredientArrayMasterObject[newIngredient.name] = { ...foundDuplicate, quantity: foundDuplicate.quantity + newIngredient.quantity };
    }
    else {
        ingredientArrayMasterObject[newIngredient.name] = newIngredient;
    }
});
console.log(ingredientArrayMasterObject);
const newTaskArray = Object.keys(ingredientArrayMasterObject).map(key => ingredientArrayMasterObject[key]);
console.log(newTaskArray);
