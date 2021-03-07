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
const styles_1 = __importDefault(require("./styles"));
const Person_1 = __importDefault(require("@material-ui/icons/Person"));
function smallNumPicker({ countValue, unit, quantity, onCountChange, listId }) {
    const classes = styles_1.default();
    // const [number, setNubmer] = useState(1);
    const [count, setCount] = react_1.useState(quantity || 1);
    const [localUnit, setLocalUnit] = react_1.useState(unit || 'stk');
    const decrementCount = (e) => {
        if (count < 2)
            return false;
        setCount(prevCount => prevCount - 1);
        //onChange(count)
    };
    const incrementCount = (e) => {
        setCount(prevCount => prevCount + 1);
        // onCha
    };
    const handleChange = (e) => {
        // console.log(e.target.value)
        setCount(e.target.value);
        /*     const changeUnit = e.target.value > 10 ? 'gram' : unit || 'stk';
            setLocalUnit(changeUnit) */
        console.log('Changed');
    };
    /*   const handleAccept = () =>
        onUnitOrCountChange({
          unit: localUnit,
          count: count
        }) */
    react_1.useEffect(() => {
        if (countValue) {
            setCount(countValue);
        }
    }, [countValue]);
    react_1.useEffect(() => {
        if (onCountChange) {
            onCountChange({
                count,
                listId
            });
        }
    }, [count]);
    return (<div className={classes.containerNum} onClick={(e) => e.stopPropagation()}>
      <div className={classes.innerContainer}>
        <div className={classes.triangleUp} onClick={incrementCount}/>
        <span style={{
        display: 'flex'
    }}>
          <input className={classes.numberInput} 
    //onBlur={handleAccept}
    onChange={handleChange} type="number" name="productQty" value={count} min="1" max="10000"/>
          <span>{<Person_1.default />}</span>
        </span>
        <div className={classes.triangleDown} onClick={decrementCount}/>
      </div>
    </div>);
}
exports.default = smallNumPicker;
