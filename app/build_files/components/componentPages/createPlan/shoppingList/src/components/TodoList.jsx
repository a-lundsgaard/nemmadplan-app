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
const react_1 = __importStar(require("react"));
const todos_context_jsx_1 = require("../contexts/todos.context.jsx");
const Todo_jsx_1 = __importDefault(require("./Todo.jsx"));
function TodoList() {
    const todos = react_1.useContext(todos_context_jsx_1.TodosContext);
    return (<ul style={{ paddingLeft: 10, width: "95%", overflowY: 'scroll', maxHeight: 'calc(75vh - 50px - 50px)' }}>
      {
    /*     todos.map((todo, index) => (
          <Todo key={index+300} {...todo} />
        )) */
    todos.map((todo, index) => {
        return <Todo_jsx_1.default key={todo.task} {...todo}/>;
    })}
    </ul>);
}
exports.default = TodoList;
