"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TodoApp_jsx_1 = __importDefault(require("./TodoApp.jsx"));
const AppStyles_1 = __importDefault(require("../styles/AppStyles"));
function App({ ingredientArray, updateAmountOnIngredients }) {
    const classes = AppStyles_1.default();
    return (<div className={classes.App}>
        <header className={classes.header}>
          <h1>Min liste</h1>
        </header>
        <TodoApp_jsx_1.default ingredientArray={ingredientArray} updateAmountOnIngredients={updateAmountOnIngredients}/>
      </div>);
}
exports.default = App;
