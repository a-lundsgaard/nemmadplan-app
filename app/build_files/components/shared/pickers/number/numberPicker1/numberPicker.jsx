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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./style.css");
function NumberPicker({ label, onChange, value }) {
    const [count, setCount] = react_1.useState(1);
    const str = count < 2 ? 'person' : 'persons';
    const style = {
        content: 'hi'
    };
    const decrementCount = (e) => {
        if (count < 2)
            return false;
        setCount(prevCount => prevCount - 1);
    };
    const incrementCount = (e) => {
        setCount(prevCount => prevCount + 1);
    };
    react_1.useEffect(() => {
        console.log('Changed count: ' + count);
        onChange(count);
    }, [count]);
    react_1.useEffect(() => {
        if (value)
            setCount(value);
    }, [value]);
    const handleChange = (e) => {
        setCount(e.target.value);
        console.log('Changed');
    };
    return (<div className="plusminus horiz">
            <button onClick={decrementCount}/>
            <input onChange={handleChange} type="number" name="productQty" value={count} min="1" max="50"/>
            <button onClick={incrementCount}/>
        </div>);
}
exports.default = NumberPicker;
