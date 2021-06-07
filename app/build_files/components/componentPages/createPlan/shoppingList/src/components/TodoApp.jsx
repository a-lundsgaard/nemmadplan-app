"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const todos_context_jsx_1 = require("../contexts/todos.context.jsx");
const TodoForm_jsx_1 = __importDefault(require("./TodoForm.jsx"));
const TodoList_jsx_1 = __importDefault(require("./TodoList.jsx"));
const linearStepper_jsx_1 = __importDefault(require("./stepper/linearStepper.jsx"));
const shoppingAccordion_jsx_1 = __importDefault(require("./shoppingListContainer/shoppingAccordion.jsx"));
function TodoApp({ ingredientArray, updateAmountOnIngredients, ingredientsToDelete }) {
    return (<todos_context_jsx_1.TodosProvider ingredientArray={ingredientArray} updateAmountOnIngredients={updateAmountOnIngredients} ingredientsToDelete={ingredientsToDelete}>

      <div style={{
            width: '80%',
            margin: '15px 0 30px 0'
        }}>
        <shoppingAccordion_jsx_1.default>
          <linearStepper_jsx_1.default />
        </shoppingAccordion_jsx_1.default>
      </div>

      <TodoForm_jsx_1.default />
      <TodoList_jsx_1.default />
    </todos_context_jsx_1.TodosProvider>);
}
exports.default = TodoApp;
