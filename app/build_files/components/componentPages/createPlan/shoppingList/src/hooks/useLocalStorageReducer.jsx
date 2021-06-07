"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useLocalStorageReducer(key, reducer, defaultValue) {
    const [state, dispatch] = react_1.useReducer(reducer, defaultValue, () => {
        let value;
        try {
            value = JSON.parse(window.localStorage.getItem(key) || String(defaultValue));
        }
        catch (e) {
            value = defaultValue;
        }
        return value;
    });
    console.log(state);
    return [state, dispatch];
}
exports.default = useLocalStorageReducer;
