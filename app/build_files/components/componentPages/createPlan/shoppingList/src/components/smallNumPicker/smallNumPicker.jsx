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
require("./style.css");
const styles_js_1 = __importDefault(require("./styles.js"));
const actions_1 = require("../../constants/actions");
const todos_context_jsx_1 = require("../../contexts/todos.context.jsx");
function smallNumPicker({ unit, quantity, parentProps }) {
    const classes = styles_js_1.default();
    const [count, setCount] = react_1.useState(parseFloat(quantity) || 1);
    const [localUnit, setLocalUnit] = react_1.useState(unit || 'stk');
    const [originalUnit, setOriginalUnit] = react_1.useState(unit || 'stk');
    const dispatch = react_1.useContext(todos_context_jsx_1.DispatchContext);
    const handleAccept = () => dispatch({ type: actions_1.EDIT_TODO, ...parentProps, unit: localUnit, quantity: count });
    const decrementCount = (e) => {
        if (count < 1.000001)
            return false;
        setCount(prevCount => prevCount - 1);
    };
    const incrementCount = (e) => {
        setCount(prevCount => prevCount + 1);
    };
    const handleChange = (e) => {
        setCount(parseFloat(e.target.value));
        console.log('Changed');
    };
    react_1.useEffect(() => {
        if (count < 10 && originalUnit === 'stk') {
            setLocalUnit(originalUnit);
        }
        else {
            if (originalUnit === 'stk') {
                setLocalUnit('gram');
            }
            else {
                setLocalUnit(originalUnit);
            }
        }
        handleAccept();
    }, [count]);
    react_1.useEffect(() => {
        if (quantity) {
            setCount(quantity);
        }
    }, [quantity]);
    react_1.useEffect(() => {
        if (unit) {
            setOriginalUnit(unit);
        }
    }, []);
    return (<div className={classes.containerNum} onClick={(e) => e.stopPropagation()}>
      <div className={classes.innerContainer}>
        <div className={classes.triangleUp} onClick={incrementCount}/>
        <span style={{
            display: 'flex'
        }}>
          <input className={classes.numberInput} onBlur={handleAccept} onChange={handleChange} type="number" name="productQty" value={Math.round(count * 100) / 100} min="1" max="10000"/>
          <span>{localUnit}</span>
        </span>
        <div className={classes.triangleDown} onClick={decrementCount}/>
      </div>
    </div>);
}
exports.default = smallNumPicker;
