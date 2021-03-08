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
require("./style.css"); // for removing default chrome styles on input elements 
const styles_js_1 = __importDefault(require("./styles.js"));
const actions_1 = require("../../constants/actions");
const todos_context_jsx_1 = require("../../contexts/todos.context.jsx");
function smallNumPicker({ unit, quantity, parentProps }) {
    const classes = styles_js_1.default();
    // const [number, setNubmer] = useState(1);
    const [count, setCount] = react_1.useState(parseFloat(quantity) || 1);
    const [localUnit, setLocalUnit] = react_1.useState(unit || 'stk');
    const [originalUnit, setOriginalUnit] = react_1.useState(unit || 'stk');
    const dispatch = react_1.useContext(todos_context_jsx_1.DispatchContext);
    const handleAccept = () => dispatch({ type: actions_1.EDIT_TODO, ...parentProps, unit: localUnit, quantity: count });
    const decrementCount = (e) => {
        if (count < 1.000001)
            return false;
        setCount(prevCount => prevCount - 1);
        //onChange(count)
        //handleAccept()
    };
    const incrementCount = (e) => {
        //alert(typeof count)
        setCount(prevCount => prevCount + 1);
        // handleAccept()
    };
    const handleChange = (e) => {
        // console.log(e.target.value)
        setCount(parseFloat(e.target.value));
        console.log('Changed');
    };
    // changes the unit based on the count number. E.g. you cant have 100 stk, the unit is changed to gram
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
    // for when adding a meal to shopping list, the count is changed to the countValue of the individual ingredients in the recipe
    react_1.useEffect(() => {
        if (quantity) {
            setCount(quantity);
        }
    }, [quantity]);
    // for making sure to save the original unit
    react_1.useEffect(() => {
        if (unit) {
            setOriginalUnit(unit);
        }
    }, []);
    return (<div className={classes.containerNum} onClick={(e) => e.stopPropagation()}>
      <div className={classes.innerContainer}>
        <div className={classes.triangleUp} onClick={incrementCount}/>
        <span style={{
        display: 'flex' // for aligning count and unit element
    }}>
          <input className={classes.numberInput} onBlur={handleAccept} onChange={handleChange} type="number" name="productQty" value={count} min="1" max="10000"/>
          <span>{localUnit}</span>
        </span>
        <div className={classes.triangleDown} onClick={decrementCount}/>
      </div>
    </div>);
}
exports.default = smallNumPicker;
