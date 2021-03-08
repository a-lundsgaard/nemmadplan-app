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
const Button_1 = __importDefault(require("@material-ui/core/Button"));
//import { DispatchContext } from '../contexts/todos.context';
const todos_context_jsx_1 = require("../../../contexts/todos.context.jsx");
const actions_1 = require("../../../constants/actions");
const modal_1 = __importDefault(require("../modal"));
const styles_1 = require("@material-ui/core/styles");
const useStyles = styles_1.makeStyles((theme) => ({
    salesItemContainer: {
        position: 'static',
        zIndex: "5",
        display: 'block',
        margin: '10px 0 0 4px',
        overflow: 'visible'
    },
    chain: {
        display: 'inline'
    },
    button: {
        color: 'green',
        margin: '10px 0 10px 0'
    }
}));
// test 2
function SalesItem({ item, id }) {
    const hej = 1;
    const classes = useStyles();
    const dispatch = react_1.useContext(todos_context_jsx_1.DispatchContext);
    const [modalOpen, setModalOpen] = react_1.useState(false);
    return (<div key={Math.random()} className={classes.salesItemContainer}>

            <h3 className={classes.chain}>{item.chain}</h3>
            <div><b>{item.price}kr, {item.quantity} {item.unit}</b></div>
            <div><em>{item.title}</em></div>
            <modal_1.default imageSource={item.img}/>
            <Button_1.default onClick={() => dispatch({ type: actions_1.EDIT_TODO, initiator: 'REPLACEMENT_FROM_SALES', id, task: `${item.title} ${item.price}kr, ${item.quantity} ${item.unit}, ${item.chain}` })} className={classes.button} variant='outlined'>Erstat</Button_1.default>
        </div>);
}
exports.default = SalesItem;
