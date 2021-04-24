"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosProvider = exports.DispatchContext = exports.TodosContext = void 0;
const react_1 = __importStar(require("react"));
const todos_reducer_jsx_1 = __importDefault(require("../reducers/todos.reducer.jsx"));
const actions_1 = require("../constants/actions");
const defaultItems = [
    { id: '1', task: 'rugbrød', completed: false, initiator: 'USER', unit: 'stk', quantity: 1 },
    { id: '2', task: 'mælk', completed: false, initiator: 'USER', unit: 'stk', quantity: 1 },
    { id: '3', task: 'æbler', completed: false, initiator: 'USER', unit: 'stk', quantity: 1 }
];
const storeTodosToRedux = sale => {
    window.store.dispatch({ type: 'SALES', data: sale });
};
exports.TodosContext = react_1.createContext();
exports.DispatchContext = react_1.createContext();
function TodosProvider(props) {
    const [todos, dispatch] = react_1.useReducer(todos_reducer_jsx_1.default, defaultItems);
    // For storing shopping list state in localstorage
    /* const [todos, dispatch] = useLocalStorageReducer(
       'shoppingList',
       todosReducer,
       defaultItems
     )*/
    react_1.useEffect(() => {
        // storing shopping list items to redux. The sidebar containing the shoppinglist uses the first sale-image of every item and displays it in the sidebar
        storeTodosToRedux(todos);
    }, [todos]);
    // For adding ingredients to shoppinglist when adding dish to meal plan programatically 
    react_1.useEffect(() => {
        if (props.ingredientArray) {
            dispatch({ type: actions_1.ADD_INGREDIENT_ARRAY, task: props.ingredientArray });
        }
    }, [props.ingredientArray]);
    react_1.useEffect(() => {
        if (props.updateAmountOnIngredients.length) {
            //alert('Trying to update amount')
            //console.log('Found ingredients to change:  ', props.updateAmountOnIngredients)
            dispatch({ type: actions_1.UPDATE_AMOUNT_OF_INGREDIENTS, task: props.updateAmountOnIngredients });
        }
    }, [props.updateAmountOnIngredients]);
    react_1.useEffect(() => {
        if (props.ingredientsToDelete.length) {
            //alert('Trying to update amount')
            dispatch({ type: actions_1.DELETE_INGREDIENTS, task: props.ingredientsToDelete });
            console.log('Found ingredients to delete:  ', props.ingredientsToDelete);
        }
    }, [props.ingredientsToDelete]);
    return (<exports.TodosContext.Provider value={todos}>
      <exports.DispatchContext.Provider value={dispatch}>
        {props.children}
      </exports.DispatchContext.Provider>
    </exports.TodosContext.Provider>);
}
exports.TodosProvider = TodosProvider;
